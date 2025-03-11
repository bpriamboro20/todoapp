-- AlterTable
ALTER TABLE `tasks` MODIFY `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low';
