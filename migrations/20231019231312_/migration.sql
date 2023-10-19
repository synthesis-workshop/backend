/*
  Warnings:

  - You are about to alter the column `episodeNumber` on the `episode` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[episodeNumber]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `episode` MODIFY `episodeNumber` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Episode_episodeNumber_key` ON `Episode`(`episodeNumber`);
