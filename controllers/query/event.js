"use strict";

const sequelize = require("sequelize");
const Sequelize = require("sequelize")
const { db } = require("../../components/database")
const { Op } = sequelize;
const { 
  event, event_vote
} = require("../../components/database");

exports.getLatestReminderCourse = async ({ academicYearId, classId }) => {
  return reminder_course.findAll({
    raw: true,
    attributes: { exclude: ["updatedDate"]},
    where: {
      academicYearId,
      classId
    },
    order: [["createdDate", "DESC"]],
    limit: 5
  })
}
