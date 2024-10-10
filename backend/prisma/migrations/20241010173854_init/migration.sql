/*
  Warnings:

  - You are about to drop the `_FavoritedRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoritedRooms" DROP CONSTRAINT "_FavoritedRooms_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritedRooms" DROP CONSTRAINT "_FavoritedRooms_B_fkey";

-- DropTable
DROP TABLE "_FavoritedRooms";

-- CreateTable
CREATE TABLE "_FavoriteRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteRooms_AB_unique" ON "_FavoriteRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteRooms_B_index" ON "_FavoriteRooms"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteRooms" ADD CONSTRAINT "_FavoriteRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteRooms" ADD CONSTRAINT "_FavoriteRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
