/*
  Warnings:

  - Made the column `group` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `TeamMember` MODIFY `group` INTEGER NOT NULL;
