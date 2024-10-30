import User from "../models/user.js";
import Property from "../models/properties.js";
import { createError } from "../error.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

// User Sign Up
export const SignUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createError(409, "Email already exists"));

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = new User({ name, email, password: hashedPassword });
    const createdUser = await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: createdUser ._id }, process.env.JWT, { expiresIn: "9999 years" });
    return res.status(201).json({ token, user: createdUser });
  } catch (err) {
    next(createError(500, err.message));
  }
};

// User Sign In
export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next(createError(403, "Invalid password"));

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "9999 years" });
    return res.status(200).json({ token, user });
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Book a Property
export const BookingProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);
    const property = await Property.findById(propertyId);
    if (!property) return next(createError(404, "Property not found"));

    // Check if property is already booked
    if (!user.bookings.includes(propertyId)) {
      user.bookings.push(propertyId);
      await user.save();
    }
    return res.status(200).json({ message: "Property booked successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Get Booked Properties
export const GetBookingProperty = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("bookings");
    if (!user) return next(createError(404, "User not found"));

    return res.status(200).json(user.bookings);
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Add Property to Favorites
export const AddToFavorites = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);

    // Check if property is already in favorites
    if (!user.favourites.includes(propertyId)) {
      user.favourites.push(propertyId);
      await user.save();
    }

    return res.status(200).json({ message: "Property added to favourites", favourites: user.favourites });
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Remove Property from Favorites
export const RemoveFromFavorites = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const user = await User.findById(req.user.id);

    // Remove property from favorites
    user.favourites = user.favourites.filter(fav => !fav.equals(propertyId));
    await user.save();

    return res.status(200).json({ message: "Property removed from favourites", favourites: user.favourites });
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Get User Favorites
export const GetUserFavorites = async (req, res, next) => {
  try {
    // Populate the 'favourites' field with the full property details
    const user = await User.findById(req.user.id).populate("favourites", "title desc img rating price");
    if (!user) return next(createError(404, "User not found"));

    // Return the populated favourites
    return res.status(200).json(user.favourites);
  } catch (err) {
    next(createError(500, err.message));
  }
};
