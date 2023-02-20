const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'halfday'], default: 'present' }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports =  Attendance ;