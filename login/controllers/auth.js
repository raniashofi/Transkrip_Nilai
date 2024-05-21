import jwt from 'jsonwebtoken';
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';

dotenv.config();

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json("Email tidak ditemukan");
    }
    else{

  
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Password salah");  
    }

    const userId = user.id;
    const nama = user.nama;
    const email = user.email;
    const role = user.role;
    const nim_nip = user.nim_nip;

    const token = jwt.sign({ userId, nama, email,role,nim_nip }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId, nama, email,role,nim_nip }, process.env.REFRESH_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure:true
    });

    res.cookie("token", token, { httpOnly: true });

    if (user.role === "mahasiswa") {
      return res.redirect("/home");
    } else if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
  }
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) return res.sendStatus(204);

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
        token: token,
      },
    });

    if (!user) {
      console.log('User tidak ditemukan dengan refresh_token tersebut.');
      return res.sendStatus(204);
    }

    const userId = user.id;
    
    await Users.update({ refresh_token: null }, {
      where: {
        id: userId
      }
    });

    res.clearCookie('refreshToken');

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};


export function checkUserLoggedIn(req) {
    const refreshToken = req.cookies.refreshToken;
    
    let user = null;

    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN);
            user = {
                userId: decoded.userId,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
                nim_nip: decoded.nim_nip,
            };
            
        } catch (error) {
            console.error('Token tidak valid atau expire:', error.message);
            return { user: null };
        }
    }
    return {  user };
}

export const getUser = async (req, res) => {
  const { user } = checkUserLoggedIn(req, res);
  if (!user) {
    return res.redirect('/login');

  }
};