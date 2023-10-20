/*
  Warnings:

  - You are about to drop the column `problemSetLink_filename` on the `problemset` table. All the data in the column will be lost.
  - You are about to drop the column `problemSetLink_filesize` on the `problemset` table. All the data in the column will be lost.
  - You are about to drop the column `solutionLink_filename` on the `problemset` table. All the data in the column will be lost.
  - You are about to drop the column `solutionLink_filesize` on the `problemset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `problemset` DROP COLUMN `problemSetLink_filename`,
    DROP COLUMN `problemSetLink_filesize`,
    DROP COLUMN `solutionLink_filename`,
    DROP COLUMN `solutionLink_filesize`,
    ADD COLUMN `problemSetFile_filename` VARCHAR(191) NULL,
    ADD COLUMN `problemSetFile_filesize` INTEGER NULL,
    ADD COLUMN `solutionFile_filename` VARCHAR(191) NULL,
    ADD COLUMN `solutionFile_filesize` INTEGER NULL;
