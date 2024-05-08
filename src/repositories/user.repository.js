import { prisma } from "../services/prisma.js"

const nulifyObjectStrings = (values) =>{
  // remove empty strings
  for (let [key, value] of Object.entries(values)) {
    if (value instanceof String ){
      value = value.trim();
    }
    if (!value){
      values[key] = undefined;
    }
  }
  return values;
}

export const createUser = async (data) => {
  data = nulifyObjectStrings(data);
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      birthdate: true,
      telegram: true,
      phoneNumber: true,
      isResponsible: true,
      dependents: true,
    }
  });
  return user;
}

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      birthdate: true,
      telegram: true,
      phoneNumber: true,
      isResponsible: true,
      dependents: true,
    }
  });
  return users;
};

export const getById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      birthdate: true,
      telegram: true,
      phoneNumber: true,
      isResponsible: true,
      dependents: true,
    }
  });
  return user;
}

export const updateUser = async (id, data) => {
  data = nulifyObjectStrings(data);
  const user = await prisma.user.update({
    where: {
      id
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      cpf: true,
      birthdate: true,
      telegram: true,
      phoneNumber: true,
      isResponsible: true,
      dependents: true,
    }
  });
  return user;
}

export const deleteUser = async (id) => {
  await prisma.user.delete({
    where: {
      id
    }
  });
  return;
}