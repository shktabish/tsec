import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
}))

app.use(express.urlencoded({
    extended:true,
}))

app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";
import communityPostRouter from "./routes/communityPost.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import scholarshipRouter from "./routes/scholarship.routes.js";
import tutoringSessionRouter from "./routes/tutoringSession.routes.js";

// Use the routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", communityPostRouter);
app.use("/api/v1/connections", connectionRouter);
app.use("/api/v1/scholarships", scholarshipRouter);
app.use("/api/v1/sessions", tutoringSessionRouter);

import chatRouter from "./routes/chat.routes.js"
import messageRouter from "./routes/message.routes.js"

app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/message", messageRouter)


export {app}