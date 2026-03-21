import SelectionWrapperUI from './SelectionWrapperUI';
import { useVehicleAddStore } from '@/store/vehicle.store';

const VehicleBrandSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedBrand = useVehicleAddStore((s) => s.data.vehicleBrand);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedBrand}
      wrapperTitle="Select a brand"
      wrapperDescription="Choose the manufacturer of your vehicle."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleBrandSelction;
