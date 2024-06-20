const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/index.js");
const mahasiswaRouter = require("./routes/mahasiswa.js");
const adminRouter = require("./routes/admin.js");
const dosenRouter = require("./routes/dosen.js");
const previewRouter = require('./routes/preview.js');
const { fileURLToPath } = require("url");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const fs = require("fs");
const upload = require("./middleware/uploadFile");

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:5000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  serveStatic("public", {
    setHeaders: function (res, path) {
      if (serveStatic.mime.lookup(path) === "text/css") {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/nilai", (req, res) => {
  res.render("nilai");
});

app.use("/", indexRouter);
app.use("/mahasiswa", mahasiswaRouter);
app.use("/admin", adminRouter);
app.use("/dosen", dosenRouter);
app.use('/preview', previewRouter);

app.use((req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    res.locals.userLoggedIn = true;
  } else {
    res.locals.userLoggedIn = false;
  }
  next();
});


app.listen(5000, () => console.log("Server running at port 5000"));
