"use strict";

const sequelize = require("sequelize");
const Sequelize = require("sequelize")
const { db } = require("../../components/database")
const { Op } = sequelize;
const { 
  enrollment_student
} = require("../../components/database");

exports.getActiveEnrollmentStudent = async ({ studentId }) => {
  return enrollment_student.findOne({
    raw: true,
    attributes: { exclude: ["updatedDate"]},
    where: {
      studentId,
      status: "ACTIVE"
    }
  })
}
