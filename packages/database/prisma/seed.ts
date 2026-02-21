import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import argon2 from 'argon2';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminHashedPassword = await argon2.hash('admin123');
  await prisma.users.upsert({
    where: { email: 'admin@taxidi.com' },
    update: {},
    create: {
      email: 'admin@taxidi.com',
      password: adminHashedPassword,
      role: ['ADMIN'], 
      firstname: 'System',
      lastname: 'Admin',
      phone: '+919947619644',
    },
  });

  const testHashedPassword = await argon2.hash('test123');
  await prisma.users.upsert({
    where: { email: 'test@gmail.com'},
    update: {},
    create: {
      email: 'test@gmail.com',
      firstname: 'Test',
      lastname: 'User',
      role: ['CUSTOMER'],
      password: testHashedPassword,
      phone: '+919947619646',
    }
  });

  const partnerHashedPassword = await argon2.hash('partner123');
  await prisma.users.upsert({
    where: { email: 'partner@gmail.com'},
    update: {},
    create: {
      email: 'partner@gmail.com',
      firstname: 'Partner',
      lastname: '',
      role: ['PARTNER'],
      password: partnerHashedPassword,
      phone: '+919947619647',
    }
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
