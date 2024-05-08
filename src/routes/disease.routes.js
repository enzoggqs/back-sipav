import { create, get, getId, remove, update, getDiseaseAndVaccineById } from "../controllers/disease.controller.js";

const diseaseRoutes = (app) => {
  app.post("/disease", create);
  app.get("/disease", get);
  app.get("/disease/:id", getId);
  app.get("/disease/:id/user=:userId", getDiseaseAndVaccineById);
  app.put("/disease/:id", update);
  app.delete("/disease/:id", remove);
};

export default diseaseRoutes;