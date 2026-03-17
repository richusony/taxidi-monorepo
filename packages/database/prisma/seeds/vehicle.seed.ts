import { PrismaPg } from '@prisma/adapter-pg';
import { BodyType, PrismaClient } from '../../src/generated/prisma/client';
import data4w from './data/vehicles/four-wheels.data.json';
import data2w from './data/vehicles/two-wheels.data.json';

const vehicleFiles = [data4w, data2w];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) throw new Error('NODE_ENV is not set');

const adapter = new PrismaPg({
  connectionString:
    NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.LOCAL_DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function seedVehicles() {
  await prisma.$transaction(async (tx) => {
    for (const typeData of vehicleFiles) {
      // ---------- TYPE ----------

      const type = await tx.vehicleType.upsert({
        where: { name: typeData.name },
        update: {},
        create: {
          name: typeData.name,
        },
      });

      console.log('TYPE:', type.name);

      // ---------- BRANDS ----------

      for (const brandData of typeData.brands) {
        const brand = await tx.vehicleBrand.upsert({
          where: {
            name_type_id: {
              name: brandData.name,
              type_id: type.id,
            },
          },
          update: {},
          create: {
            name: brandData.name,
            type_id: type.id,
          },
        });

        console.log('  BRAND:', brand.name);

        // ---------- MODELS ----------

        for (const modelData of brandData.models) {
          const model = await tx.vehicleModel.upsert({
            where: {
              name_brand_id: {
                name: modelData.name,
                brand_id: brand.id,
              },
            },
            update: {},
            create: {
              name: modelData.name,
              brand_id: brand.id,
              type_id: type.id,
              body_type: modelData.bodyType as BodyType,
              seats: modelData.seats,
              fuel_type: modelData.fuelType,
            },
          });

          console.log('    MODEL:', model.name);

          // ---------- VARIANTS ----------

          for (const variantName of modelData.variants) {
            await tx.vehicleVariant.upsert({
              where: {
                name_model_id: {
                  name: variantName,
                  model_id: model.id,
                },
              },
              update: {},
              create: {
                name: variantName,
                model_id: model.id,
                seats: modelData.seats,
                fuel_type: modelData.fuelType,
              },
            });

            console.log('VARIANT:', variantName);
          }
        }
      }
    }
  });

  console.log('✅ Vehicle JSON seed completed');
}
