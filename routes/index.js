const express = require("express");
const response = require("../components/response");
const router = express.Router();

// Load middlewares
// const rateLimiter = require("../middlewares/rateLimiter");
// const authenticate = require("../middlewares/authenticator");
// const validator = require("../middlewares/validator");


const index = function (req, res, next) {
  response.res404(res);
};

router.use(
  "/api/mardiyuana-utils",
  (req, res, next) => {
    // Use token or any validation here.
    next();
  },
  require("./mardiyuana-utils")
);

router.all("/", index);
router.all("*", index);

module.exports = router;
