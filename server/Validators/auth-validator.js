const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(5, { message: "Email must be of atleast 5 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, {
      message: "Password should be of atleast 8 characters and unique.",
    })
    .max(1024, { message: "Password should be less than 1024 characters." }),
});

const registerSchema = loginSchema.extend({
  username: z
    .string({
      required_error: "Please enter a valid username.",
    })
    .trim()
    .min(5, {
      message: "Username should be of atleast than 5 characters.",
    })
    .max(255, { message: "Username should be less than 255 characters." }),
});

const addressSchema = z.object({
  houseNo: z.coerce
    .number({
      required_error: "Please enter your correct house No.",
    })
    .min(1, { message: "Please enter a valid number" })
    .max(999, { message: "It should be less than 1000" }),
  streetAddress: z
    .string({
      required_error: "Please enter your correct street address",
    })
    .min(10, { message: "Address must be of atleast of 10 characters." }),
  category: z.string({
    required_error: "Please select a category for your address",
  }),
});

module.exports = { loginSchema, registerSchema, addressSchema };
