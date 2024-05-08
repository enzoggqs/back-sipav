import bcrypt from "bcrypt";
import { authValidation } from "../validations/auth.validations.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import express from "express";
import 'dotenv/config'

const secret = process.env.JWT_SECRET;

const prisma = new PrismaClient();

const router = express.Router();

export const login = async (req, res) => {
  try {
    await authValidation.validate(req.body);

    const { email, password} = req.body;

    if (!email) return res.status(400).send("Email field not filled");
    if (!password) return res.status(400).send("Password field not filled");
    
    const userExists = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        cpf: true,
        birthdate: true,
        telegram: true,
        phoneNumber: true,
        isResponsible: true,
        dependents: true,
      }
    });
    
    if(!userExists) {
      return(res.status(400).send("User not found"))
    }

    const passwordMatches = await bcrypt.compare(password, userExists.password);
    
    if (!passwordMatches) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      {
        id: userExists.id,
      },
      secret,
      {
        expiresIn: 86400,
      }
    );

    return res.status(200).send({
      userExists,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};