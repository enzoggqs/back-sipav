import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validations.js";
import { createUser, deleteUser, getAllUsers, getById, updateUser } from "../repositories/user.repository.js";
import { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "../services/mail.js";

const prisma = new PrismaClient();

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body);

    const cpfExists = await prisma.user.findUnique({
      where: { cpf: req.body.cpf },
    });

    if (cpfExists) {
      return (res.status(400).send("CPF já cadastrado."))
    }

    const { isResponsible } = req.body;

    if (isResponsible) {
      const { email, password } = req.body;

      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return (res.status(400).send("E-mail já cadastrado."))
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
    }
    const user = await createUser(req.body);
    await sendConfirmationEmail(req.body.email);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const get = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send("Falha ao buscar usuários.")
  }
}

export const getId = async (req, res) => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send("Falha ao buscar usuário.")
  }
}

export const update = async (req, res) => {
  try {
    console.log(req.body)
    if(req.body.cpf){
      const cpfExists = await prisma.user.findUnique({
        where: { cpf: req.body.cpf },
      });
  
      if (cpfExists) {
        return (res.status(400).send("CPF já cadastrado."))
      }
    }

    if(req.body.telegram){
      const telegramExists = await prisma.user.findUnique({
        where: { telegram: req.body.telegram },
      });
  
      if (telegramExists) {
        return (res.status(400).send("Telegram já cadastrado."))
      }
    }

    if(req.body.phoneNumber){
      const phoneNumberExists = await prisma.user.findUnique({
        where: { phoneNumber: req.body.phoneNumber },
      });
  
      if (phoneNumberExists) {
        return (res.status(400).send("Telefone já cadastrado."))
      }
    }
    const user = await updateUser(Number(req.params.id), req.body);
    
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const remove = async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
}