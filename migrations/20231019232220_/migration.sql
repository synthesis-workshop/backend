/*
  Warnings:

  - You are about to alter the column `episodeNumber` on the `episode` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `episode` MODIFY `episodeNumber` DOUBLE NULL;
