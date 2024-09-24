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

export const getMonthlyVaccinationDistribution = async (req, res) => {
    try {
        const vaccinations = await getAllVaccinations(); // Busca todas as vacinações
        const selectedYear = req.query.year ? parseInt(req.query.year, 10) : null;

        // Função para gerar todos os meses no formato MM, com contagem 0
        const generateEmptyMonths = () => {
            const months = [];
            for (let month = 1; month <= 12; month++) {
                const monthString = month.toString().padStart(2, '0'); // Formato MM (ex: 01, 02, ..., 12)
                months.push({ month: monthString, count: 0 });
            }
            return months;
        };

        let monthlyDistribution = {};

        // Agrupa as vacinações por mês e ano, ou apenas por mês se nenhum ano for selecionado
        vaccinations.forEach(vaccination => {
            const date = new Date(vaccination.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Formato MM

            // Se houver um ano selecionado, filtra pelo ano; caso contrário, agrupa por mês independentemente do ano
            if (!selectedYear || year === selectedYear) {
                if (!monthlyDistribution[month]) {
                    monthlyDistribution[month] = 0;
                }
                monthlyDistribution[month]++;
            }
        });

        let monthlyData = [];

        if (selectedYear) {
            // Se um ano foi selecionado, retorna os meses desse ano com contagem
            monthlyData = generateEmptyMonths();
            monthlyData.forEach(item => {
                if (monthlyDistribution[item.month]) {
                    item.count = monthlyDistribution[item.month]; // Atualiza a contagem se houver dados
                }
            });
        } else {
            // Se nenhum ano foi selecionado, retorna o somatório para cada mês independente do ano
            monthlyData = generateEmptyMonths();
            monthlyData.forEach(item => {
                if (monthlyDistribution[item.month]) {
                    item.count = monthlyDistribution[item.month]; // Atualiza a contagem
                }
            });
        }

        res.status(200).json(monthlyData);
    } catch (error) {
        console.error("Erro ao buscar distribuição mensal de vacinações:", error);
        res.status(500).send("Erro ao buscar os dados.");
    }
};
