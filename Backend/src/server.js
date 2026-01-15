import express from "express"
import { config } from "dotenv"
import UserRouter from "./routes/users.route.js"
import fileUpload from "express-fileupload"
import fs from "fs"
import { join } from "path"
import FilesRouter from "./routes/files.route.js"
import cors from "cors"
import nodemailer from "nodemailer"
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

server.post("/send", (req, res) => {
    const {email} = req.body

    transporter.sendMail({
        from:"Ichki Ishlar Vazirligi <bahrombobomurodov277@gmail.com>",
        to:email,
        subject:"O‘zbekiston Respublikasi Ichki ishlar organlari xabarnomasi: Siz tomonidan axborot tizimlariga ruxsatsiz kirish holati qayd etildi. IP, qurilma va faoliyat loglari saqlangan. Ixtiyoriy ravishda to‘xtatilmagan taqdirda qonuniy choralar ko‘riladi.",
        // html:"<img> src="http://localhost:4040/api/getimg/ruslan_photo.png"</img>"
    })
    res.status(200).json({
        status:200,
        message:"email send"
    })
})

server.listen(process.env.PORT, () => console.log("Sever is running " + process.env.PORT))