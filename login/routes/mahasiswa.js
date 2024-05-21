import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { checkUserLoggedIn } from "../controllers/auth.js";

const router = express.Router();

router.get("/home", verifyToken('mahasiswa'), async function (req, res) {
  try {
    const { user } = checkUserLoggedIn(req, res);
    if (!user) {
      return res.redirect('/login');
    }
    res.render("home", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
