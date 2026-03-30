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
import type {
  VehicleBodyColorType,
  VehicleBrandType,
  VehicleModelType,
  VehicleTypesType,
  VehicleVariantFuelType,
  VehicleVariantTransmissionType,
  VehicleVariantTrimType,
} from '@/types';

const AddVehiclePage = () => {
  const currentStep = useVehicleAddStore((s) => s.currentStep);

  const vehicleTypes: VehicleTypesType[] = [
    {
      id: '1',
      type: 'two-wheels',
      icon: <Motorbike className="w-8 h-8" />,
      title: 'MotorCycle',
      subtitle: '2-wheeled motorized',
    },
    {
      id: '2',
      type: 'sedan',
      icon: <TbCar className="w-8 h-8" />,
      title: 'Sedan',
      subtitle: '4-wheeled standard',
    },
    {
      id: '3',
      type: 'hatchback',
      icon: <Car className="w-8 h-8" />,
      title: 'Hatchback',
      subtitle: '4-wheeled standard',
    },
    {
      id: '4',
      type: 'suv',
      icon: <TbCarSuv className="w-8 h-8" />,
      title: 'SUV / 4X4',
      subtitle: 'Sports utility vehicle',
    },
    {
      id: '5',
      type: 'truck',
      icon: <Truck className="w-8 h-8" />,
      title: 'Truck / Van',
      subtitle: 'Commercial vehicles',
    },
    {
      id: '6',
      type: 'minivan',
      icon: <TbBus className="w-8 h-8" />,
      title: 'Bus / Minivan',
      subtitle: 'Passenger transport',
    },
  ];

  const vehicleBrands: VehicleBrandType[] = [
    { id: '1', brand: 'Toyota' },
    { id: '2', brand: 'Honda' },
    { id: '3', brand: 'Nissan' },
    { id: '4', brand: 'Mitsubishi' },
    { id: '5', brand: 'Suzuki' },
    { id: '6', brand: 'Hyundai' },
    { id: '7', brand: 'Kia' },
    { id: '8', brand: 'Ford' },
    { id: '9', brand: 'Chevrolet' },
    { id: '10', brand: 'Isuzu' },
    { id: '11', brand: 'Mazda' },
    { id: '12', brand: 'Subaru' },
    { id: '13', brand: 'BMW' },
    { id: '14', brand: 'Mercedes-Benz' },
    { id: '15', brand: 'Audi' },
    { id: '16', brand: 'Volkswagen' },
    { id: '17', brand: 'Lexus' },
    { id: '18', brand: 'Volvo' },
    { id: '19', brand: 'Land Rover' },
    { id: '20', brand: 'Jeep' },
  ];

  const models: VehicleModelType[] = [
    { id: '1', model: 'Corolla' },
    { id: '2', model: 'Camry' },
    { id: '3', model: 'Vios' },
    { id: '4', model: 'Yaris' },
    { id: '5', model: 'Fortuner' },
    { id: '6', model: 'Land Cruiser' },
    { id: '7', model: 'HiAce' },
    { id: '8', model: 'Hilux' },
    { id: '9', model: 'Prius' },
    { id: '10', model: 'Innova' },
  ];

  const trimList: VehicleVariantTrimType[] = [
    { id: '1', title: 'Base', subtitle: 'Standard trim' },
    { id: '2', title: 'Mid', subtitle: 'Mid-range trim' },
    { id: '3', title: 'High', subtitle: 'Premium trim' },
    { id: '4', title: 'Top of the line', subtitle: 'Flagship trim' },
    { id: '5', title: 'Sport', subtitle: 'Sport edition' },
    { id: '6', title: 'Limited', subtitle: 'Limited edition' },
  ];

  const transmissionList: VehicleVariantTransmissionType[] = [
    {
      id: '1',
      title: 'AT',
      subtitle: 'Automatic',
    },
    {
      id: '2',
      title: 'MT',
      subtitle: 'Manual',
    },
    {
      id: '3',
      title: 'CVT',
      subtitle: 'CVT',
    },
    {
      id: '4',
      title: 'DCT',
      subtitle: 'DCT',
    },
  ];

  const fuelList: VehicleVariantFuelType[] = [
    {
      id: '1',
      title: 'Petrol',
    },
    {
      id: '2',
      title: 'Diesel',
    },
    {
      id: '3',
      title: 'Electric',
    },
    {
      id: '4',
      title: 'Hybrid',
    },
    {
      id: '5',
      title: 'CNG',
    },
  ];

  const bodyColorList: VehicleBodyColorType[] = [
    {
      id: '1',
      color: 'bg-blue-500',
      colorText: 'STEALTH BLUE',
    },
    {
      id: '2',
      color: 'bg-green-500',
      colorText: 'SOLID GREEN',
    },
    {
      id: '3',
      color: 'bg-red-500',
      colorText: 'DANGER RED',
    },
    {
      id: '4',
      color: 'bg-yellow-500',
      colorText: 'GLOSSY YELLOW',
    },
    {
      id: '5',
      color: 'bg-black/80',
      colorText: 'MAT BLACK',
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
    <section className="py-5 px-8 text-white">
      <h1 className="mt-1 text-2xl font-semibold">List a New Vehicle</h1>
      <p className="mt-1 text-sm text-white/50">
        Complete the steps below to add your vehicle to the platform.
      </p>

      <ProgressTracking steps={addVehicleSteps} currentStep={currentStep} />
      <div>
        {currentStep === 0 && (
          <VehicleTypeSelection vehicleTypes={vehicleTypes} />
        )}
        {currentStep === 1 && (
          <VehicleBrandSelction vehicleBrands={vehicleBrands} />
        )}
        {currentStep === 2 && <VehicleModelSelction models={models} />}
        {currentStep === 3 && (
          <VehicleVariantSelction
            trimList={trimList}
            transmissionList={transmissionList}
            fuelList={fuelList}
          />
        )}
        {currentStep === 4 && (
          <VehicleDetailsSelction bodyColorList={bodyColorList} />
        )}
        {currentStep === 5 && <VehiclePricingSelction />}
        {currentStep === 6 && <VehicleLocationSelction />}
        {currentStep === 7 && <VehicleConfirm />}
      </div>
    </section>
  );
};

export default AddVehiclePage;
