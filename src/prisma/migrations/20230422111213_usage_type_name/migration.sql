/*
  Warnings:

  - You are about to drop the column `type` on the `Usage` table. All the data in the column will be lost.
  - Added the required column `usageType` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "type",
ADD COLUMN     "usageType" "UsageType" NOT NULL;
