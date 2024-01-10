"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  timezone: "+07:00",
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

db.authenticate()
  .then(() => console.log(`Connected to database : ${DB_HOST}:${DB_PORT}`))
  .catch(() => console.error(`Unable to connect to the database!`));

const event = require("../models/event");
const announcement = require("../models/announcement");
const reminder_course = require("../models/reminder_course");
const student = require("../models/student");
const parent = require("../models/parent");
const teacher = require("../models/teacher");
const enrollment_teacher = require("../models/enrollment_teacher");
const enrollment_student = require("../models/enrollment_student");
const event_vote = require("../models/event_vote");

module.exports = {
  event: event(db, DataTypes),
  announcement: announcement(db, DataTypes),
  reminder_course: reminder_course(db, DataTypes),
  enrollment_teacher: enrollment_teacher(db, DataTypes),
  enrollment_student: enrollment_student(db, DataTypes),
  student: student(db, DataTypes),
  parent: parent(db, DataTypes),
  teacher: teacher(db, DataTypes),
  event_vote: event_vote(db, DataTypes),
  db,
};
