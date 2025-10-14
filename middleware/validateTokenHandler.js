const asyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');

//middleware to validate the token
const validateTokenHandler = (req, res, next) => {
  // correct header access
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // make sure env var name matches where you sign the token (e.g. ACCESS_TOKEN_SECRET)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // attach user info to req for downstream handlers
    req.user = decoded.user || decoded;
    console.log("Decoded user:", req.user);    
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports= validateTokenHandler;