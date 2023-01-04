require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require('./api/routes')


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(router());



app.get("/ping", (request, response) => {
  response.status(200).send("pong");
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server listening on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();