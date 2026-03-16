import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import argon2 from 'argon2';
import { RoleName } from '../src/generated/prisma/client';

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) throw new Error('NODE_ENV is not set');

const adapter = new PrismaPg({
  connectionString:
    NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.LOCAL_DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction(async (tx) => {
    /* ------------------------------------------------ */
    /* 1️⃣ Seed Roles                                   */
    /* ------------------------------------------------ */

    const customerRole = await tx.role.upsert({
      where: { name: RoleName.CUSTOMER },
      update: {},
      create: { name: RoleName.CUSTOMER },
    });

    const partnerRole = await tx.role.upsert({
      where: { name: RoleName.PARTNER },
      update: {},
      create: { name: RoleName.PARTNER },
    });

    const adminRole = await tx.role.upsert({
      where: { name: RoleName.ADMIN },
      update: {},
      create: { name: RoleName.ADMIN },
    });

    /* ------------------------------------------------ */
    /* 2️⃣ Seed Permissions                             */
    /* ------------------------------------------------ */

    const permissions = [
      'CREATE_BOOKING',
      'CANCEL_BOOKING',
      'ADD_VEHICLE',
      'EDIT_VEHICLE',
      'VIEW_PARTNER_DASHBOARD',
      'VIEW_ADMIN_PANEL',
      'BLOCK_USER',
      'BLOCK_VEHICLE',
    ];

    await tx.permission.createMany({
      data: permissions.map((p) => ({ name: p })),
      skipDuplicates: true,
    });

    const permissionRecords = await tx.permission.findMany();

    const permissionMap = Object.fromEntries(
      permissionRecords.map((p) => [p.name, p.id]),
    );

    /* ------------------------------------------------ */
    /* 3️⃣ Role → Permission Mapping                    */
    /* ------------------------------------------------ */

    const rolePermissions = [
      // CUSTOMER
      {
        roleId: customerRole.id,
        permissionId: permissionMap.CREATE_BOOKING,
      },
      {
        roleId: customerRole.id,
        permissionId: permissionMap.CANCEL_BOOKING,
      },

      // PARTNER
      {
        roleId: partnerRole.id,
        permissionId: permissionMap.ADD_VEHICLE,
      },
      {
        roleId: partnerRole.id,
        permissionId: permissionMap.EDIT_VEHICLE,
      },
      {
        roleId: partnerRole.id,
        permissionId: permissionMap.VIEW_PARTNER_DASHBOARD,
      },

      // ADMIN
      {
        roleId: adminRole.id,
        permissionId: permissionMap.VIEW_ADMIN_PANEL,
      },
      {
        roleId: adminRole.id,
        permissionId: permissionMap.BLOCK_USER,
      },
      {
        roleId: adminRole.id,
        permissionId: permissionMap.BLOCK_VEHICLE,
      },
    ];

    await tx.rolePermission.createMany({
      data: rolePermissions,
      skipDuplicates: true,
    });

    /* ------------------------------------------------ */
    /* 4️⃣ Create Users                                 */
    /* ------------------------------------------------ */

    const adminPassword = await argon2.hash('admin123');
    const testPassword = await argon2.hash('test123');
    const partnerPassword = await argon2.hash('partner123');

    const adminUser = await tx.users.upsert({
      where: { email: 'admin@taxidi.com' },
      update: {},
      create: {
        email: 'admin@taxidi.com',
        password: adminPassword,
        firstname: 'System',
        lastname: 'Admin',
        phone: '+919947619644',
      },
    });

    const devAdmin = await tx.users.upsert({
      where: { email: 'dev.richusony@gmail.com' },
      update: {},
      create: {
        email: 'dev.richusony@gmail.com',
        password: adminPassword,
        firstname: 'Richu',
        lastname: 'Sony',
        phone: '+919947619638',
      },
    });

    const testUser = await tx.users.upsert({
      where: { email: 'test@gmail.com' },
      update: {},
      create: {
        email: 'test@gmail.com',
        firstname: 'Test',
        lastname: 'User',
        password: testPassword,
        phone: '+919947619646',
      },
    });

    const partnerUser = await tx.users.upsert({
      where: { email: 'partner@gmail.com' },
      update: {},
      create: {
        email: 'partner@gmail.com',
        firstname: 'Partner',
        lastname: '',
        password: partnerPassword,
        phone: '+919947619647',
      },
    });

    /* ------------------------------------------------ */
    /* 5️⃣ Assign Roles to Users                        */
    /* ------------------------------------------------ */

    await tx.userRole.createMany({
      data: [
        { userId: adminUser.id, roleId: adminRole.id },
        { userId: devAdmin.id, roleId: adminRole.id },

        { userId: testUser.id, roleId: customerRole.id },

        { userId: partnerUser.id, roleId: partnerRole.id },
        { userId: partnerUser.id, roleId: customerRole.id },
      ],
      skipDuplicates: true,
    });
  });

  console.log('🌱 Database seeded successfully');
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
