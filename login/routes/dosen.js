import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getUser , getProfileDosen , changePassword } from "../controllers/auth.js";
import { getNilai } from "../controllers/dosenController.js"

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

router.get("/dashboard", verifyToken('dosen'), async (req, res) => {
  try {
    const user = await getUser(req, res); 
    res.render("dosen/dashboard", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/profile', verifyToken('dosen'), (req, res, next) => {
  next();
}, getProfileDosen);

router.get('/profile/changePass',verifyToken('dosen'), async function (req, res) {
  const user = await getUser(req, res); 
  res.render('dosen/changePass', { user });
});

router.post('/changePass', verifyToken('dosen'), async (req, res) => {
  await changePassword(req, res);
});

router.get('/nilai', verifyToken('dosen'), (req, res, next) => {
  next();
}, getNilai);

export default router;