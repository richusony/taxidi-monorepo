import { useVehicleAddStore } from '@/store/vehicle.store';
import { ProgressPrevButton } from './ProgressButtons';

const VehicleConfirm = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  return (
    <section>
      <h3>Confirm all selected Details</h3>
      <form>
        <div className="flex flex-end">
          <ProgressPrevButton prevStep={prevStep} />
        </div>
      </form>
    </section>
  );
};

export default VehicleConfirm;
