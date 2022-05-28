-- AlterTable
ALTER TABLE "Mode_of_payment" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "username" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mode_of_payment" ADD CONSTRAINT "Mode_of_payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
