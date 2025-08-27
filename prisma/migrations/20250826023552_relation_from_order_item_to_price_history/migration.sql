/*
  Warnings:

  - You are about to drop the column `priceSnapshot` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `priceSnapshotId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OrderItem" DROP COLUMN "priceSnapshot",
ADD COLUMN     "priceSnapshotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_priceSnapshotId_fkey" FOREIGN KEY ("priceSnapshotId") REFERENCES "public"."PriceHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
