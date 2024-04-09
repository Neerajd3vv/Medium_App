/*
  Warnings:

  - You are about to drop the column `userimage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userimage";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "profilePicture" TEXT,
    "bio" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profileId_key" ON "Profile"("profileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
