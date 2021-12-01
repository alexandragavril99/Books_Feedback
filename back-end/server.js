const express = require("express");
const cors = require("cors");
const router = require("./routes");
const utils = require("./config/utils");

const app = express();

const PORT = utils.PORT;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

app.use("/api", router);
