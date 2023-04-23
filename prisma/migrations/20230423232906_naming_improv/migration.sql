/*
  Warnings:

  - You are about to drop the column `timelineId` on the `IndexCard` table. All the data in the column will be lost.
  - You are about to drop the column `realityId` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the `Reality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timeline` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[storyId,position]` on the table `IndexCard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[universeId,title]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Made the column `storyId` on table `IndexCard` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `universeId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IndexCard" DROP CONSTRAINT "IndexCard_storyId_fkey";

-- DropForeignKey
ALTER TABLE "IndexCard" DROP CONSTRAINT "IndexCard_timelineId_fkey";

-- DropForeignKey
ALTER TABLE "Reality" DROP CONSTRAINT "Reality_userId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_realityId_fkey";

-- DropForeignKey
ALTER TABLE "Timeline" DROP CONSTRAINT "Timeline_realityId_fkey";

-- DropIndex
DROP INDEX "IndexCard_timelineId_position_key";

-- DropIndex
DROP INDEX "Story_realityId_title_key";

-- AlterTable
ALTER TABLE "IndexCard" DROP COLUMN "timelineId",
ALTER COLUMN "storyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "realityId",
ADD COLUMN     "universeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Reality";

-- DropTable
DROP TABLE "Timeline";

-- CreateIndex
CREATE UNIQUE INDEX "IndexCard_storyId_position_key" ON "IndexCard"("storyId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Story_universeId_title_key" ON "Story"("universeId", "title");

-- AddForeignKey
ALTER TABLE "IndexCard" ADD CONSTRAINT "IndexCard_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_universeId_fkey" FOREIGN KEY ("universeId") REFERENCES "Universe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
