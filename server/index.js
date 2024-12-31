if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const userRoutes = require("./routers/user-router");
const addressRoutes = require("./routers/address-router");
const errorMiddlware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, DELETE, PATCH, PUT, HEAD",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/location-address-app")
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE..");
    app.listen(port, () => {
      console.log(`LISTENING AT PORT : ${port}`);
    });
  })
  .catch((e) => {
    console.log("Error while connecting to database...", e);
  });

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/api/auth", userRoutes);
app.use("/api/auth/:id/address", addressRoutes);
app.use(errorMiddlware);
