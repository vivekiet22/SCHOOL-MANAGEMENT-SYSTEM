const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salaryPerDay: { type: Number, default: 100 },
  redFlag: { type: Boolean, default: false },
});
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
