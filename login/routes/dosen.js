import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getUser } from "../controllers/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/dosen/dashboard');
});

router.get("/dashboard", verifyToken('dosen'), async (req, res) => {
  const user = await getUser(req, res); 
  res.render("dosen/dashboard",{ user });
});

export default router;