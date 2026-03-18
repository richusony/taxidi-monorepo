import { useState, type SyntheticEvent } from 'react';
import VehicleConfirm from '@/components/sections/add-vehicle/VehicleConfirm';
import VehicleTypeSelction from '@/components/sections/add-vehicle/VehicleTypeSelection';
import VehicleModelSelction from '@/components/sections/add-vehicle/VehicleModelSelection';
import VehicleBrandSelction from '@/components/sections/add-vehicle/VehicleBrandSelection';
import VehicleDetailsSelction from '@/components/sections/add-vehicle/VehicleDetailsSelection';
import VehiclePricingSelction from '@/components/sections/add-vehicle/VehiclePricingSelection';
import VehicleVariantSelction from '@/components/sections/add-vehicle/VehicleVariantSelection';
import VehicleLocationSelction from '@/components/sections/add-vehicle/VehicleLocationSelection';

export interface VehicleAddWizardType {
  nextStep: (e: SyntheticEvent) => void;
  prevStep: (e: SyntheticEvent) => void;
}

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

  const addVehicleSteps = [
    'VEHICLE_TYPE',
    'VEHICLE_BRAND',
    'VEHICLE_MODEL',
    'VEHICLE_VARIANT',
    'VEHICLE_DETAILS',
    'VEHICLE_PRICING',
    'VEHICLE_LOCATION',
    'VEHICLE_CONFIRM',
  ];
  return (
    <main className="text-white">
      <h1>Add Vehicle</h1>
      <p>some text here if necessary for UI {currentStep}</p>

      <section>
        {addVehicleSteps[currentStep] == 'VEHICLE_TYPE' && (
          <VehicleTypeSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_BRAND' && (
          <VehicleBrandSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_MODEL' && (
          <VehicleModelSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_VARIANT' && (
          <VehicleVariantSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_DETAILS' && (
          <VehicleDetailsSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_PRICING' && (
          <VehiclePricingSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_LOCATION' && (
          <VehicleLocationSelction
            nextStep={moveToNextStep}
            prevStep={moveToPreviousStep}
          />
        )}
        {addVehicleSteps[currentStep] == 'VEHICLE_CONFIRM' && (
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
