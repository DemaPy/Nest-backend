/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "JobPortal" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "JobPortal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPortalParsing" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "jobPortalId" INTEGER NOT NULL,

    CONSTRAINT "JobPortalParsing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobPortalParsing" ADD CONSTRAINT "JobPortalParsing_jobPortalId_fkey" FOREIGN KEY ("jobPortalId") REFERENCES "JobPortal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
