import { useState, type JSX, type SyntheticEvent } from 'react';
import VehicleConfirm from '@/components/sections/add-vehicle/VehicleConfirm';
import VehicleModelSelction from '@/components/sections/add-vehicle/VehicleModelSelection';
import VehicleBrandSelction from '@/components/sections/add-vehicle/VehicleBrandSelection';
import VehicleDetailsSelction from '@/components/sections/add-vehicle/VehicleDetailsSelection';
import VehiclePricingSelction from '@/components/sections/add-vehicle/VehiclePricingSelection';
import VehicleVariantSelction from '@/components/sections/add-vehicle/VehicleVariantSelection';
import VehicleLocationSelction from '@/components/sections/add-vehicle/VehicleLocationSelection';
import ProgressTracking from '@/components/sections/add-vehicle/ProgressTracking';
import VehicleTypeSelection from '@/components/sections/add-vehicle/VehicleTypeSelection';
import { Car, Motorbike, Truck } from 'lucide-react';
import { TbCarSuv } from 'react-icons/tb';

export interface VehicleAddWizardType {
  nextStep: (e: SyntheticEvent) => void;
  prevStep: (e: SyntheticEvent) => void;
}

export interface VehicleTypesType  {
    type: string;
    icon: JSX.Element;
    title: string;
    subtitle: string;
}[]

const AddVehiclePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const moveToNextStep = (e: SyntheticEvent) => {
    e.preventDefault();
    if (currentStep >= addVehicleSteps.length - 1) return;

    setCurrentStep((prev) => prev + 1);
  };

  const moveToPreviousStep = (e: SyntheticEvent) => {
    e.preventDefault();
    if (currentStep <= 0) return;

    setCurrentStep((prev) => prev - 1);
  };

  const vehicleTypes: VehicleTypesType[] = [
    {
      type: 'two-wheels',
      icon: <Motorbike  className='w-8 h-8'/>,
      title: "MotorCycle",
      subtitle: '2-wheeled motorized',
    },
    {
      type: 'four-wheels',
      icon: <Car className='w-8 h-8'/>,
      title: "Car",
      subtitle: '4-wheeled standard',
    },
    {
      type: 'four-wheels',
      icon: <TbCarSuv className='w-8 h-8'/>,
      title: "SUV / 4X4",
      subtitle: 'Sports utility vehicle',
    },
    {
      type: 'four-wheels',
      icon: <Truck className='w-8 h-8'/>,
      title: "Truck / Van",
      subtitle: 'Commercial vehicles',
    },
    {
      type: 'four-wheels',
      icon: <Truck className='w-8 h-8'/>,
      title: "Bus / Minivan",
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
    <main className="bg-black min-h-screen py-5 px-8 text-white">
      <h1 className="mt-1 text-2xl font-semibold">List a New Vehicle</h1>
      <p className="mt-1 text-sm text-white/50">
        Complete the steps below to add your vehicle to the platform.
      </p>

      <ProgressTracking steps={addVehicleSteps} currentStep={currentStep} />
      <section>
        {addVehicleSteps[currentStep] == 'TYPE' && (
          <VehicleTypeSelection vehicleTypes={vehicleTypes}
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'BRAND' && (
          <VehicleBrandSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'MODEL' && (
          <VehicleModelSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VARIANT' && (
          <VehicleVariantSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'DETAILS' && (
          <VehicleDetailsSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'PRICING' && (
          <VehiclePricingSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'LOCATION' && (
          <VehicleLocationSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'CONFIRM' && (
          <VehicleConfirm
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
      </section>
    </main>
  );
};

export default AddVehiclePage;
