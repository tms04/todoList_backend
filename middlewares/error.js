class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware=(err,req,res)=>{
    err.message=err.message || "Internal Server";
    err.statusCode=err.statusCode || 500;
    return res.status(err.statusCode).send({success:false,message:err.message});
}

export default ErrorHandler;