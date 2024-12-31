const express = require("express");
const router = express.Router();
const { saveAddress } = require("../controllers/address-controller");
const { validate } = require("../middlewares/validate-middleware");
const { addressSchema } = require("../Validators/auth-validator");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.route("/").post(authMiddleware, validate(addressSchema), saveAddress);

module.exports = router;
