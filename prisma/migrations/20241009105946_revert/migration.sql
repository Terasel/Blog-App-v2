/*
  Warnings:

  - Made the column `title` on table `blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_authorId_fkey`;

-- AlterTable
ALTER TABLE `blog` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
