const { Schema, model } = require("mongoose");

const addressModel = new Schema({
  houseNo: {
    type: Number,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Home", "Office", "Friends & Family"],
  },
});

const Address = model("Address", addressModel);

module.exports = Address;
