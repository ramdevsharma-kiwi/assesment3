const express = require('express');
const env = require('dotenv').config();
require("./config/db")
require("./models/train")

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('./api.yaml')


const app = express();
const port = process.env.PORT

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))

//   router 
app.use('/',require('./routes/index'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});