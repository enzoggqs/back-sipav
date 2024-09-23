import { prisma } from "../services/prisma.js"

const calculateAge = (birthdate) => {
  const diff = new Date() - new Date(birthdate).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const nulifyObjectStrings = (values) =>{
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
      type: true,
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
      type: true
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
      type: true
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

export const getTotalUserCount = async () => {
  const totalUsers = await prisma.user.count();
  return totalUsers;
};

export const getUsersVaccinationByAgeGroup = async () => {
  const usersWithVaccinations = await prisma.user.findMany({
    include: {
      vaccines: true
    }
  });

  const ageGroups = {
    '0-12': 0,
    '13-18': 0,
    '19-35': 0,
    '36-60': 0,
    '61+': 0,
  };

  usersWithVaccinations.forEach(user => {
    const age = calculateAge(user.birthdate);
    const vaccineCount = user.vaccines.length;

    if (age <= 12) {
      ageGroups['0-12'] += vaccineCount;
    } else if (age <= 18) {
      ageGroups['13-18'] += vaccineCount;
    } else if (age <= 35) {
      ageGroups['19-35'] += vaccineCount;
    } else if (age <= 60) {
      ageGroups['36-60'] += vaccineCount;
    } else {
      ageGroups['61+'] += vaccineCount;
    }
  });

  return ageGroups;
};
