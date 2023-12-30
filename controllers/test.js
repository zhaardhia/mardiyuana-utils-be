"use strict";

const response = require("../components/response")
const { db } = require("../components/database")
// const { nanoid } = require('nanoid');

exports.testingApi = async (req, res, next) => {
  return response.res200(res, "000", "Berhasil konfigurasi API!");
}

exports.wakwaw = async (req, res, next) => {
  console.log("asu")
  return response.res200(res, "000", "wlelwelwelw", { data: "wkwk" });
}

exports.testInsertImage = async (req, res, next) => {
  if (!req.file) return response.res400(res, "Image harus diupload.")
  console.log({file: req.file})
  return response.res200(res, "000", "wlelwelwelw", { data: "wkwk" });
}