"use strict";

const sequelize = require("sequelize");
const Sequelize = require("sequelize")
const { db } = require("../../components/database")
const { Op } = sequelize;
const { 
  reminder_course
} = require("../../components/database");

exports.getLatestReminderCourse = async ({ academicYearId, classId }) => {
  return reminder_course.findAll({
    raw: true,
    attributes: ["id", "title", "body"],
    where: {
      academicYearId,
      classId
    },
    order: [["createdDate", "DESC"]],
    limit: 5
  })
}
