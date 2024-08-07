const errorhandler=(err,req,res,next)=>{
// take res from controllera and modify them and return
console.log(res);
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack : err.stack
    })
}

module.exports={
    errorhandler
}