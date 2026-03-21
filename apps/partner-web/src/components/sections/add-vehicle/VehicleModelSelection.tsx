import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleModelSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedModel = useVehicleAddStore((s) => s.data.vehicleModel);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedModel}
      wrapperTitle="Select the model & year"
      wrapperDescription="Pick the exact model series and production year."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleModelSelction;
