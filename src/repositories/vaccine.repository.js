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

export const createVaccine = async (data) => {
  console.log(data)
  const vaccine = await prisma.vaccine.create({
    data,
    select: {
      id: true,
      name: true,
      doses_required: true,
      months_between_doses: true,
      contraindications: true,
      diseases: true
    }
  });

  return vaccine;
}

export const getAllVaccines = async () => {
  const vaccines = await prisma.vaccine.findMany({
    select: {
      id: true,
      name: true,
      doses_required: true,
      months_between_doses: true,
      contraindications: true,
      diseases: true
    }
  });
  return vaccines;
};

export const getById = async (id) => {
  const vaccine = await prisma.vaccine.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      doses_required: true,
      months_between_doses: true,
      contraindications: true,
      diseases: true
    }
  });
  return vaccine;
}

export const updateVaccine = async (id, data) => {
  data = nulifyObjectStrings(data);
  const vaccine = await prisma.vaccine.update({
    where: {
      id
    },
    data,
    select: {
      id: true,
      name: true,
      doses_required: true,
      months_between_doses: true,
      contraindications: true,
      diseases: true
    }
  });
  return vaccine;
}

export const deleteVaccine = async (id) => {
  await prisma.vaccine.delete({
    where: {
      id
    }
  });
  return;
}