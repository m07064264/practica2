const express = require('express');
const http = require('http');
const fs = require('fs');

const app = express();
app.use(express.static('.'));


const server = http.createServer(async (req, res) => {

        const filePath = req.url.substring(1);
        fs.access(filePath, fs.constants.R_OK, err => {
            if(err) {
                res.statusCode = 404;
                res.end("Resource not found!");
            }
            else{
                fs.createReadStream(filePath).pipe(res);
            }
        });
        if(req.url == "/reg"){
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            let body = "";
            for await (const chunk of req) {
                body += chunk;
            }
            let number = "",
            email = "";
            const params = body.split("&");
            for(let param of params) {
                const [paramName, paramValue] = param.split("=");
                if(paramName === "number") number = paramValue;
                if(paramName === "email") email = paramValue;
            }
            res.end(`номер: ${number} почта: ${email}`);
        }
});
server.listen(3001, '127.0.0.1', () => {
    console.log("Server started at 3001");
});
