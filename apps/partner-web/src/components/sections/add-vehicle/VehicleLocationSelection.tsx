import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleLocationSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedLocation = useVehicleAddStore((s) => s.data.location);
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedLocation}
      wrapperTitle="Pin your location"
      wrapperDescription="Click or tap the map to drop a pin. Drag to adjust. Your exact coordinates are saved privately."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleLocationSelction;
