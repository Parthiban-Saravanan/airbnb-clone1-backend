import express from "express";
import {
    AddToFavorites,
    GetUserFavorites,
    RemoveFromFavorites,
    SignUp,
    SignIn,
    BookingProperty,
    GetBookingProperty,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/addToFavorites", [verifyToken], AddToFavorites);
router.get("/getFavorites", [verifyToken], GetUserFavorites);
router.post("/removeFavorite", [verifyToken], RemoveFromFavorites);
router.post("booking",  [verifyToken], BookingProperty);

export default router;
