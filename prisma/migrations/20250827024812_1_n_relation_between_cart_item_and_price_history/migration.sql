/*
  Warnings:

  - You are about to drop the column `priceSnapshot` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `priceSnapshotId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "priceSnapshot",
ADD COLUMN     "priceSnapshotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_priceSnapshotId_fkey" FOREIGN KEY ("priceSnapshotId") REFERENCES "public"."PriceHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
