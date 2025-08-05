/*
  Warnings:

  - The values [CHECKED_OUT] on the enum `CartStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `priceSnapshot` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `variant` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `cartSnapshot` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `subtotal` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `tax` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `DebugTest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId,productVariantId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productVariantId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `cartId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CartStatus_new" AS ENUM ('ACTIVE', 'ABANDONED');
ALTER TABLE "public"."Cart" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Cart" ALTER COLUMN "status" TYPE "public"."CartStatus_new" USING ("status"::text::"public"."CartStatus_new");
ALTER TYPE "public"."CartStatus" RENAME TO "CartStatus_old";
ALTER TYPE "public"."CartStatus_new" RENAME TO "CartStatus";
DROP TYPE "public"."CartStatus_old";
ALTER TABLE "public"."Cart" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_paymentId_fkey";

-- DropIndex
DROP INDEX "public"."CartItem_cartId_productId_variant_key";

-- DropIndex
DROP INDEX "public"."Order_paymentId_key";

-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "priceSnapshot",
DROP COLUMN "productId",
DROP COLUMN "quantity",
DROP COLUMN "variant",
ADD COLUMN     "productVariantId" TEXT NOT NULL,
ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "cartSnapshot",
DROP COLUMN "paymentId",
ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tax" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "orderId" TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "price",
DROP COLUMN "stock";

-- DropTable
DROP TABLE "public"."DebugTest";

-- CreateTable
CREATE TABLE "public"."ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variant" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceSnapshot" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productVariantId_key" ON "public"."OrderItem"("orderId", "productVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productVariantId_key" ON "public"."CartItem"("cartId", "productVariantId");

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
