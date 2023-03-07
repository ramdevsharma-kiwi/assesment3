const express = require('express');
const env = require('dotenv').config();
require("./config/db")
require("./models/train")

const app = express();
const port = process.env.PORT

app.use(express.json());

//   router 
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});