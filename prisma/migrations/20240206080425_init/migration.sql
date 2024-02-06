/*
  Warnings:

  - You are about to drop the column `data` on the `PromptStorage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromptStorage" DROP COLUMN "data",
ADD COLUMN     "expiresAt" TIMESTAMP(3);
