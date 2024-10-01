import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import nodemailer from "nodemailer"

const app = express()

app.use(cors({
    origin: true,
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
import mentorRouter from "./routes/mentor.routes.js"; 
import verifyJWT from "./middlewares/auth.middleware.js"

app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/mentors", mentorRouter);

app.post('/api/v1/send-email',verifyJWT, async (req, res) => {
    const { subject, date, time, meetLink } = req.body;
    console.log("here");
    try {
      // Create a transporter using SMTP settings
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Gmail or any other SMTP service like 'hotmail', 'yahoo', etc.
        auth: {
          user: 'tabish.shaikh22@spit.ac.in', // Your email
          pass: '9321744986'   // Your email password or App-specific password
        }
      });

      console.log("here 2");
  
      // Define the email options
      const mailOptions = {
        from: 'tabish.shaikh22@spit.ac.in',   // Sender's email address
        to: "shreya.rathod22@spit.ac.in",                         // Recipient's email address
        subject: `Meeting on ${subject}`,               // Subject line
        text: `
            *Dear Attendee,*

            I hope this message finds you well. I would like to schedule a meeting to discuss ${subject}. 

            Please be present on ${date + " " + time}.

            Looking forward to our conversation.

            Meet Link: ${meetLink}

            Best Wishes, 
        `                     
      };

      console.log("here 3");
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error sending email', error: error.message });
    }
  });

export {app}