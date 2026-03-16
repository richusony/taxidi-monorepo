/*
  Warnings:

  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AddressTag" AS ENUM ('HOME', 'COMPANY');

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_pickup_location_id_fkey";

-- DropTable
DROP TABLE "locations";

-- CreateTable
CREATE TABLE "rental_company" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "company_location_id" TEXT NOT NULL,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rental_company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "address_line_one" TEXT NOT NULL,
    "address_line_two" TEXT,
    "address_tag" "AddressTag" NOT NULL DEFAULT 'COMPANY',
    "latitude" TEXT,
    "longitude" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rental_company_owner_id_key" ON "rental_company"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "rental_company_company_location_id_key" ON "rental_company"("company_location_id");

-- AddForeignKey
ALTER TABLE "rental_company" ADD CONSTRAINT "rental_company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_company" ADD CONSTRAINT "rental_company_company_location_id_fkey" FOREIGN KEY ("company_location_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_pickup_location_id_fkey" FOREIGN KEY ("pickup_location_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
