-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium';
