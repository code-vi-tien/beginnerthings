/*
  Warnings:

  - Added the required column `priceSnapshot` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" ADD COLUMN     "priceSnapshot" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;
