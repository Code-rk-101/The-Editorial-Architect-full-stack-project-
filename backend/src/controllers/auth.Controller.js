const userModel = require("../models/user.Model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");
const cloudinary = require("cloudinary").v2;

const registerUser = [
  body("username")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().reduce((acc, error) => {
            if (!acc[error.path]) {
              acc[error.path] = [];
            }
            acc[error.path].push(error.msg);
            return acc;
          }, {}),
        });
      }

      const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }],
      });
      if (isUserAlreadyExists) {
        return res.status(400).json({
          message: "username or email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 13);
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRETS,
        { expiresIn: "1d" },
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      });

      res.status(201).json({
        message: "User Register sucessfully",
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role || null,
          location: user.location || null,
          bio: user.bio || null,
          profilePicture: user.profilePicture || null,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

const loginUser = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().reduce((acc, error) => {
            if (!acc[error.path]) {
              acc[error.path] = [];
            }
            acc[error.path].push(error.msg);
            return acc;
          }, {}),
        });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRETS,
        { expiresIn: "1d" },
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      });
      res.status(200).json({
        message: "User Loggedin sucessfully",
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role || null,
          location: user.location || null,
          bio: user.bio || null,
          profilePicture: user.profilePicture || null,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];
const logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklistModel.create({ token });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
    res.status(200).json({
      message: "User Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMeUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User data fetch successfully ",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role || null,
        location: user.location || null,
        bio: user.bio || null,
        profilePicture: user.profilePicture || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateMeUser = [
  body("username")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("role")
    .optional()
    .isLength({ max: 30 })
    .withMessage("Role must be less than 30 characters"),
  body("location")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Location must be less than 100 characters"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must be less than 500 characters"),

  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { username, role, location, bio } = req.body;
      const file = req.file;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().reduce((acc, error) => {
            if (!acc[error.path]) {
              acc[error.path] = [];
            }
            acc[error.path].push(error.msg);
            return acc;
          }, {}),
        });
      }

      // Fetch the existing user to get their current profile picture
      const existingUser = await userModel.findById(userId);
      const shouldRemovePic = req.body.removeProfilePicture === "true";
      let newProfilePicture = existingUser ? existingUser.profilePicture : null;

      // Feature: Remove existing image from Cloudinary to free up storage
      if (file || shouldRemovePic) {
        if (existingUser && existingUser.profilePicture) {
          // Only run destruction if the previous image was hosted on Cloudinary
          if (existingUser.profilePicture.includes("cloudinary.com")) {
            // Extract the unique Cloudinary `public_id` from the image URL using regex
            const publicIdMatch =
              existingUser.profilePicture.match(/\/v\d+\/(.+)\.\w+$/);
            const publicId = publicIdMatch ? publicIdMatch[1] : null;

            if (publicId) {
              // Asynchronously delete the old picture (safe to `.catch()` so it doesn't crash the request)
              cloudinary.uploader
                .destroy(publicId)
                .catch((err) =>
                  console.error("Cloudinary failed to delete old image:", err),
                );
            }
          }
        }
        // If a new input file is provided, set to new URL. If NO file, but told to remove, set to null.
        newProfilePicture = file ? file.path : null;
      }

      const user = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          username,
          role,
          location,
          bio,
          profilePicture: newProfilePicture,
        },
        { new: true, runValidators: true },
      );

      res.status(200).json({
        message: "User data updated successfully",
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role || null,
          location: user.location || null,
          bio: user.bio || null,
          profilePicture: user.profilePicture || null,
        },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: Object.keys(error.keyValue)[0] + " already exists",
        });
      }
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMeUser,
  updateMeUser,
};
