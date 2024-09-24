import bcrypt from "bcrypt";
import { createVaccination, deleteVaccination, getById, getAllVaccinations, updateVaccination } from "../repositories/vaccination.repository.js";
import { prisma } from "../services/prisma.js";
import { getUsersVaccinationByAgeGroup } from "../repositories/user.repository.js";

export const create = async (req, res) => {
    try {
        const { userId, vaccineId, date } = req.body;

        // Obter os dados da vacina
        const vaccine = await prisma.vaccine.findUnique({
            where: { id: vaccineId },
            select: {
                doses_required: true,
                months_between_doses: true,
            },
        });

        if (!vaccine) {
            return res.status(400).send("Vacina não encontrada.");
        }

        // Calcular o endDate
        let endDate = null;
        if (vaccine.doses_required > 1) {
            const monthsBetweenDoses = parseInt(vaccine.months_between_doses, 10);
            if (!isNaN(monthsBetweenDoses)) {
                const dateObj = new Date(date);
                endDate = new Date(dateObj.setMonth(dateObj.getMonth() + monthsBetweenDoses * (vaccine.doses_required - 1)));
            }
        }

        console.log(endDate)

        const vaccination = await createVaccination({ ...req.body, endDate });
        console.log(vaccination)
        res.status(200).send(vaccination);
    } catch (e) {
        res.status(400).send("Falha ao criar vacinação.");
    }
};

export const get = async (req, res) => {
    try {
        const vaccinations = await getAllVaccinations();
        res.status(200).send(vaccinations);
    } catch (e) {
        res.status(400).send("Falha ao buscar vacinações.");
    }
}

export const getId = async (req, res) => {
    try {
        const vaccination = await getById(Number(req.params.userId), Number(req.params.vaccineId));
        res.status(200).send(vaccination);
    } catch (e) {
        res.status(400).send("Falha ao buscar vacinação.");
    }
}

export const update = async (req, res) => {
    try {
        const vaccination = await updateVaccination(Number(req.params.id), req.body);
        res.status(200).send(vaccination);
    } catch (e) {
        res.status(400).send("Falha ao atualizar vacinação.");
    }
}

export const remove = async (req, res) => {
    try {
        await deleteVaccination(Number(req.params.id));
        res.status(200).send();
    } catch (e) {
        res.status(400).send("Falha ao apagar vacinação.");
    }
}

export const getVaccinationDistributionByAgeGroup = async (req, res) => {
    try {
        const { diseaseId } = req.query;
        
        const parsedDiseaseId = diseaseId ? Number(diseaseId) : null;  // Garantir que o diseaseId seja convertido corretamente
        const ageGroupDistribution = await getUsersVaccinationByAgeGroup(parsedDiseaseId);
        
        res.status(200).json(ageGroupDistribution);
    } catch (error) {
        console.error("Erro ao buscar distribuição de vacinações por faixa etária:", error);
        res.status(500).send("Erro ao buscar os dados.");
    }
};
