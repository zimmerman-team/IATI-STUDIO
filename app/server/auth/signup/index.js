
import workflowMiddleware from '../util/workflow'
import sendmail from '../util/sendmail'
import { sendVerificationEmail } from '../verification'
import { postUserCreate } from './postUserCreate'
import request from 'request'
import { oipaPost } from '../../config/request'

export function signupView(req, res) {
  if (req.isAuthenticated()) {
    res.redirect(req.user.defaultReturnUrl());
  }
  else {
    res.render('signup/index', {
      INITIAL_STATE: {
        oauthMessage: '',
        oauthTwitter: !!req.app.config.oauth.twitter.key,
        oauthGitHub: !!req.app.config.oauth.github.key,
        oauthFacebook: !!req.app.config.oauth.facebook.key,
        oauthGoogle: !!req.app.config.oauth.google.key,
        oauthTumblr: !!req.app.config.oauth.tumblr.key
      }
    });
  }
}

export function signup(req, res, next) {

  let workflow = workflowMiddleware(req, res)

  workflow.on('validate', function() {
    if (!req.body.username) {
      workflow.outcome.errfor.username = 'required';
    }
    else if (!/^[a-zA-Z0-9\-\_]+$/.test(req.body.username)) {
      workflow.outcome.errfor.username = 'only use letters, numbers, \'-\', \'_\'';
    }

    if (!req.body.email) {
      workflow.outcome.errfor.email = 'required';
    }
    else if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(req.body.email)) {
      workflow.outcome.errfor.email = 'invalid email format';
    }

    if (!req.body.password) {
      workflow.outcome.errfor.password = 'required';
    }

    if (workflow.hasErrors()) {
      return workflow.emit('response');
    }

    workflow.emit('duplicateUsernameCheck');
  });

  workflow.on('duplicateUsernameCheck', function() {
    req.app.db.models.User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        return workflow.emit('exception', err);
      }

      if (user) {
        workflow.outcome.errfor.username = 'username already taken';
        return workflow.emit('response');
      }

      workflow.emit('duplicateEmailCheck');
    });
  });

  workflow.on('duplicateEmailCheck', function() {
    req.app.db.models.User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
      if (err) {
        return workflow.emit('exception', err);
      }

      if (user) {
        workflow.outcome.errfor.email = 'email already registered';
        return workflow.emit('response');
      }

      workflow.emit('createOIPAUser');
    });
  });

  workflow.on('createOIPAUser', function() {
      const req_options = {
          url: '/api/auth/registration/',
          body: {
              username: req.body.username,
              password1: req.body.password,
              password2: req.body.password,
              email: req.body.email.toLowerCase(),
          }
      };

      return oipaPost(req_options)
          .then(
              parsedBody => {
                  const token = parsedBody.key

                  if (typeof(token) !== 'string') {
                      return workflow.emit('exception', new Error("OIPA didn't return a token"));
                  }

                  workflow.emit('createUser', token)
          })
          .catch(error => workflow.emit('exception', error))
  })

  workflow.on('createUser', function(oipaToken) {
    req.app.db.models.User.encryptPassword(req.body.password, function(err, hash) {
      if (err) {
        return workflow.emit('exception', err);
      }

      var fieldsToSet = {
        isActive: 'yes',
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: hash,
        search: [
          req.body.username,
          req.body.email
        ],
        oipaToken: oipaToken,
      };
      req.app.db.models.User.create(fieldsToSet, function(err, user) {
        if (err) {
          return workflow.emit('exception', err);
        }

        workflow.user = user;
        workflow.emit('createAccount');
      });
    });
  });

  workflow.on('createAccount', function() {
    var fieldsToSet = {
      isVerified: req.app.config.requireAccountVerification ? 'no' : 'yes',
      'name.full': workflow.user.username,
      user: {
        id: workflow.user._id,
        name: workflow.user.username
      },
      search: [
        workflow.user.username
      ]
    };

    req.app.db.models.Account.create(fieldsToSet, function(err, account) {
      if (err) {
        return workflow.emit('exception', err);
      }

      //update user with account
      workflow.user.roles.account = account._id;
      workflow.user.save(function(err, user) {
        if (err) {
          return workflow.emit('exception', err);
        }

        // post User Create hook
        postUserCreate(user)

        workflow.emit('sendWelcomeEmail');
      });
    });
  });

  workflow.on('sendWelcomeEmail', function() {
    sendmail(req, res, {
      from: req.app.config.smtp.from.name +' <'+ req.app.config.smtp.from.address +'>',
      to: req.body.email,
      subject: 'Your '+ req.app.config.projectName +' Account',
      textPath: 'email/signup-text',
      htmlPath: 'email/signup-html',
      locals: {
        username: req.body.username,
        email: req.body.email,
        loginURL: req.protocol +'://'+ req.headers.host +'/login/',
        projectName: req.app.config.projectName,
      },
      success: function(message) {
        workflow.emit('signUpNewsletter');
      },
      error: function(err) {
        console.error('Error Sending Welcome Email: '+ err);
        workflow.emit('signUpNewsletter');
      }
    });
  });

  workflow.on('signUpNewsletter', function() {
      if (! req.app.config.oauth.newsletter) {
          return workflow.emit('logUserIn')
      }
    request.post(
      'https://api.createsend.com/api/v3.1/subscribers/'+req.app.config.oauth.newsletter.listId+'.json',
      {
        'auth': {
          'user': req.app.config.oauth.newsletter.apiKey,
          'pass': ''
        },
        'json': {
          'emailAddress': req.body.email
        }
      },
      function (err, httpResponse, body) {
        if (err) { 
          console.error('Error subscribing to newsletter: ' + err)
        }
        workflow.emit('logUserIn');
      }
    );
  });

  workflow.on('logUserIn', function() {
    req._passport.instance.authenticate('local', function(err, user, info) {
      if (err) {
        return workflow.emit('exception', err);
      }

      if (!user) {
        workflow.outcome.errors.push('Login failed. That is strange.');
        return workflow.emit('response');
      }
      else {
        req.login(user, function(err) {
          if (err) {
            return workflow.emit('exception', err);
          }

          workflow.outcome.defaultReturnUrl = user.defaultReturnUrl();

          if(req.app.config.requireAccountVerification) {
            workflow.emit('sendVerificationMail')
          } else {
            workflow.emit('response');
          }
        });
      }
    })(req, res);
  });


  // TODO: Reuse existing verification code - 2016-05-06
  workflow.on('sendVerificationMail', function() {

    workflow.on('generateToken', function() {
      var crypto = require('crypto');
      crypto.randomBytes(21, function(err, buf) {
        if (err) {
          return next(err);
        }

        var token = buf.toString('hex');
        req.app.db.models.User.encryptPassword(token, function(err, hash) {
          if (err) {
            return next(err);
          }

          workflow.emit('patchAccount', token, hash);
        });
      });
    });

    workflow.on('patchAccount', function(token, hash) {
      var fieldsToSet = { verificationToken: hash };
      var options = { new: true };
      req.app.db.models.Account.findByIdAndUpdate(req.user.roles.account, fieldsToSet, options, function(err, account) {
        if (err) {
          return next(err);
        }

        sendVerificationEmail(req, res, {
          email: req.user.email,
          verificationToken: token,
          onSuccess: function() {
            return workflow.emit('response');
          },
          onError: function(err) {
            return next(err);
          }
        });
      });
    });

    workflow.emit('generateToken');
  })

  workflow.emit('validate');
};

export default signup
