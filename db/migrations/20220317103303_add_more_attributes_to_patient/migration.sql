/*
  Warnings:

  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "severity_score" INTEGER NOT NULL,
    "mobile" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Patient" ("createdAt", "id", "name", "severity_score", "status", "updatedAt") SELECT "createdAt", "id", "name", "severity_score", "status", "updatedAt" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
