import express from "express";
import { getUsers, login } from "../controllers/Users.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/login', login);

export default router;