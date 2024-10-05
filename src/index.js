import express from "express";
import cors from "cors";
import 'dotenv/config'
import routes from "./routes/index.js";
import cron from "node-cron";
import { checkVaccinationExpiry, checkVaccinesNotTaken } from "./services/notification.service.js";

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(3333);
console.log("servidor iniciou na porta 3333")

cron.schedule("0 0 * * *", checkVaccinationExpiry); // diario

cron.schedule("0 0 1 * *", checkVaccinesNotTaken); // mensal
