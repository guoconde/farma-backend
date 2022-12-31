-- CreateEnum
CREATE TYPE "TypeOfUser" AS ENUM ('admin', 'employee', 'seller', 'initial');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "phone" CHAR(11) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "birthdate" DATE NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "typeOfUser" "TypeOfUser" NOT NULL DEFAULT E'initial',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
