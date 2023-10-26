-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT true,
    `status` VARCHAR(191) NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastLoginDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `description` JSON NOT NULL,
    `episodeNumber` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT '',
    `runtime` VARCHAR(191) NOT NULL DEFAULT '00:00',
    `youtubeVideoId` VARCHAR(191) NOT NULL DEFAULT '',
    `publishedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',

    UNIQUE INDEX `Episode_episodeNumber_key`(`episodeNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Keyword` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Episode_keywords` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Episode_keywords_AB_unique`(`A`, `B`),
    INDEX `_Episode_keywords_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Episode_relatedEpisodes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Episode_relatedEpisodes_AB_unique`(`A`, `B`),
    INDEX `_Episode_relatedEpisodes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Episode_keywords` ADD CONSTRAINT `_Episode_keywords_A_fkey` FOREIGN KEY (`A`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Episode_keywords` ADD CONSTRAINT `_Episode_keywords_B_fkey` FOREIGN KEY (`B`) REFERENCES `Keyword`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Episode_relatedEpisodes` ADD CONSTRAINT `_Episode_relatedEpisodes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Episode_relatedEpisodes` ADD CONSTRAINT `_Episode_relatedEpisodes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
