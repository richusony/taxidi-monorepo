import type {
  VehicleAddWizardType,
  VehicleTypesType,
} from '@/pages/add-vehicle/page';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface TypesProps extends VehicleAddWizardType {
  vehicleTypes: VehicleTypesType[];
}

const VehicleTypeSelection = ({
  nextStep,
  prevStep,
  vehicleTypes,
}: TypesProps) => {
  return (
    <section className="rounded-2xl border border-white/10 p-8 bg-white/10 ">
      <h3 className="font-semibold">What type of vehicle?</h3>
      <p className="mt-1 text-sm text-white/40">
        Select the category that best describes your vehicle.
      </p>
      <hr className="my-5 text-white/10" />

      <div className='flex flex-wrap gap-5'>
        {vehicleTypes.map((vt, index) => (
          <VehicleTypeComponent key={index + 'vt-index'} vehicleType={vt} />
        ))}
      </div>

      <hr className="my-5 text-white/10" />
      <div className="flex justify-between">
        <button onClick={prevStep} className={`flex items-center gap-x-1`}>
          <BiLeftArrowAlt />
          <span>Back</span>
        </button>
        <button onClick={nextStep} className={`flex items-center gap-x-1`}>
          <span>Continue</span>
          <BiRightArrowAlt />
        </button>
      </div>
    </section>
  );
};

export default VehicleTypeSelection;

const VehicleTypeComponent = ({
  vehicleType,
}: {
  vehicleType: VehicleTypesType;
}) => {
  return (
    <div
      className={`transition-all ease-in w-52 h-28 rounded-xl p-5 bg-black/30 flex flex-col items-center text-white/40 hover:scale-105`}
    >
      <p>{vehicleType.icon}</p>
      <p className={`mt-1 text-white/80 text-sm`}>{vehicleType.title}</p>
      <p className="mt-1 text-xs">{vehicleType.subtitle}</p>
    </div>
  );
};
