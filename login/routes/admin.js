import express from "express";
import { verifyToken } from "../middleware/validtokenMiddleware.js";
import { getProfile } from "../controllers/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/admin/dashboard');
});


router.get('/dashboard', verifyToken('admin'), getProfile);



export default router;