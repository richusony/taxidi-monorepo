import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressNextButton, ProgressPrevButton } from './ProgressButtons';

const VehicleBrandSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedBrand = useVehicleAddStore((s) => s.data.vehicleBrand);
  return (
    <section>
      <h3>Select Vehicle Brand</h3>
      <form>
        <div className="flex gap-x-3">
          <ProgressPrevButton prevStep={prevStep} />
          <ProgressNextButton selected={selectedBrand} nextStep={nextStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleBrandSelction;
