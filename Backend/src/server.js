import express from "express"
import { config } from "dotenv"
import UserRouter from "./routes/users.route.js"
import fileUpload from "express-fileupload"
import fs from "fs"
import { join } from "path"
import FilesRouter from "./routes/files.route.js"
import cors from "cors"
import nodemailer from "nodemailer"
import { writeFileSync,readFileSync } from "fs"
import { Logger } from "./logs/logger.js"
config()


const server = express()

server.use(fileUpload())

server.use(cors())
server.use(express.json())
server.use(UserRouter)
server.use(FilesRouter)

server.use((error, req, res, next) => {
    if (error.status && error.status < 500) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            name: error.name
        })
    } else {
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${req.message}--${error.stack}`
        fs.appendFileSync(join(process.cwd(), "src", "logs", "error.txt"), errorText)

        return res.status(500).json({
            status: 500,
            message: error.message,
            path: error.stack
        })
    }
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bahrombobomurodov277@gmail.com",
        pass: "cbtk enkp wtve fcrp"
    }
})

//email sender
server.post("/send", (req, res) => {
    const {email} = req.body
    let otp = Math.floor(Math.random() * 1000000)
    transporter.sendMail({
        from:"YouTube email sender  <bahrombobomurodov277@gmail.com>",
        to:email,
        subject:"Tasdiqlash kodi",
        html:`
        <h2>${otp}</h2>
        <p>Tasdiqlash kodini hech kimga bermang</p>`
    })   
    let user  = {
        otp,
        email,
        created_at: new Date()
    }
    const filePath = join(process.cwd(),"src","database","otp.json")
    let data = readFileSync(filePath,"utf-8")
    let NewData = JSON.parse(data)
    NewData.push(user)

    writeFileSync(filePath,JSON.stringify(NewData,null,4))
    res.status(200).json({
        status:200,
        message:"email send"
    })
})



server.listen(process.env.PORT, () => Logger.info("Sever is running " + process.env.PORT))