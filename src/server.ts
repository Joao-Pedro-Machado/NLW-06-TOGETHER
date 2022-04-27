import "reflect-metadata";
import "express-async-errors"
import express, { Request, Response, NextFunction } from "express";

import { router } from "./routes"

import "./database"

const port = 8080

const app = express();

app.use(express.json())

app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user_id");
    next()
});

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))