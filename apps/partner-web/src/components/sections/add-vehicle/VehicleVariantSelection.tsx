import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleVariantSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedVariant = useVehicleAddStore((s) => s.data.vehicleVariant);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedVariant}
      wrapperTitle="Choose the variant"
      wrapperDescription="Specify the trim level, transmission, and fuel type."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleVariantSelction;
