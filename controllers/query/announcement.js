"use strict";

const sequelize = require("sequelize");
// const Sequelize = require("sequelize")
const { db } = require("../../components/database")
const { Op, literal, QueryTypes } = sequelize;
const { 
  announcement
} = require("../../components/database");

exports.getListAnnouncement = async ({ page, pageSize, titleName }) => {
  return announcement.findAll({
    limit: Number(pageSize) + 1,
    offset: (Number(page) - 1) * Number(pageSize),
    order: [['createdDate', 'DESC']],
    raw: true,
    ...(titleName && {
      where: {
        title: {
          [Op.like]: `%${titleName}%`, // Case-insensitive search for name
        },
      }
    })
  })
}

exports.totalCountListAnnouncement = async ({ titleName }) => {
  return announcement.count({
    where: {
      ...(titleName && {
        title: {
          [Op.like]: `%${titleName}%`, // Case-insensitive search for name
        },
      })
    }
  })
}

exports.getDetailAnnouncement = async ({ id }) => {
  return announcement.findOne({
    raw: true,
    where: {
      id
    }
  })
}
