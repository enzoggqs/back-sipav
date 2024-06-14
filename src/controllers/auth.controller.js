import bcrypt from "bcrypt";
import { authValidation } from "../validations/auth.validations.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import 'dotenv/config'

const secret = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    await authValidation.validate(req.body);

    const { email, password} = req.body;

    if (!email) return res.status(400).send("E-mail não preenchido.");
    if (!password) return res.status(400).send("Senha não preenchida.");
    
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
        type: true,
      }
    });
    
    if(!userExists) {
      return(res.status(400).send("Usuário não encontrado."))
    }

    const passwordMatches = await bcrypt.compare(password, userExists.password);
    
    if (!passwordMatches) {
      return res.status(400).send("Usuário e senha não batem.");
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