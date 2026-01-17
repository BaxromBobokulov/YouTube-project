import {createLogger, format , transports } from "winston"


export const Logger = createLogger({
    level:"info",
    format:format.combine(
        format.timestamp(),
        format.printf(({timestamp,level,message}) => {
            return `${timestamp} -- ${level} -- ${message}`
        })
    ),
    transports:[
        new transports.File({filename:"logger.txt"}),
        new transports.Console()
    ]
})