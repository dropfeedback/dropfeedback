/*
  Warnings:

  - You are about to drop the column `userId` on the `member_invites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "member_invites" DROP CONSTRAINT "member_invites_userId_fkey";

-- AlterTable
ALTER TABLE "member_invites" DROP COLUMN "userId";
