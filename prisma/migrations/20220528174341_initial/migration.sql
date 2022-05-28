-- CreateTable
CREATE TABLE "Mode_of_payment" (
    "id" SERIAL NOT NULL,
    "mode" TEXT,
    "name" TEXT,
    "associated_partner" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "transactionId" INTEGER,

    CONSTRAINT "Mode_of_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mode_of_payment_mode_key" ON "Mode_of_payment"("mode");

-- AddForeignKey
ALTER TABLE "Mode_of_payment" ADD CONSTRAINT "Mode_of_payment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
