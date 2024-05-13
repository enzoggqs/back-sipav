import bcrypt from "bcrypt";
import { createDisease, getAllDiseases, deleteDisease, getById, updateDisease, getVaccineById } from "../repositories/disease.repository.js";
import { prisma } from "../services/prisma.js";

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    const diseaseExists = await prisma.disease.findUnique({
      where: { name },
    });

    if (diseaseExists) {
      return (res.status(400).send("Vacina já existe."))
    }

    const disease = await createDisease(req.body);
    res.status(200).send(disease);
  } catch (e) {
    return (res.status(400).send(e)
  }
};

export const get = async (req, res) => {
  try {
    const diseases = await getAllDiseases();
    res.status(200).send(diseases);
  } catch (e) {
    return (res.status(400).send("Falha ao buscar vacinas."))
  }
}

export const getId = async (req, res) => {
  try {
    const disease = await getById(Number(req.params.id));
    res.status(200).send(disease);
  } catch (e) {
    return (res.status(400).send("Falha ao buscar vacina."))
  }
}

export const getDiseaseAndVaccineById = async (req, res) => {
  try {
    const vaccine = await getVaccineById(Number(req.params.id), Number(req.params.userId));
    res.status(200).send(vaccine);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const update = async (req, res) => {
  try {
    const disease = await updateDisease(Number(req.params.id), req.body);
    res.status(200).send(disease);
  } catch (e) {
    return (res.status(400).send("Falha ao atualizar vacina."))
  }
}

export const remove = async (req, res) => {
  try {
    await deleteDisease(Number(req.params.id));
    res.status(200).send();
  } catch (e) {
    return (res.status(400).send("Falha ao apagar vacina."))
  }
}