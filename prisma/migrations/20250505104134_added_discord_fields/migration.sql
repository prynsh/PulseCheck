-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "discordEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "discordUrl" TEXT NOT NULL DEFAULT '';
