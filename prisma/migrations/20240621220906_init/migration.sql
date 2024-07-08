-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('REGULAR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'REGULAR',
    "password" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT,
    "isResponsible" BOOLEAN NOT NULL DEFAULT true,
    "telegram" TEXT,
    "responsible_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "doses_required" TEXT NOT NULL,
    "months_between_doses" TEXT NOT NULL,
    "contraindications" TEXT[],
    "diseases" INTEGER[],

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "disease_info" TEXT NOT NULL,
    "symptoms" TEXT[],
    "treatment" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vaccineId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_key" ON "User"("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "Vaccine_name_key" ON "Vaccine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
