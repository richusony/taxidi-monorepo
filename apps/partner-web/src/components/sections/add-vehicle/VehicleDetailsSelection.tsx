import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';

const VehicleDetailsSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedDetails = useVehicleAddStore((s) => s.data.details);
  return (
    <section>
      <h3>Select Vehicle Details</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedDetails} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleDetailsSelction;
