/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Reality` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "IndexCard" ALTER COLUMN "sceneHeading" SET DEFAULT '',
ALTER COLUMN "synopsis" SET DEFAULT '',
ALTER COLUMN "conflict" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Reality" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Timeline" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reality_userId_title_key" ON "Reality"("userId", "title");
