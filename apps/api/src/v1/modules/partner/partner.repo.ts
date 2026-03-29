import { prisma } from '@/lib/prisma';
import { Prisma } from '@taxidi/database';

export class PartnerRepository {
  addPartnerVehicle(data: Prisma.VehiclesCreateInput) {
    return prisma.vehicles.create({ data });
  }

  updatePartnerVehilce(vehicleId: string, data: Prisma.VehiclesUpdateInput) {
    return prisma.vehicles.update({ where: { id: vehicleId }, data });
  }

  fetchPartnerVehicles(partnerId: string) {
    return prisma.vehicles.findMany({ where: { owner_id: partnerId } });
  }

  deletePartnerVehicle(vehicleId: string) {
    return prisma.vehicles.delete({ where: { id: vehicleId } });
  }
}
