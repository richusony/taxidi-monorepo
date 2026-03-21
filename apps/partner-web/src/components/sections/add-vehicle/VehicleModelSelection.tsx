import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';

const VehicleModelSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedModel = useVehicleAddStore((s) => s.data.vehicleModel);
  return (
    <section>
      <h3>Select Vehicle Model</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedModel} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleModelSelction;
