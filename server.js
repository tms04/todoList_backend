import e from "express";
import router from "./routes/user.js";
import taskRouter from "./routes/task.js"
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path:"./data/config.env"
});

connectDb();



const app=e();

//middlewares
app.use(e.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use("/api/v1/user",router);
app.use("/api/v1/task",taskRouter);


app.get("/",(req,res)=>{
    res.send("Hiii")
})

//using error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})