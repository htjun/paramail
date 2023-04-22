/*
  Warnings:

  - Made the column `tokenUsage` on table `Usage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usage" ALTER COLUMN "tokenUsage" SET NOT NULL;
