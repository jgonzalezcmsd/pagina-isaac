/*
  Warnings:

  - Added the required column `updatedAt` to the `Contacto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interaccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contacto` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Empresa` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Interaccion` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Mensaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(191) NOT NULL,
    `interaccionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_interaccionId_fkey` FOREIGN KEY (`interaccionId`) REFERENCES `Interaccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
