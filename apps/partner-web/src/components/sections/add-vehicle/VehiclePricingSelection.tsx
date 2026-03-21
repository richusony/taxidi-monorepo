import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';

const VehiclePricingSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedPricing = useVehicleAddStore((s) => s.data.pricing);
  return (
    <section>
      <h3>Select Vehicle Pricing</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedPricing} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehiclePricingSelction;
