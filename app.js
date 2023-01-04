require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { myDataSource } = require("./models/myDataSource");
const routes = require("./routes/index");
const { errorHandler } = require("./middleware/errorHandling");
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);
app.use(errorHandler);

app.get("/ping", (request, response) => {
  response.status(200).send("pong");
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    await myDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    app.listen(PORT, () => {
      console.log(`server listening on ${PORT}`);
    });
  } catch (err) {
    myDataSource.destroy();
    console.error(err);
  }
};

start();
