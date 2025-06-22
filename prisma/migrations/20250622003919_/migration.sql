-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uniqueUsername" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueUsername_key" ON "User"("uniqueUsername");
