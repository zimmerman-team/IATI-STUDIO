import express from 'express'
import passport from 'passport'

import config from '../config/config'

import signup from '../auth/signup'
import { signupSocial } from '../auth/signup/social'
import { signupTwitter } from '../auth/signup/social'
import { signupGoogle } from '../auth/signup/social'
import { signupGithub } from '../auth/signup/social'
import { signupFacebook } from '../auth/signup/social'

import login from '../auth/login'
import reset from '../auth/reset'
import forgot from '../auth/forgot'
import logout from '../auth/logout'

import { verify, resendVerification } from '../auth/verification'
import { isVerified, ensureAuthenticated, ensureAccount } from '../middleware/authentication'

// TODO: implement this everywhere - 2016-05-11
function authFlow(req, res, next){
  if (req.isAuthenticated() && isVerified(req, res)) {
      return res.redirect('/app')
  } 
  else if (req.isAuthenticated()) {
      // TODO: implement email verification - 2016-05-10
      return res.redirect('/app')
      // return res.redirect('/auth/account/verification')
  }

  next();
};

// TODO: implement this everywhere - 2016-05-11
function verificationFlow(req, res, next) {
    if (req.isAuthenticated() && isVerified(req, res)) {
        return res.redirect('/app')
    } 
    else if (!req.isAuthenticated()) {
        res.redirect('/auth/signup')
    }

    return next()
}

function authView(req, res, next) {
  res.render('auth', {
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

let router = express.Router();

router.post('/login/', login);
router.post('/login/forgot/', forgot);
router.put('/login/reset/:email/:token/', reset);

router.get('/logout/', logout);

// TODO: generate token on signup - 2016-05-06
router.post('/signup/', signup);

// TODO: Merge login and signup for social auth - 2016-04-28
router.post('/signup/social/', signupSocial);
router.get('/signup/twitter/', 
           passport.authenticate('twitter', {
               callbackURL: config.auth.twitter.callbackUrl,
           }));
router.get('/signup/twitter/callback/', signupTwitter);
router.get('/signup/github/', 
           passport.authenticate('github', {
               callbackURL: config.auth.github.callbackUrl,
               scope: ['user:email'],
           }));
router.get('/signup/github/callback/', signupGithub);
router.get('/signup/google/', 
           passport.authenticate('google', {
               callbackURL: config.auth.google.callbackUrl,
               scope: ['profile', 'email'] 
           }));
router.get('/signup/google/callback/', signupGoogle);
router.get('/signup/facebook/', 
           passport.authenticate('facebook', {
               callbackURL: config.auth.facebook.callbackUrl,
               scope: ['email','public_profile'],
           }));
router.get('/signup/facebook/callback/', signupFacebook);

/*
 * Account verification
*/

// router.get('/account/verification/', verification);
router.get('/account/verification/', verificationFlow, authView);
router.post('/account/verification/', resendVerification);
router.get('/account/verification/:token/', verify);

// Routes for the SPA
// Just send responses instead of redirecting? and let client decide where to route to?

router.get('/*', authFlow, authView);

export default router
