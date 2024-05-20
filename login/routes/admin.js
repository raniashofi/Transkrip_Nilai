import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getUser } from "../controllers/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/admin/dashboard');
});

router.get("/dashboard", verifyToken('admin'), async (req, res) => {
  const user = await getUser(req, res); 
  res.render("admin/dashboard",{  user });
});

export default router;