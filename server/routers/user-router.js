const express = require("express");
const router = express.Router();
const {
  register,
  login,
  user,
  getLocation,
  getCityData,
} = require("../controllers/user-controller");
const { validate } = require("../middlewares/validate-middleware");
const { registerSchema, loginSchema } = require("../Validators/auth-validator");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware, user);
router.route("/map").post(authMiddleware, getLocation);
router.route("/map/city").post(authMiddleware, getCityData);

module.exports = router;
