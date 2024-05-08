import bcrypt from "bcrypt";
import { createVaccine, getAllVaccines, getById, deleteVaccine, updateVaccine } from "../repositories/vaccine.repository.js";
import { prisma } from "../services/prisma.js";

export const create = async (req, res) => {
    try {
        console.log('entrou')
        const { name, diseases } = req.body;

        console.log(diseases)
        if(diseases.length <= 0 || diseases == undefined){
            return (res.status(400).send("Link at least one disease"))
        }

         // Verificar se todas as doenças existem no banco de dados
         const diseasesExist = await Promise.all(
            diseases.map(async (diseaseId) => {
                const disease = await prisma.disease.findUnique({
                    where: { id: diseaseId },
                });
                return disease;
            })
        );

        // Verificar se alguma doença não foi encontrada
        const missingDiseases = diseasesExist.filter((disease) => !disease);

        if (missingDiseases.length > 0) {
            return res.status(400).send("One or more diseases not found in the database");
        }

        const vaccineExists = await prisma.vaccine.findUnique({
            where: { name },
        });

        if (vaccineExists) {
            console.log("Vaccine already exists")
            return (res.status(400).send("Vaccine already exists"))
        } else {
            console.log("Vaccine not exists")
        }

        const vaccine = await createVaccine(req.body);
        res.status(200).send(vaccine);
    } catch (e) {
        res.status(400).send(e);
    }
};

export const get = async (req, res) => {
    console.log('entrou d')
    try {
        const vaccines = await getAllVaccines();
        res.status(200).send(vaccines);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const getId = async (req, res) => {
    try {
        const vaccine = await getById(Number(req.params.id));
        res.status(200).send(vaccine);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const update = async (req, res) => {
    try {
        const vaccine = await updateVaccine(Number(req.params.id), req.body);
        res.status(200).send(vaccine);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const remove = async (req, res) => {
    try {
        await deleteVaccine(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
}