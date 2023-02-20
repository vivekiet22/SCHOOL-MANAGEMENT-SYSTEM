const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

router.post("/register",async (req, res) => {
    const { username,  password, role } = req.body;
  
    let admin = await Admin.findOne({ username });
    try {
      if (admin) {
        return res
          .status(400)
          .json({ status: "error", msg: "Admin already exists" });
      }
      admin = await Admin.create({ username,password,role });
      const token = jwt.sign({ id: admin.id }, "VivekMaddeshiyaLovesCoding", {
        expiresIn: 3600
      });
      res.status(201).json({ status: "success", data: { admin, token } });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ status: "error", msg: err.message });
    }
  });



router.post("/login",async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username }).select("+password");
  
      if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign({ id: admin.id }, "VivekMaddeshiyaLovesCoding", {
          expiresIn: 3600
        });
        res.status(200).json({ status: "success", data: { token } });
      } else {
        res.status(400).json({ status: "fail", msg: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(400).json({ status: "fail", msg: err.message });
    }
  });

module.exports = router;