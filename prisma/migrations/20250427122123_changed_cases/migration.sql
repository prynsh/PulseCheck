/*
  Warnings:

  - You are about to drop the column `Name` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `Url` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `name` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "Name",
DROP COLUMN "Url",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
