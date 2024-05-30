const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel.js");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    console.log("Received refresh token:", refreshToken);

    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      console.log("User tidak ditemukan dengan refresh_token tersebut");
      return res.sendStatus(403);
    }

    console.log("User ditemukan:", user);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_ACCESS_TOKEN,
      (err, decoded) => {
        if (err) {
          console.log("Verifikasi refresh token gagal:", err);
          return res.sendStatus(403);
        }

        const { userId, nama, email, role, nim_nip } = decoded;
        const newAccessToken = jwt.sign(
          { userId, nama, email, role, nim_nip },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );

        console.log("New access token generated:", newAccessToken);

        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
