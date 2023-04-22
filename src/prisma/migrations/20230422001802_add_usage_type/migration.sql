/*
  Warnings:

  - Added the required column `type` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('analysis', 'generate');

-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "type" "UsageType" NOT NULL;
