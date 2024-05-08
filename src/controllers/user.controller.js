import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validations.js";
import { createUser, deleteUser, getAllUsers, getById, updateUser } from "../repositories/user.repository.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (req, res) => {
  try { 
    await userValidation.validate(req.body);

    const { isResponsible } = req.body;

    if(isResponsible) {
      const { email, password} = req.body;
      
      const userExists = await prisma.user.findUnique({
        where: { email },
      });
      
      if(userExists) {
        return(res.status(400).send("User already exists"))
      }
  
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
    } 
    const user = await createUser(req.body);
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
    res.status(400).send(e);
  }
}

export const getId = async (req, res) => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const update = async (req, res) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

export const remove = async (req, res) => {
  try{
    await deleteUser(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
}