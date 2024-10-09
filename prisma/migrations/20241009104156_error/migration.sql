-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_authorId_fkey`;

-- AlterTable
ALTER TABLE `blog` MODIFY `title` VARCHAR(255) NULL,
    MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
