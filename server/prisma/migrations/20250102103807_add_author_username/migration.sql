/*
  Warnings:

  - Added the required column `authorUsername` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `authorUsername` VARCHAR(255) NOT NULL;
