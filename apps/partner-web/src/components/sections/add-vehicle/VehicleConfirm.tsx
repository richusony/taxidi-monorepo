import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleConfirm = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  return (
    <SelectionWrapperUI
      isNextEnabled={false}
      nextBtn={() => {}}
      prevBtn={prevStep}
      selected={''}
      wrapperTitle="Review & Publish"
      wrapperDescription="Double-check everything before your listing goes live."
    >
      <div></div>
    </SelectionWrapperUI>
  );
};

export default VehicleConfirm;
