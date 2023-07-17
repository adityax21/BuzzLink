//handle login related routes
import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

//post method on the router that handles HTTP POST requests
router.post("/login", login);

export default router;