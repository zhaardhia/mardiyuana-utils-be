const response = require("../../components/response");
// const validator = require("../../middlewares/validator");
// const verifyToken = require("../../middlewares/verifyToken")
const { verifyTokenParent, verifyTokenStudent } = require("../../middlewares/token")
const express = require("express");
const router = express.Router();

const announcementController = require("../../controllers/announcement");

const index = function (req, res, next) {
  response.res404(res);
};

router.route("/")
  .get((req, res, next) => {
    announcementController.getListAnnouncementPagination(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
  })

router.route("/detail")
  .get((req, res, next) => {
    announcementController.getAnnouncementDetail(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.all("*", index);

module.exports = router;
