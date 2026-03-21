import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleDetailsSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedDetails = useVehicleAddStore((s) => s.data.details);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedDetails}
      wrapperTitle="Vehicle details"
      wrapperDescription="Provide key specs that help buyers understand your vehicle."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleDetailsSelction;
