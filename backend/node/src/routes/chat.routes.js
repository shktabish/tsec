import express from "express"
import { createOrGetChat, getAllChats, deleteChat, getChat } from "../controllers/chat.controllers.js"
import verifyJWT from "../middlewares/auth.middleware.js"
const router = express.Router()
router.use(verifyJWT)

router.route("/chat/:receiverId")
.get(createOrGetChat)

router.route("/getChat/:chatId")
.get(getChat)

router.route("/getAllChats")
.get(getAllChats)

router.route("/deletechat/:chatId")
.post(deleteChat)

export default router