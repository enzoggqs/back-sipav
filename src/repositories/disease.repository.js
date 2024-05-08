import { prisma } from "../services/prisma.js"

const nulifyObjectStrings = (values) => {
  // remove empty strings
  for (let [key, value] of Object.entries(values)) {
    if (value instanceof String) {
      value = value.trim();
    }
    if (!value) {
      values[key] = undefined;
    }
  }
  return values;
}

export const createDisease = async (data) => {
  data = nulifyObjectStrings(data);
  const disease = await prisma.disease.create({
    data,
    select: {
      id: true,
      name: true,
      disease_info: true,
      symptoms: true,
      treatment: true,
    }
  });
  return disease;
}

export const getAllDiseases = async () => {
  const diseases = await prisma.disease.findMany({
    select: {
      id: true,
      name: true,
      disease_info: true,
      symptoms: true,
      treatment: true,
    }
  });
  return diseases;
};

export const getById = async (id) => {
  const disease = await prisma.disease.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      disease_info: true,
      symptoms: true,
      treatment: true,
    }
  });
  return disease;
}

export const getVaccineById = async (diseaseId, userId) => {
  let vaccine = await prisma.vaccine.findMany({
    where: {
      diseases: { has: diseaseId },
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

  const disease = await prisma.disease.findUnique({
    where: {
      id: diseaseId
    },
    select: {
      id: true,
      name: true,
      disease_info: true,
      symptoms: true,
      treatment: true,
    }
  });

  let vaccination = {}

  if(vaccine.length > 0){
    vaccination = await prisma.vaccination.findMany({
      where: {
        vaccineId: vaccine[0].id,
        userId
      },
      select: {
        id: true,
        userId: true,
        vaccineId: true,
        date: true
      }
    });
  } else {
    vaccine = {}
  }

  return { disease, vaccine, vaccination };
}

export const updateDisease = async (id, data) => {
  data = nulifyObjectStrings(data);
  const disease = await prisma.disease.update({
    where: {
      id
    },
    data,
    select: {
      id: true,
      name: true,
      disease_info: true,
      symptoms: true,
      treatment: true,
    }
  });
  return disease;
}

export const deleteDisease = async (id) => {
  await prisma.disease.delete({
    where: {
      id
    }
  });
  return;
}