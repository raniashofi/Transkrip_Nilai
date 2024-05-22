import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getUser , getProfile , changePassword } from "../controllers/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

router.get("/dashboard", verifyToken('admin'), async (req, res) => {
  try {
    const user = await getUser(req, res); 
    res.render("admin/dashboard", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/profile', verifyToken('admin'), (req, res, next) => {
  console.log("Rute profil admin dipanggil");
  next();
}, getProfile);

export default router;
