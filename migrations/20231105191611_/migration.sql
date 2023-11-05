-- AlterTable
ALTER TABLE `TeamMember` ADD COLUMN `cv_filename` VARCHAR(191) NULL,
    ADD COLUMN `cv_filesize` INTEGER NULL,
    ADD COLUMN `description` JSON NOT NULL,
    ADD COLUMN `group` INTEGER NULL;

-- CreateTable
CREATE TABLE `_Publication_teamMembers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Publication_teamMembers_AB_unique`(`A`, `B`),
    INDEX `_Publication_teamMembers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Publication_teamMembers` ADD CONSTRAINT `_Publication_teamMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Publication_teamMembers` ADD CONSTRAINT `_Publication_teamMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
