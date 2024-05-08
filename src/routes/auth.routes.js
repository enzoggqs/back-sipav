import express from "express";
import { login } from "../controllers/auth.controller.js";

const authRoutes = (app) => {
  app.post("/login", login);
}

export default authRoutes;