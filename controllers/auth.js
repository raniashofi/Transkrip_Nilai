const jwt = require("jsonwebtoken");
const {User} = require("../models/index");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.render("login", { error: "Email tidak ditemukan!" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.render("login", { error: "Password salah!" });
    }

    const nama = user.nama;
    const email = user.email;
    const role = user.role;
    const nim_nip = user.nim_nip;
    const jurusan = user.jurusan;
    const fakultas = user.fakultas;

    const token = jwt.sign(
      { nama, email, role, nim_nip, jurusan, fakultas },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { nama, email, role, nim_nip, jurusan, fakultas },
      process.env.REFRESH_ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          nim_nip: nim_nip,
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
      return res.redirect("/mahasiswa/home");
    } else if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else if (user.role === "dosen") {
      return res.redirect("/dosen/dashboard");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const nim_nip = req.userNim_nip;

    const user = await User.findOne({
      where: { nim_nip: nim_nip },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.render("admin/profile", {
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileMhs = async (req, res) => {
  try {
    const nim_nip = req.userNim_nip;
    const user = await User.findOne({
      where: { nim_nip: nim_nip },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User data:", user);

    return {
      nama: user.nama,
      email: user.email,
      role: user.role,
      nim_nip: user.nim_nip,
      fakultas: user.fakultas,
      jurusan: user.jurusan,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileDosen = async (req, res) => {
  try {
    const nim_nip = req.userNim_nip;
    const user = await User.findOne({
      where: { nim_nip: nim_nip },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User data:", user);

    res.render("dosen/profile", {
      user: {
        nama: user.nama,
        email: user.email,
        role: user.role,
        nim_nip: user.nim_nip,
        fakultas: user.fakultas,
        jurusan: user.jurusan,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.render("changePass", {
        message: "Password baru dan konfirmasi password tidak cocok",
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password saat ini salah" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.Logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("token");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.checkUserLoggedIn = function (req) {
  const refreshToken = req.cookies.refreshToken;

  let user = null;

  if (refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_ACCESS_TOKEN
      );
      user = {
        nama: decoded.nama,
        email: decoded.email,
        role: decoded.role,
        nim_nip: decoded.nim_nip,
        fakultas: decoded.fakultas,
        jurusan: decoded.jurusan,
      };
    } catch (error) {
      console.error("Token tidak valid atau expire:", error.message);
      return { user: null };
    }
  }
  return { user };
};

exports.getUser = async (req, res) => {
  const { user } = exports.checkUserLoggedIn(req);
  if (!user) {
    return res.redirect("/login");
  }
  return user;
};
