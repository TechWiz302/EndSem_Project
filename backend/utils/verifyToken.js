import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; 

    if(!token){
        return next(createError(401, "Unauthorized Access"));
    } 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return next(createError(403, "Token is not valid"));
        }

        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.params.isAdmin){
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized"));
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.params.isAdmin){
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized"));
        }
    })
}