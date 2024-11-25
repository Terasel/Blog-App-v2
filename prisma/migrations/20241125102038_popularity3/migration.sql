/*
  Warnings:

  - Made the column `popularity` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `popularity` VARCHAR(255) NOT NULL;
