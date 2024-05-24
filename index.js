const express = require("express");

const port = 8012;

const app =  express();

const db  = require("./config/mongoose")

app.use(express.urlencoded());

app.use('/', require('./router/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("sever is running on localhost:", port);
})