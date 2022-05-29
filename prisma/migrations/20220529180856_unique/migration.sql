/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_transaction_id_key" ON "transaction"("transaction_id");
