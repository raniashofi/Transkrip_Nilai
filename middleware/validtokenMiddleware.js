const jwt = require("jsonwebtoken");

function verifyToken(role) {
  return function (req, res, next) {
    const accessToken = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      console.log("refresh_token tidak ditemukan, kembali ke login");
      return res.redirect("/login");
    }

    if (!accessToken) {
      console.log("access_token tidak ditemukan, kembali ke login");
      return res.redirect("/login");
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Access token sudah expire, verifikasi refresh_token");

          jwt.verify(
            refreshToken,
            process.env.REFRESH_ACCESS_TOKEN,
            (err, decodedRefresh) => {
              if (err) {
                console.log("Verifikasi refresh_token gagal:", err);
                return res.redirect("/login");
              }

              const newAccessToken = jwt.sign(
                {
                  role: decodedRefresh.role,
                  nim_nip: decodedRefresh.nim_nip,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "15m",
                }
              );

              console.log("Access_token baru dibuat:", newAccessToken);

              res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: false,
              });

              req.userRole = decodedRefresh.role;
              req.userNim_nip = decodedRefresh.nim_nip;

              if (role && req.userRole !== role) {
                if (req.userRole === "mahasiswa") {
                  return res.redirect("/home");
                } else if (req.userRole === "admin") {
                  return res.redirect("/admin/dashboard");
                } else if (req.userRole === "dosen") {
                  return res.redirect("/dosen/dashboard");
                }
              }
              return next();
            }
          );
        } else {
          console.log("Verifikasi access_token gagal:", err);
          return res.status(403).json({ message: "Token akses tidak valid" });
        }
      } else {
        req.userRole = decoded.role;
        req.userNim_nip = decoded.nim_nip;

        if (role && req.userRole !== role) {
          if (req.userRole === "mahasiswa") {
            return res.redirect("/home");
          } else if (req.userRole === "dosen") {
            return res.redirect("/dosen/dashboard");
          } else if (req.userRole === "admin") {
            return res.redirect("/admin/dashboard");
          }
        }

        next();
      }
    });
  };
}

module.exports = verifyToken;
