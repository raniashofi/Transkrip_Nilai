import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getProfileMhs } from "../controllers/auth.js"; // Pastikan Anda mengimpor fungsi checkUserLoggedIn

const router = express.Router();

router.get('/home', verifyToken('mahasiswa'), getProfileMhs);


export default router;
