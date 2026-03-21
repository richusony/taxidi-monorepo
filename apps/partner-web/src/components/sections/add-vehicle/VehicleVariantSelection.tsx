import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';
import { useVehicleAddStore } from '@/store/vehicle.store';

const VehicleVariantSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedVariant = useVehicleAddStore((s) => s.data.vehicleVariant);
  return (
    <section>
      <h3>Select Vehicle Variant</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedVariant} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleVariantSelction;
