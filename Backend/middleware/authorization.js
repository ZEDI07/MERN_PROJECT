const jwt = require('jsonwebtoken');

exports.authenticate=(req,res,next)=>{
    const authheader = req.headers.authorization               // you will pass token in header while access protected apis
 if(authheader && authheader.startsWith('bearer')){            // check authorization exist and stat with bearer
    const token = authheader.split(' ')[1];                    // fetch token from auth with split
    const user = jwt.verify(token,process.env.JWT_SECRETKEY);   // verify will decode your token and return value which is used to create token (id,email,password) , always make token with needful keys like id,email,name
   if(user){
      req.user = user;                                     // user has email and passowrd values >> set in req and pass that req to controller
      next();                                                  // pass to next middleware
   } else {
      return res.status(401).json({message : 'Token not verified'});
   }                                       
 } else {
    return res.status(401).json({message : 'Authorization header not found'})
 }
}


exports.generateToken=(payload)=>{                       // payload shuld includes id,name,email etc
        const token =  jwt.sign(payload,process.env.JWT_SECRETKEY,{expiresIn:'30d'})
      //  console.log(token)
        return token;

}