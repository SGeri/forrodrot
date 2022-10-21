-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "hidden" BOOLEAN NOT NULL DEFAULT false;
