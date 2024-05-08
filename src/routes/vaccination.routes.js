import { create, get, getId, remove, update } from "../controllers/vaccination.controller.js";

const vaccinationRoutes = (app) => {
  app.post("/vaccination", create);
  app.get("/vaccination", get);
  app.get("/vaccination/:userId/:vaccineId", getId);
  app.put("/vaccination/:id", update);
  app.delete("/vaccination/:id", remove);
};

export default vaccinationRoutes;