
export function isVerified(req, res, next) {
  if (req.user && req.user.canPlayRoleOf('account')) {
    if (req.app.config.requireAccountVerification) {
      if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
        return false
      }
    }
  }

  return true
}

// authentication middleware
export function ensureAuthenticated(req, res, next) { 
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/auth/login')
}

export function ensureAccount(req, res, next) {
  if (req.user.canPlayRoleOf('account')) {
    if (req.app.config.requireAccountVerification) {
      if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
        return res.redirect('/auth/account/verification');
      }
    }
    return next();
  }
  res.redirect('/');
}

export function ensureAdmin(req, res, next) {
  console.log(req.user);
  console.log(req.user.canPlayRoleOf('admin'));
  console.log('called ensureAdmin...');
  if (req.user && req.user.canPlayRoleOf('admin')) {
    return next();
  }
  res.redirect('/');
}
