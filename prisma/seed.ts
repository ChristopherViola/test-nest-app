// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const adminPassword = await bcrypt.hash('password-admin', roundsOfHashing);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@me.org' },
    update: {
      password: adminPassword,
    },
    create: {
      email: 'admin@me.org',
      username: 'super.admin',
      password: adminPassword,
    },
  });
}

// execute the main function
// ...
main();
