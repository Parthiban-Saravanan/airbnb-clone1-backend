import express from "express";
import {
    AddToFavorites,
    GetUserFavorites,
    RemoveFromFavorites,
    SignUp,
    SignIn,
    BookingProperty,
    GetBookingProperty,
    GetBookedProperties,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/addToFavorites", verifyToken, AddToFavorites);
router.get("/getFavorites", verifyToken, GetUserFavorites);
router.post("/removeFavorite", verifyToken, RemoveFromFavorites);
router.post("/booking", verifyToken, BookingProperty);
router.get("/getBookedProperties", verifyToken, GetBookedProperties);
router.get("/getBookingProperty", verifyToken, GetBookingProperty);

export default router;
