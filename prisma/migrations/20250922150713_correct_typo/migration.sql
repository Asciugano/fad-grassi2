/*
  Warnings:

  - You are about to drop the column `passowrd` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Course" DROP COLUMN "passowrd",
ADD COLUMN     "password" TEXT;
