-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_responsible_id_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_vaccineId_fkey";

-- AlterTable
ALTER TABLE "Vaccine" ALTER COLUMN "doses_required" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
