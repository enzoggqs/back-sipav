import { create, get, getId, remove, update } from "../controllers/vaccine.controller.js";

const vaccineRoutes = (app) => {
  app.post("/vaccine", create);
  app.get("/vaccine", get);
  app.get("/vaccine/:id", getId);
  app.put("/vaccine/:id", update);
  app.delete("/vaccine/:id", remove);
};

export default vaccineRoutes;