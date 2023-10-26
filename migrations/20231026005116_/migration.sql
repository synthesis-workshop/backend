-- CreateTable
CREATE TABLE `About` (
    `id` VARCHAR(191) NOT NULL,
    `aboutUs` VARCHAR(191) NOT NULL DEFAULT '',
    `ourMission` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
