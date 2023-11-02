/*
  Warnings:

  - Added the required column `authProvider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('local', 'github');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authProvider" "AuthProvider" NOT NULL,
ALTER COLUMN "hash" DROP NOT NULL;
