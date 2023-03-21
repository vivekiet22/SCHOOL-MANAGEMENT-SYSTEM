# School Attendance Management System

<!-- add hits here and license -->
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvivekiet22%2FSCHOOL-MANAGEMENT-SYSTEM&count_bg=%2379C83D&title_bg=%23555555&icon=bilibili.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
## Summary

Design a school management system(`backend+dbschema`) that takes down the attendance of the
staff that comes to the school. The administrator of the school can only access the dashboard with
their credentials. 
## Objectives

- [x]  Admin credentials should be salted and hashed.
- [x] Ignore session maintenance[assume session is maintained and only write the APIs].
- [x] Two half days for attendance can be taken as 1 full day.
- [x] Teachers are allowed to take 3 leaves per month without any paycut.
- [x] Admin can see what all teachers are present, absent, half day on present day. 
- [x] Admin can see previous month’s data for a particular teacher(how many days present,absent, etc.)
- [x] Admin can calculate the salary of teachers based on the number of days present. 
- [x] Admin can also see what all teachers have already taken more than 7 leaves a month[RED FLAG]
- [x] The system should also calculate the salary of teachers for the current month.

- [] Design the database and backend with assumption the school has 10 Million teachers(scale)
You can assume the salary per day same( ex:100 rs/day) for all the teachers. 



## Getting Started

### Install Dependencies
<code>npm install</code>

### Run The Backend from Root Directory
<code>node index.js</code>

### Build With
- Express.js
- jsonwebtoken
- bcrypt
- mongoose
- validator

## Contributing

Everyone is welcomed to contribute to this project. You can contribute either by submitting bugs or suggesting improvements by opening an issue on GitHub. Please see the [CONTRIBUTING](CONTRIBUTING.md) guidelines for more information.



## Feature to Add

### You can contribute these features which are not implemented yet-

- [] Design the database and backend with assumption the school has 10 Million teachers(scale)
You can assume the salary per day same( ex:100 rs/day) for all the teachers. 
