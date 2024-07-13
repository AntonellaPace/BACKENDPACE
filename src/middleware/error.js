import { EErrors } from "../services/errors/enum.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.source);

    switch(error.code) {
        case EErrors.DB_ERROR:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.INVALID_TYPES_ERROR:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.ROUTE_ERROR:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.DUPLICATE_USER:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.INVALID_CODE:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.MISSING_FIELDS:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;

        case EErrors.NOT_FOUND:
            res.status(400).send({status: "error", error: error.name, message: error.source});
            break;
            
        default:
            res.send({status: "error", error: "Error desconocido"});
            break;
    }
}