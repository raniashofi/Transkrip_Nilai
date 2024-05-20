import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { checkUserLoggedIn } from "../controllers/auth.js"; // Pastikan Anda mengimpor fungsi checkUserLoggedIn

const router = express.Router();

router.get("/home", verifyToken('mahasiswa'), async function (req, res) {
  try {
    const { user } = checkUserLoggedIn(req, res);
    if (!user) {
      return res.redirect('/login');
    }
    res.render("home", { user }); // Assuming your view file is named 'home.ejs'
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
