module.exports = (error,req,res,next)=>{
    if(error.name === 'JsonWebTokenError') {
        res.status(500).json({
            status: '',
            message : 'Invalid Token'
        })
    }
}