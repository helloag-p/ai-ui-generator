const express = require("express");
const cors = require("cors");
require("dotenv").config();

const agentRouter = require("./routes/agent");

const app = express();

const cors = require("cors");

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.use("/api/agent", agentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});