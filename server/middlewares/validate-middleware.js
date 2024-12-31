// Validating the req.body before saving the data in the database
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    // console.log(req.body);
    next();
  } catch (e) {
    const status = 422;
    const message = "Fill the form correctly";
    const extraDetails = "Validation Failed!";
    if (e.error && e.error.length > 0) {
      extraDetails = e.error[0].message;
    }
    const error = { status, message, extraDetails };
    console.log(e, error);
    next(error);
  }
};

module.exports = { validate };
