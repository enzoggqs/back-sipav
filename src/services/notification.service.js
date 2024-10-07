import { prisma } from "../services/prisma.js";
import { sendNotificationEmail, vaccinesNotTakenEmail } from "./mail.js";

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

export const checkVaccinesNotTaken = async () => {
  const vaccinesWithoutUser = await prisma.$queryRaw`select v.id, v.name
      from "Vaccine" v 
      left join "Vaccination" uv on (v.id = uv."vaccineId" )
      left join "User" u on (u.id = uv."userId") 
      where u.id is null;`;

  let queryResult,
    users = new Map();

  for (let vac of vaccinesWithoutUser) {
    // users that not vacinate for each of vaccines
    queryResult = await prisma.$queryRaw`select u.id, u.email 
        from "User" u
        left join "Vaccination" uv on (u.id = uv."userId"
                        and uv."vaccineId" = ${vac.id})
        where uv."vaccineId" is null
        and u."type" = 'REGULAR';`;

    // making object to prepare the email
    for (let j of queryResult) {
      if (users.get(j.email)) {
        users[j.email].push(vac.name);
      } else {
        users.set(j.email, [vac.name]);
      }
    }
  }

  for (let i of users) {
    await vaccinesNotTakenEmail(i[0], i[1]); //email, array de vacinas
  }
};
