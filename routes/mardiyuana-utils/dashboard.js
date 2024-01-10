const response = require("../../components/response");
// const validator = require("../../middlewares/validator");
// const verifyToken = require("../../middlewares/verifyToken")
const { verifyTokenParent, verifyTokenStudent } = require("../../middlewares/token")
const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/dashboard");

const index = function (req, res, next) {
  response.res404(res);
};

router.route("/parent")
  .get(verifyTokenParent, (req, res, next) => {
    dashboardController.getDashboardStudentData(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.route("/student")
  .get(verifyTokenStudent, (req, res, next) => {
    dashboardController.getDashboardStudentData(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.route("/teacher")
  .get((req, res, next) => {
    dashboardController.getDashboardTeacherData(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
  })

router.all("*", index);

module.exports = router;
