"use strict";

const response = require("../components/response")

exports.insertImage = async (req, res, next) => {
  if (!req.file) return response.res400(res, "Image harus diupload.")
  console.log({file: req.file})
  return response.res200(res, "000", "wlelwelwelw", { url: `${process.env.THIS_SERVICE_HOST}/${req.file.path}` });
}
