/*
  Warnings:

  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `about`;

-- CreateTable
CREATE TABLE `AboutUsSection` (
    `id` VARCHAR(191) NOT NULL,
    `aboutUs` VARCHAR(191) NOT NULL DEFAULT '',
    `ourMission` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
