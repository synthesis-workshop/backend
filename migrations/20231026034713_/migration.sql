-- CreateTable
CREATE TABLE `Download` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `lastUpdated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fileDownload_filesize` INTEGER NULL,
    `fileDownload_filename` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
