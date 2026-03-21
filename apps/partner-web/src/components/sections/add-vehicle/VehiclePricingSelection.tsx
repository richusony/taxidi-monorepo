import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehiclePricingSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedPricing = useVehicleAddStore((s) => s.data.pricing);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedPricing}
      wrapperTitle="Pricing"
      wrapperDescription="Set a fair price to attract serious buyers."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehiclePricingSelction;
