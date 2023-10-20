-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLoginDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `episodeNumber` DOUBLE NULL,
    `section` VARCHAR(191) NOT NULL DEFAULT '',
    `runtime` VARCHAR(191) NOT NULL DEFAULT '00:00',
    `youtubeVideoId` JSON NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL DEFAULT 'draft',

    UNIQUE INDEX `Episode_episodeNumber_key`(`episodeNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Keyword` (
    `id` VARCHAR(191) NOT NULL,
    `keyword` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Episode_keyword` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Episode_keyword_AB_unique`(`A`, `B`),
    INDEX `_Episode_keyword_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Episode_keyword` ADD CONSTRAINT `_Episode_keyword_A_fkey` FOREIGN KEY (`A`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Episode_keyword` ADD CONSTRAINT `_Episode_keyword_B_fkey` FOREIGN KEY (`B`) REFERENCES `Keyword`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
