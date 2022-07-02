require('dotenv').config()
const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const http = require('http').Server(app);
const body_parser = require('body-parser');
const auth = require("./helper/auth");
const user_routes = require("./routes/index");
const customer_routes = require ("./routes/customer");
const PORT = process.env.PORT

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended:false
}));

const googleAuth = require('./routes/index');
app.use('/', googleAuth);

app.use("/", user_routes);
app.use("/api", auth.verifyAuthToken ,customer_routes)

http.listen(PORT  , (req,res)=>{
  console.log(`Listening to the port: ${PORT} `)
});

