-- CreateTable
CREATE TABLE "_FavoritedRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritedRooms_AB_unique" ON "_FavoritedRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritedRooms_B_index" ON "_FavoritedRooms"("B");

-- AddForeignKey
ALTER TABLE "_FavoritedRooms" ADD CONSTRAINT "_FavoritedRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritedRooms" ADD CONSTRAINT "_FavoritedRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
