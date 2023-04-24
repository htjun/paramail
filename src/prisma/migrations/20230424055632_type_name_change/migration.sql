/*
  Warnings:

  - You are about to drop the column `usageType` on the `Usage` table. All the data in the column will be lost.
  - Added the required column `type` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "usageType",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UsageType";
