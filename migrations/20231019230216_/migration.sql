/*
  Warnings:

  - You are about to drop the column `keywordList` on the `keyword` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `keyword` DROP COLUMN `keywordList`,
    ADD COLUMN `keyword` VARCHAR(191) NOT NULL DEFAULT '';
