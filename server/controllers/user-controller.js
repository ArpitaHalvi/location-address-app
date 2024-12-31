const User = require("../models/user-model");
const axios = require("axios");

const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists!" });
    } else {
      const user = await User.create({ email, username, password });
      // console.log("Created User ---- ", user);
      res.status(200).json({
        message: "Registered Successfully",
        token: user.generateToken(),
        userId: user._id.toString(),
      });
    }
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const user = await userExists.comparePassword(password);
      if (user) {
        res.status(200).json({
          message: "Logged in successfully!",
          token: userExists.generateToken(),
          userId: userExists._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password." });
      }
    } else {
      res.status(400).json({ message: "Invalid crendentials." });
    }
  } catch (e) {
    // console.log(e);
    next(e);
  }
};

const user = (req, res, next) => {
  try {
    const userData = req.user;
    // console.log("User data from user route: ", userData);
    return res.status(200).json({ userData });
  } catch (e) {
    next(e);
  }
};

const getLocation = async (req, res) => {
  try {
    if (!process.env.MAPTILER_API_KEY) {
      console.log("NO API KEY FOUND");
    }
    const { loc } = req.body;
    // console.log("Req body: ", req.body);
    const { latitude, longitude } = loc;
    // console.log("Lat: ", latitude, "Long: ", longitude);
    // const response = await axios.get(
    //   `https://api.maptiler.com/geolocation/ip.json?key=${process.env.MAPTILER_API_KEY}`
    // );
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${process.env.MAPTILER_API_KEY}`
    );
    const res_data = response.data;
    // const postalCode = res_data.features[0];
    // const area = res_data.features[1];
    // const city = res_data.features[2];
    // const street = res_data.features[3];
    // const district = res_data.features[4];
    // const state = res_data.features[5];
    // const country = res_data.features[6];
    // const continent = res_data.features[7];
    console.log("Maptiler Data: ", res_data.features);

    if (response) {
      res.status(200).json(res_data.features);
      // res.status(200).json({
      //   street,
      //   postalCode,
      //   city,
      //   country,
      //   district,
      //   state,
      //   continent,
      //   area,
      // });
    } else {
      res.status().json({ message: "Could not process the request." });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
    console.error("Error: ", e);
  }
};

const getCityData = async (req, res, next) => {
  try {
    const { city } = req.body;
    // Validate that the city is provided
    if (!city || city.trim() === "") {
      return res.status(400).json({ message: "City is required" });
    }
    console.log("Req body: ", req.body);
    const encodedCity = encodeURIComponent(city);
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/${encodedCity}.json?key=${process.env.MAPTILER_API_KEY}`
    );
    const res_data = response.data.features;
    if (res_data && res_data.length > 0) {
      console.log("response for city: ", res_data);
      const { geometry } = res_data[0];
      const { coordinates } = geometry;
      const [longitude, latitude] = coordinates;
      return res.status(200).json({ latitude, longitude });
    }
  } catch (e) {
    console.error("Error while fetching the city data.");
    res
      .status(500)
      .json({ message: "Error while fetching the city location..." });
  }
};

module.exports = { register, login, user, getLocation, getCityData };
