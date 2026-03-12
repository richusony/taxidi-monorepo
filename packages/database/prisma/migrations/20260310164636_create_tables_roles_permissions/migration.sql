/*
  Warnings:

  - The `latitude` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `price_per_hour_subunits` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `price_per_week_subunits` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallet_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('CUSTOMER', 'PARTNER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "rental_company" DROP CONSTRAINT "rental_company_company_location_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "wallet" DROP CONSTRAINT "wallet_user_id_fkey";

-- DropForeignKey
ALTER TABLE "wallet_transactions" DROP CONSTRAINT "wallet_transactions_wallet_id_fkey";

-- DropIndex
DROP INDEX "vehicles_owner_id_idx";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "rental_company" ALTER COLUMN "company_location_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "price_per_hour_subunits" SET DATA TYPE INTEGER,
ALTER COLUMN "price_per_week_subunits" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "bookings";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "wallet";

-- DropTable
DROP TABLE "wallet_transactions";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "WalletTxnType";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" "RoleName" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE INDEX "vehicles_owner_id_pickup_location_id_idx" ON "vehicles"("owner_id", "pickup_location_id");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rental_company" ADD CONSTRAINT "rental_company_company_location_id_fkey" FOREIGN KEY ("company_location_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
