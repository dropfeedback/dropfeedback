/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isTemporary` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserProviderType" AS ENUM ('google', 'internal');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
DROP COLUMN "hash",
DROP COLUMN "isTemporary";

-- CreateTable
CREATE TABLE "user_providers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "type" "UserProviderType" NOT NULL,
    "hash" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_providers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_providers" ADD CONSTRAINT "user_providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
