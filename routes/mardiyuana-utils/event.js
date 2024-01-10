const response = require("../../components/response");
const { verifyTokenParent, verifyTokenStudent } = require("../../middlewares/token")
const express = require("express");
const router = express.Router();

const eventController = require("../../controllers/event");

const index = function (req, res, next) {
  response.res404(res);
};

router.route("/detail-novote")
  .get((req, res, next) => {
    eventController.getEventNonVoteDetail(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.route("/detail-vote")
  .get((req, res, next) => {
    eventController.getEventVoteDetail(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.route("/parent-vote")
  .post(verifyTokenParent, (req, res, next) => {
    eventController.voteUnvoteEvent(req, res).catch((error) => {
      console.error(error);
      return response.res500(res, "Internal system error, please try again later!");
    });
    // return response.res200(res, "000", "sukses bang")
  })

router.all("*", index);

module.exports = router;
