/*
  Warnings:

  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('REGULAR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'REGULAR';

-- AlterTable
ALTER TABLE "Vaccination" ADD COLUMN     "endDate" TIMESTAMP(3);
