/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Mode_of_payment` table. All the data in the column will be lost.
  - Added the required column `transaction_date` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mode_of_payment" DROP CONSTRAINT "Mode_of_payment_transactionId_fkey";

-- AlterTable
ALTER TABLE "Mode_of_payment" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "mode_of_paymentId" INTEGER,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "transaction_name" TEXT;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_mode_of_paymentId_fkey" FOREIGN KEY ("mode_of_paymentId") REFERENCES "Mode_of_payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
