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

export const createVaccination = async (data) => {
    data = nulifyObjectStrings(data);
    const vaccination = await prisma.vaccination.create({
        data,
        select: {
            id: true,
            userId: true,
            vaccineId: true,
            date: true,
            endDate: true
        }
    });

    return vaccination;
}

export const getAllVaccinations = async () => {
    const vaccinations = await prisma.vaccination.findMany({
        select: {
            id: true,
            userId: true,
            vaccineId: true,
            date: true,
            endDate: true
        }
    });
    return vaccinations;
};

export const getById = async (userId, vaccineId) => {
    const vaccination = await prisma.vaccination.findMany({
        where: {
            vaccineId,
            userId
        },
        select: {
            id: true,
            userId: true,
            vaccineId: true,
            date: true
        }
    });
    return vaccination;
}

export const updateVaccination = async (id, data) => {
    const vaccination = await prisma.vaccination.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            userId: true,
            vaccineId: true,
            date: true
        }
    });
    return vaccination;
}

export const deleteVaccination = async (id) => {
    await prisma.vaccination.delete({
        where: {
            id
        }
    });
    return;
}