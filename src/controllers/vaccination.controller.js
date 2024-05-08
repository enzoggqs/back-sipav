import bcrypt from "bcrypt";
import { createVaccination, deleteVaccination, getById, getAllVaccinations, updateVaccination } from "../repositories/vaccination.repository.js";
import { prisma } from "../services/prisma.js";

export const create = async (req, res) => {
    try {
        console.log('entrou 1')

        const vaccination = await createVaccination(req.body);
        res.status(200).send(vaccination);
    } catch (e) {
        console.log('entrou')
        res.status(400).send(e);
    }
};

export const get = async (req, res) => {
    try {
        const vaccinations = await getAllVaccinations();
        res.status(200).send(vaccinations);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const getId = async (req, res) => {
    try {
        const vaccination = await getById(Number(req.params.userId), Number(req.params.vaccineId));
        res.status(200).send(vaccination);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const update = async (req, res) => {
    try {
        const vaccination = await updateVaccination(Number(req.params.id), req.body);
        res.status(200).send(vaccination);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const remove = async (req, res) => {
    try {
        await deleteVaccination(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
}