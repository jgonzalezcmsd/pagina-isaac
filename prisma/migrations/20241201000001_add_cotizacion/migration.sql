-- CreateTable
CREATE TABLE `Cotizacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `empresa` VARCHAR(191) NULL,
    `servicio` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `area` VARCHAR(191) NULL,
    `presupuesto` VARCHAR(191) NULL,
    `fechaRequerida` DATETIME(3) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `notas` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;