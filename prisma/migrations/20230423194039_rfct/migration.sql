-- AlterTable
ALTER TABLE "IndexCard" ADD COLUMN     "storyId" INTEGER;

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "realityId" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Universe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "dateOfCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Universe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_realityId_title_key" ON "Story"("realityId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Universe_userId_title_key" ON "Universe"("userId", "title");

-- AddForeignKey
ALTER TABLE "IndexCard" ADD CONSTRAINT "IndexCard_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_realityId_fkey" FOREIGN KEY ("realityId") REFERENCES "Universe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Universe" ADD CONSTRAINT "Universe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
