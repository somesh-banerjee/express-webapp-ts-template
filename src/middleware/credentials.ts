import { allowedOrigins } from "../config/allowedOrigins";
import { Request, Response } from 'express';

const credentials = (req:any, res:any, next:any) => {
    console.log(req.headers.origin)
    const origin= req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export {credentials};