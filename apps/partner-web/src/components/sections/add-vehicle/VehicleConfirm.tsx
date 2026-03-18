import type { VehicleAddWizardType } from '@/pages/add-vehicle/page';

const VehicleConfirm = ({ nextStep, prevStep }: VehicleAddWizardType) => {
  return (
    <section>
      <h3>Confirm all selected Details</h3>
      <form>
        <div className="flex gap-x-3">
          <button onClick={prevStep}>Go back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      </form>
    </section>
  );
};

export default VehicleConfirm;
