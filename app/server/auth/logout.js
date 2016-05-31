'use strict';

export const logout = function(req, res){
  req.logout();
  res.redirect('/');
};

export default logout
