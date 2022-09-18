module.exports  = {
    errorHandler : (err,req,res,next)=>{
    console.log(err,'im error');
    // console.log(err.status);
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
        })
    }
}