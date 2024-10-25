import express from "express";
import {
    AddProperties,
    GetProperties,
    GetPropertiesDetails,
} from "../controllers/properties.js";

const router = express.Router();

router.post("/add", AddProperties);
router.get("/get", GetProperties);
router.get("/:id", GetPropertiesDetails);

export default router;