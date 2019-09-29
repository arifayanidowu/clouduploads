require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 3007;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.headers("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

require("./model/db");

app.use("/", userRoutes);

app.listen(PORT, () =>
  console.log(`[Server] Connected successfully on port ${PORT}`)
);
