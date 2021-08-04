const User = require("../models/userSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

const { authSchema, loginSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

exports.register = async (req, res, next) => {
  try {
    const validatedData = await authSchema.validateAsync(req.body);

    const isEmailAlreadyExists = await User.findOne({
      email: validatedData.email,
    });
    if (isEmailAlreadyExists) {
      throw createError.Conflict(`${validatedData.email} already exists `);
    }

    const user = new User(validatedData);
    const savedUser = await user.save();
    const token = await signAccessToken(savedUser._id);

    return res.status(201).json({
      message: "User is created",
      authToken: token,
      user: savedUser,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

//! login controller
exports.login = async (req, res, next) => {
  try {
    const validatedData = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      throw createError.Unauthorized("Invalid Credentials !!!");
    }

    const isSamePassword = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isSamePassword) {
      throw createError.Unauthorized("Invalid Credentials !!!");
    }
    // generate access token
    const token = await signAccessToken(user._id);

    user.password = undefined;
    user.__v = undefined;
    return res.json({
      authToken: token,
      user,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
