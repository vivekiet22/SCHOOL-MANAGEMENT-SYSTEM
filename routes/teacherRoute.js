const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const  Teacher= require('../models/teacher');
const  Attendance  = require('../models/attendance');


// only admin can access this route
router.use(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "VivekMaddeshiyaLovesCoding");
    
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
})


// create teacher in database
router.post("/create",async (req, res) => {
  const { name,  email } = req.body;

  let teacher = await Teacher.findOne({ email });
  try {
    if (teacher) {
      return res
        .status(400)
        .json({ status: "error", msg: "Teacher already exists" });
    }
    teacher = await Teacher.create({  name,  email });
    
    res.status(201).json({ status: "success", data: { teacher} });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
});


router.put('/attendance', async (req, res) => {
    try {
      const { teacherId, date, status } = req.body;
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      const attendance = await Attendance.findOne({ teacherId, date });


      const d = new Date(date)
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  
      const currMonthAttendance = await Attendance.find({
        teacherId: teacherId,
        date: { $gte: start, $lte: end }
      });
  
      let absent = 0;
      for (let record of currMonthAttendance) {
        if (record.status === 'absent') {
          absent++;
        } 
      }
      let redFlag = false
      if (absent>7){
        teacher.redFlag = true
        await teacher.save()
      }

      if (attendance) {
        attendance.status = status;
        await attendance.save();
      } else {
        await Attendance.create({ teacherId, date, status });
      }
      res.json({ message: 'Attendance updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });




router.get('/attendance', async (req, res) => {
    try {
      const {date} = req.query;
      const attendance = await Attendance.find({ date });
      res.json({ attendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  





// GET /attendance/monthly?teacherId=xxx&month=YYYY-MM
//monthly attendance data for a teacher
router.get('/attendance/monthly', async (req, res) => {
    try {
      const { teacherId, month } = req.query;
      const start = new Date(`${month}-01`);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  
      const attendance = await Attendance.find({
        teacherId: teacherId,
        date: { $gte: start, $lte: end }
      });
  
      // Calculate the number of days present, absent, and half-day
      let present = 0, absent = 0, halfday = 0;
      for (let record of attendance) {
        if (record.status === 'present') {
          present++;
        } else if (record.status === 'absent') {
          absent++;
        } else if (record.status === 'halfday') {
          halfday++;
        }
      }
  
      return res.status(200).json({
        present: present,
        absent: absent,
        halfday: halfday
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while fetching attendance data' });
    }
  });


// GET /salary?month=YYYY-MM
// salary for all teachers for the given month
router.get('/salary', async (req, res) => {
    try {
      const month = new Date(req.query.month);
      const start = new Date(month.getFullYear(), month.getMonth(), 1);
      const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  
      const teachers = await Teacher.find({});
  
      let salaries = [];
      for (let teacher of teachers) {
        const attendance = await Attendance.find({
          teacherId: teacher._id,
          date: { $gte: start, $lte: end }
        });
  
        // Calculate the number of days present, absent, and half-day
        let present = 0, absent = 0, halfday = 0;
        for (let record of attendance) {
          if (record.status === 'present') {
            present++;
          } else if (record.status === 'absent') {
            absent++;
          } else if (record.status === 'halfday') {
            halfday++;
          }
        }
  
        // Calculate the salary for the teacher based on the number of days present
        const salary = (present+(halfday/2)) * teacher.salaryPerDay;
  
        // Add the salary to the list of salaries
        salaries.push({
          teacherId: teacher._id,
          name: teacher.name,
          salary: salary
        });
      }
  
      return res.status(200).json({ salaries: salaries });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while calculating salaries' });
    }
  });


// GET /leaves?teacherId=xxx&month=YYYY-MM
router.get('/redflag', async (req, res) => {
    try {
      const teachers = await Teacher.find({ 
        redFlag: true
      });
      return res.status(200).json(teachers)
     
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while fetching attendance data' });
    }
  });

  // current month salary of all teachers
router.get('/currmonthsalary', async (req, res) => {
  try {
    const month = new Date();
    const start = new Date(month.getFullYear(), month.getMonth(), 1);
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const teachers = await Teacher.find({});

    let salaries = [];
    for (let teacher of teachers) {
      const attendance = await Attendance.find({
        teacherId: teacher._id,
        date: { $gte: start, $lte: end }
      });

      // Calculate the number of days present, absent, and half-day
      let present = 0, absent = 0, halfday = 0;
      for (let record of attendance) {
        if (record.status === 'present') {
          present++;
        } else if (record.status === 'absent') {
          absent++;
        } else if (record.status === 'halfday') {
          halfday++;
        }
      }

      let validDay = (present+(halfday/2)) 
      if (absent>3){
          validDay = validDay+3
      }
      else{
        validDay = validDay+absent
      }
      const salary = validDay* teacher.salaryPerDay;

      // Add the salary to the list of salaries
      salaries.push({
        teacherId: teacher._id,
        name: teacher.name,
        salary: salary
      });
    }

    return res.status(200).json({ salaries: salaries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while calculating curr month salaries' });
  }
});



module.exports = router;