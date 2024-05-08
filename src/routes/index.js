import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import diseaseRoutes from "./disease.routes.js";
import vaccineRoutes from "./vaccine.routes.js";
import vaccinationRoutes from "./vaccination.routes.js";

const routes = app => {
  userRoutes(app);
  authRoutes(app);
  diseaseRoutes(app);
  vaccineRoutes(app);
  vaccinationRoutes(app);
};

export default routes;