import type { VehicleTypesType } from '@/pages/add-vehicle/page';
import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

interface TypesProps {
  vehicleTypes: VehicleTypesType[];
}

const VehicleTypeSelection = ({ vehicleTypes }: TypesProps) => {
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const setVehicleData = useVehicleAddStore((s) => s.setData);
  const selectedVehicleType = useVehicleAddStore((s) => s.data.vehicleType);

  const handleSetVehicleData = (value: string) => {
    setVehicleData({
      vehicleType: value,
    });
  };
  return (
    <SelectionWrapperUI
      isPrevEnabled={false}
      nextBtn={nextStep}
      selected={selectedVehicleType}
      wrapperTitle="What type of vehicle?"
      wrapperDescription="Select the category that best describes your vehicle."
      prevBtn={() => {}}
    >
      <div className="flex flex-wrap gap-5">
        {vehicleTypes.map((vt, index) => (
          <VehicleTypeComponent
            key={index + 'vt-index'}
            vehicleType={vt}
            handleSelect={handleSetVehicleData}
            seleted={selectedVehicleType}
          />
        ))}
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleTypeSelection;

const VehicleTypeComponent = ({
  vehicleType,
  handleSelect,
  seleted,
}: {
  vehicleType: VehicleTypesType;
  seleted: string | undefined;
  handleSelect: (value: string) => void;
}) => {
  const getTypeLowerCase = () => {
    return vehicleType.type.toLowerCase();
  };
  return (
    <div
      id={getTypeLowerCase()}
      onClick={() => handleSelect(getTypeLowerCase())}
      className={`transition-all ease-in w-52 h-28 rounded-xl ${seleted === getTypeLowerCase() ? 'border border-amber-500' : ''} p-5 ${seleted === getTypeLowerCase() ? 'bg-amber-500/5' : 'bg-black/30'} flex flex-col items-center text-white/40 hover:scale-105 cursor-pointer`}
    >
      <p
        className={`${seleted === getTypeLowerCase() ? 'text-amber-500' : ''}`}
      >
        {vehicleType.icon}
      </p>
      <p
        className={`mt-1 ${seleted === getTypeLowerCase() ? 'text-amber-500' : 'text-white/80'} text-sm`}
      >
        {vehicleType.title}
      </p>
      <p
        className={`mt-1 text-xs ${seleted === getTypeLowerCase() ? 'text-amber-500' : 'text-white/80'}`}
      >
        {vehicleType.subtitle}
      </p>
    </div>
  );
};
