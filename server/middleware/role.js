const jwt = require("jsonwebtoken");

const JWT_key = process.env.JWT_TOKEN;

const roleMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
    // console.log(header)
  if (!header || !header.startsWith("Bearer ")) {

    return res.status(401).json({ message: "No token provided" });
  }
   
  const token = header.split(" ")[1];
   
  try {
    const decode =  jwt.verify(token, JWT_key);
    // console.log(decode)
     if(decode.role==='client')
        { req.body = {
  ...req.body,
  ...decode,
};
          next();}
    else
        return res.status('403').json({message:"Does not have permission"})

  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
module.exports = roleMiddleware;
