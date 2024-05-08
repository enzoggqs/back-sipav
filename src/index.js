import express from "express";
import cors from "cors";
import 'dotenv/config'
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(3333);
console.log("servidor iniciou na porta 3333")