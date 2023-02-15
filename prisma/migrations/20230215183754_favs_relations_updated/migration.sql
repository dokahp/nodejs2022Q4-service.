/*
  Warnings:

  - You are about to drop the column `favouritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favouritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favouritesId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favouritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favouritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favouritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favouritesId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favouritesId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favouritesId";

-- CreateTable
CREATE TABLE "_ArtistToFavourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToFavourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavouritesToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToFavourites_AB_unique" ON "_ArtistToFavourites"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToFavourites_B_index" ON "_ArtistToFavourites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFavourites_AB_unique" ON "_AlbumToFavourites"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToFavourites_B_index" ON "_AlbumToFavourites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritesToTrack_AB_unique" ON "_FavouritesToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritesToTrack_B_index" ON "_FavouritesToTrack"("B");

-- AddForeignKey
ALTER TABLE "_ArtistToFavourites" ADD CONSTRAINT "_ArtistToFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavourites" ADD CONSTRAINT "_ArtistToFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavourites" ADD CONSTRAINT "_AlbumToFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavourites" ADD CONSTRAINT "_AlbumToFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToTrack" ADD CONSTRAINT "_FavouritesToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritesToTrack" ADD CONSTRAINT "_FavouritesToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
