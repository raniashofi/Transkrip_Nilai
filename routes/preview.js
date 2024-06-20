const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/validtokenMiddleware.js");

router.get("/", verifyToken("mahasiswa"), (req, res) => {
  const pdfPath = req.query.pdf;
  if (!pdfPath) {
    return res.status(400).send("PDF path is required");
  }
  res.render("mahasiswa/preview", { pdfPath });
});

module.exports = router;
