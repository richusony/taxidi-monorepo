/*
  Warnings:

  - You are about to drop the column `brand` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `variant_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('HATCHBACK', 'SEDAN', 'SUV', 'MUV', 'COUPE', 'CONVERTIBLE', 'WAGON', 'VAN', 'MINIVAN', 'PICKUP', 'TRUCK', 'BUS', 'AUTO_RICKSHAW', 'MOTORCYCLE', 'SCOOTER', 'MOPED', 'ELECTRIC_CAR', 'ELECTRIC_BIKE', 'ELECTRIC_SCOOTER', 'OTHER');

-- DropIndex
DROP INDEX "vehicles_owner_id_pickup_location_id_idx";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "brand",
DROP COLUMN "model",
ADD COLUMN     "variant_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "vehicle_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,

    CONSTRAINT "vehicle_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "body_type" "BodyType",
    "seats" INTEGER,
    "fuel_type" TEXT,

    CONSTRAINT "vehicle_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "transmission" TEXT,
    "engine" TEXT,
    "mileage" DOUBLE PRECISION,
    "seats" INTEGER,
    "fuel_type" TEXT,

    CONSTRAINT "vehicle_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_types_name_key" ON "vehicle_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_brands_name_type_id_key" ON "vehicle_brands"("name", "type_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_models_name_brand_id_key" ON "vehicle_models"("name", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_variants_name_model_id_key" ON "vehicle_variants"("name", "model_id");

-- CreateIndex
CREATE INDEX "vehicles_owner_id_pickup_location_id_variant_id_idx" ON "vehicles"("owner_id", "pickup_location_id", "variant_id");

-- AddForeignKey
ALTER TABLE "vehicle_brands" ADD CONSTRAINT "vehicle_brands_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "vehicle_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_variants" ADD CONSTRAINT "vehicle_variants_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "vehicle_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "vehicle_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
