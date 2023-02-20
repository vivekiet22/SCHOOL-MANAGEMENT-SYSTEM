const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");



const adminRoute = require("./routes/adminRoute");
const teacherRoute = require("./routes/teacherRoute");



const app = express();



const DB = 'mongodb://127.0.0.1:27017/school'
try {
    mongoose.connect(DB).then(()=>console.log("Connected to DB Successfully"));
  } catch (error) {
    handleError(error);
  }

app.use(express.json());



app.use("/api/teacher", teacherRoute);
app.use("/api/admin", adminRoute);

const port = 5000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
