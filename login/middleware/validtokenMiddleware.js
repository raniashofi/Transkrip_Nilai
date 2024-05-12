const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect("/auth/login");
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'verifikasi token gagal.' });
      }
  
      req.userId = decoded.id;
      req.userRole = decoded.role; 
      req.userEmail = decoded.email;
      next();
    });

 

  }

  module.exports = verifyToken;