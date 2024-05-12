import express from "express";
import db from "./config/database.js";
import tabel_mahasiswa from "./models/UserModel.js"
import router from "./routes/index.js";
import { login } from "./controllers/Users.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
    await tabel_mahasiswa.sync();
} catch (error) {
    console.error(error);
}

app.use(express.json());
app.use(router);

app.get('/users', (req, res) => {
    res.send('GET request to the users endpoint');
});

app.post('/login', login);

app.listen(5000, ()=> console.log('Server running at port 5000'));