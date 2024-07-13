import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "http"})
    ]
});


const appLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http (SEGUIIIIIIIR)
}

export default appLogger;