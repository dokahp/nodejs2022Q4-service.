/*
  Warnings:

  - You are about to drop the column `userId` on the `Favourites` table. All the data in the column will be lost.
  - You are about to drop the `_AlbumToFavourites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToFavourites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavouritesToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favourites" DROP CONSTRAINT "Favourites_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavourites" DROP CONSTRAINT "_AlbumToFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavourites" DROP CONSTRAINT "_AlbumToFavourites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavourites" DROP CONSTRAINT "_ArtistToFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavourites" DROP CONSTRAINT "_ArtistToFavourites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavouritesToTrack" DROP CONSTRAINT "_FavouritesToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavouritesToTrack" DROP CONSTRAINT "_FavouritesToTrack_B_fkey";

-- DropIndex
DROP INDEX "Favourites_userId_key";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favouritesId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favouritesId" TEXT;

-- AlterTable
ALTER TABLE "Favourites" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favouritesId" TEXT;

-- DropTable
DROP TABLE "_AlbumToFavourites";

-- DropTable
DROP TABLE "_ArtistToFavourites";

-- DropTable
DROP TABLE "_FavouritesToTrack";

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favouritesId_fkey" FOREIGN KEY ("favouritesId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favouritesId_fkey" FOREIGN KEY ("favouritesId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favouritesId_fkey" FOREIGN KEY ("favouritesId") REFERENCES "Favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
