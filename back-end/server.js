const express = require("express");
const cors = require("cors");
const router = require("./routes");
const utils = require("./config/utils");

const app = express();

const PORT = utils.PORT;

app.use(express.json());

const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.use("/api", router);
