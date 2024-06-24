const express = require("express");
const verifyToken = require("../middleware/validtokenMiddleware.js");
const {
  getUser,
  getProfile,
} = require("../controllers/auth.js");
const { getListPengajuan,
  getListDitolak,
  getListDisetujui,
  getHistory,
  searchHistory,
  getPengelolaanData,
  approvePengajuan,
  rejectPengajuan, } = require("../controllers/admin.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", verifyToken("admin"), async (req, res) => {
  try {
    const user = await getUser(req, res);
    res.render("admin/dashboard", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/listPengajuan", verifyToken("admin"), getListPengajuan);
router.get("/historyAdmin", verifyToken("admin"), getHistory);
router.get("/searchHistory", verifyToken("admin"), searchHistory);
router.get("/listDitolak", verifyToken("admin"), getListDitolak);
router.get("/listDisetujui", verifyToken("admin"), getListDisetujui);



router.get("/pengelolaan", verifyToken("admin"), getPengelolaanData);

router.get(
  "/profile",
  verifyToken("admin"),
  (req, res, next) => {
    console.log("Rute profil admin dipanggil");
    next();
  },
  getProfile
);

router.post("/setuju", verifyToken("admin"), approvePengajuan);

router.post("/tolak", verifyToken("admin"), rejectPengajuan);

module.exports = router;
