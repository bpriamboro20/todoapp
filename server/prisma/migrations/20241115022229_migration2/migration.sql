/*
  Warnings:

  - You are about to drop the column `confirmPassword` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `confirmPassword`,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
