require("dotenv/config");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8800;
const { connectToDB } = require("./database/index");
const { authRoute, employeeRoute } = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
connectToDB();

app.listen(PORT, (err) => {
  console.log(`Running in PORT ${PORT}`);
});

app.use("/auth", authRoute);
app.use("/employee", employeeRoute);

module.exports = app;
