import passport from 'passport'

import config from './config/config'
import User from './models/auth/User'

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

exports = module.exports = function(app, mongoose) {

    // passport.use(new LocalStrategy(User.authenticate()));
    passport.use(new LocalStrategy(
      function(username, password, done) {
        var conditions = { isActive: 'yes' };
        if (username.indexOf('@') === -1) {
          conditions.username = username;
        }
        else {
          conditions.email = username.toLowerCase();
        }

        app.db.models.User.findOne(conditions, function(err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, { message: 'Unknown user' });
          }

          app.db.models.User.validatePassword(password, user.password, function(err, isValid) {
            if (err) {
              return done(err);
            }

            if (!isValid) {
              return done(null, false, { message: 'Invalid password' });
            }

            return done(null, user);
          });
        });
      }
    ));

    if (config.auth.twitter.key) {
        passport.use(new TwitterStrategy({
            consumerKey: config.auth.twitter.key,
            consumerSecret: config.auth.twitter.secret,
        },
          function(token, tokenSecret, profile, done) {
            done(null, false, {
                accessToken: token,
                refreshToken: tokenSecret,
                profile: profile
            })
            // app.db.models.User.findOne({oauthID: profile.id}, function(error, user) {
            //   if (error) return done(error)
            //   if (user) return done(error, user);

            //   console.log('in twitterauth...')
            //   console.log(profile)

            //   user = new User
            //   user.oauthID = profile.id
            //   user.name = profile.displayName

            //   user.firstName = user.name.substr(0,user.name.indexOf(' '))
            //   user.lastName = user.name.substr(user.name.indexOf(' ') + 1)
            //   user.avatar = profile._json.profile_image_url_https

            //   // TODO: Store more info from user - 2016-01-27

            //   // user.name = profile.username
            //   // user.description = profile._json.description
            //   // user.url = profile._json.url

            //   // user.access_token = token
            //   // user.access_token_secret = tokenSecret

            //   user.save((error) => done(error, user))
            // })
        }));
    }

    // passport.serializeUser(function(user, done) {
    //   console.log("serializing user:", user._id)
    //   done(null, user);
    // })

    // passport.deserializeUser(function(obj, done) {

    //   app.db.models.User.findOne({oauthID: obj.oauthID}, function(error, user) {
    //     done(null, user);
    //   })

    //   console.log('called deserializeUser')
    // })

    if (config.auth.google.key) {
        passport.use(new GoogleStrategy({
            clientID: config.auth.google.key,
            clientSecret: config.auth.google.secret,
            callbackURL: config.auth.google.callbackUrl,
        },
          function(token, tokenSecret, profile, done) {
            done(null, false, {
                accessToken: token,
                refreshToken: tokenSecret,
                profile: profile
            })
        }))
    }

    if (config.auth.github.key) {
        passport.use(new GithubStrategy({
            clientID: config.auth.github.key,
            clientSecret: config.auth.github.secret,
            callbackURL: config.auth.github.callbackUrl,
        },
          function(token, tokenSecret, profile, done) {
            done(null, false, {
                accessToken: token,
                refreshToken: tokenSecret,
                profile: profile
            })
        }))
    }

    if (config.auth.facebook.key) {
        passport.use(new FacebookStrategy({
            clientID: config.auth.facebook.key,
            clientSecret: config.auth.facebook.secret,
            callbackURL: config.auth.facebook.callbackUrl,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
          function(token, tokenSecret, profile, done) {
            done(null, false, {
                accessToken: token,
                refreshToken: tokenSecret,
                profile: profile
            })
        }))
    }

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        app.db.models.User.findOne({ _id: id }, { password: 0 })
            .populate('roles.admin')
            .populate('roles.account')
            .exec(function(err, user) {
                if (user && user.roles && user.roles.admin) {
                    user.roles.admin.populate("groups", function(err, admin) {
                        done(err, user);
                    });
                }
                else {
                    done(err, user);
                }
        });
    });

}
