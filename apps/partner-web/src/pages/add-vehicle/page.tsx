import { type JSX } from 'react';
import { Car, Motorbike, Truck } from 'lucide-react';
import { TbBus, TbCar, TbCarSuv } from 'react-icons/tb';
import { useVehicleAddStore } from '@/store/vehicle.store';
import VehicleConfirm from '@/components/sections/add-vehicle/VehicleConfirm';
import ProgressTracking from '@/components/sections/add-vehicle/ProgressTracking';
import VehicleTypeSelection from '@/components/sections/add-vehicle/VehicleTypeSelection';
import VehicleModelSelction from '@/components/sections/add-vehicle/VehicleModelSelection';
import VehicleBrandSelction from '@/components/sections/add-vehicle/VehicleBrandSelection';
import VehicleDetailsSelction from '@/components/sections/add-vehicle/VehicleDetailsSelection';
import VehiclePricingSelction from '@/components/sections/add-vehicle/VehiclePricingSelection';
import VehicleVariantSelction from '@/components/sections/add-vehicle/VehicleVariantSelection';
import VehicleLocationSelction from '@/components/sections/add-vehicle/VehicleLocationSelection';

export interface VehicleTypesType {
  type: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}
[];

const AddVehiclePage = () => {
  const currentStep = useVehicleAddStore((s) => s.currentStep);

  const vehicleTypes: VehicleTypesType[] = [
    {
      type: 'two-wheels',
      icon: <Motorbike className="w-8 h-8" />,
      title: 'MotorCycle',
      subtitle: '2-wheeled motorized',
    },
    {
      type: 'sedan',
      icon: <TbCar className="w-8 h-8" />,
      title: 'Sedan',
      subtitle: '4-wheeled standard',
    },
    {
      type: 'hatchback',
      icon: <Car className="w-8 h-8" />,
      title: 'Hatchback',
      subtitle: '4-wheeled standard',
    },
    {
      type: 'suv',
      icon: <TbCarSuv className="w-8 h-8" />,
      title: 'SUV / 4X4',
      subtitle: 'Sports utility vehicle',
    },
    {
      type: 'truck',
      icon: <Truck className="w-8 h-8" />,
      title: 'Truck / Van',
      subtitle: 'Commercial vehicles',
    },
    {
      type: 'minivan',
      icon: <TbBus className="w-8 h-8" />,
      title: 'Bus / Minivan',
      subtitle: 'Passenger transport',
    },
  ];

  const addVehicleSteps = [
    'TYPE',
    'BRAND',
    'MODEL',
    'VARIANT',
    'DETAILS',
    'PRICING',
    'LOCATION',
    'CONFIRM',
  ];

  return (
    <section className="bg-black min-h-screen py-5 px-8 text-white">
      <h1 className="mt-1 text-2xl font-semibold">List a New Vehicle</h1>
      <p className="mt-1 text-sm text-white/50">
        Complete the steps below to add your vehicle to the platform.
      </p>

      <ProgressTracking steps={addVehicleSteps} currentStep={currentStep} />
      <div>
        {currentStep === 0 && (
          <VehicleTypeSelection vehicleTypes={vehicleTypes} />
        )}
        {currentStep === 1 && <VehicleBrandSelction />}
        {currentStep === 2 && <VehicleModelSelction />}
        {currentStep === 3 && <VehicleVariantSelction />}
        {currentStep === 4 && <VehicleDetailsSelction />}
        {currentStep === 5 && <VehiclePricingSelction />}
        {currentStep === 6 && <VehicleLocationSelction />}
        {currentStep === 7 && <VehicleConfirm />}
      </div>
    </section>
  );
};

export default AddVehiclePage;
