import { prisma } from "../services/prisma.js";
import { sendNotificationEmail } from "./mail.js";

export const checkVaccinationExpiry = async () => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const expiringVaccinations = await prisma.vaccination.findMany({
      where: {
        endDate: {
          gte: today,
          lte: nextWeek,
        },
      },
      include: {
        user: true,
        vaccine: true,
      },
    });

    expiringVaccinations.forEach(async (vaccination) => {
      const { user, vaccine, endDate } = vaccination;
      await sendNotificationEmail(user.email, vaccine.name, endDate);
    });

  } catch (error) {
    console.error("Erro ao verificar expiração de vacinas:", error);
  }
};