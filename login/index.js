import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import indexRouter from "./routes/index.js";
import mahasiswaRouter from "./routes/mahasiswa.js";
import adminRouter from "./routes/admin.js";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import serveStatic from "serve-static";


const __filename = fileURLToPath(import.meta.url);

dotenv.config();
const app = express();

app.use(serveStatic('public', {
  setHeaders: function (res, path) {
    if (serveStatic.mime.lookup(path) === 'text/css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));


app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.get('/', (req, res) => {
  res.render('login')
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials:true, origin:'http://localhost:5000'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gunakan router yang sesuai
app.use('/', indexRouter);
app.use('/', mahasiswaRouter);
app.use('/admin', adminRouter);


// Middleware untuk menentukan status login pengguna
app.use((req, res, next) => {
  // Cek apakah refreshToken ada di cookie
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    // Jika ada, anggap pengguna sudah login
    res.locals.userLoggedIn = true;
  } else {
    // Jika tidak, anggap pengguna belum login
    res.locals.userLoggedIn = false;
  }
  next();
});

app.listen(5000, ()=> console.log('Server running at port 5000'));