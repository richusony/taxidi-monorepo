import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';

const VehicleLocationSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedLocation = useVehicleAddStore((s) => s.data.location);
  return (
    <section>
      <h3>Select Vehicle Location</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedLocation} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleLocationSelction;
