import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import indexRouter from "./routes/index.js";
import mahasiswaRouter from "./routes/mahasiswa.js";
import adminRouter from "./routes/admin.js";
import dosenRouter from "./routes/dosen.js";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import serveStatic from "serve-static";

dotenv.config();
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __filename = fileURLToPath(import.meta.url);

app.use(serveStatic('public', {
  setHeaders: function (res, path) {
    if (serveStatic.mime.lookup(path) === 'text/css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


app.get('/', (req, res) => {
  res.render('login')
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/nilai', (req, res) => {
  res.render('nilai');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials:true, origin:'http://localhost:5000'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/admin', adminRouter);
app.use('/dosen', dosenRouter);

app.use((req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    res.locals.userLoggedIn = true;
  } else {
    res.locals.userLoggedIn = false;
  }
  next();
});

app.listen(5000, ()=> console.log('Server running at port 5000'));