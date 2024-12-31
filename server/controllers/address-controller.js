const User = require("../models/user-model");
const Address = require("../models/address-model");

const saveAddress = async (req, res, next) => {
  try {
    const userID = req.userId;
    console.log("Address body: ", req.body);
    const addressData = req.body;
    // Validate if address data is correct (optional)
    if (
      !addressData.houseNo ||
      !addressData.streetAddress ||
      !addressData.category
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const address = await Address.create(addressData);
    if (!address) {
      return res
        .status(500)
        .json({ message: "Error while saving the address." });
    }
    // Find the user and add the new address to their address array
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("user: ", user);
    user.address.push(address._id); // Add the address ID to the user
    await user.save();
    res.status(200).json({ address }); // Return the saved address
  } catch (e) {
    next(e);
  }
};

const showAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find();
    if (addresses) {
      return res.status(200).json(addresses);
    } else {
      return res.status(500).json({ message: "No addresses found." });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { saveAddress, showAddresses };
