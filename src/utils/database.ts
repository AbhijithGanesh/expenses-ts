import { PrismaClient } from "@prisma/client";

let client = new PrismaClient();

let database_connect = async (): Promise<void> => {
  console.warn("Database is getting connected, data incoming will be stored!");
  await client.$connect();
};

let database_disconnect = async (): Promise<void> => {
  console.warn(
    "Database is getting disconnected, data incoming may not be stored!"
  );
  await client.$disconnect();
};

export { database_connect, database_disconnect };
