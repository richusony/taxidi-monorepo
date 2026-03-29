import type { VehicleTypesType } from '@/pages/add-vehicle/page';
import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

interface TypesProps {
  vehicleTypes: VehicleTypesType[];
}

const VehicleTypeSelection = ({ vehicleTypes }: TypesProps) => {
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const setVehicleData = useVehicleAddStore((s) => s.setData);
  const selectedVehicleTypeId = useVehicleAddStore((s) => s.data.vehicleTypeId);

  const handleSetVehicleData = (id: string, value: string) => {
    setVehicleData({
      vehicleTypeId: id,
      vehicleType: value,
    });
  };
  return (
    <SelectionWrapperUI
      isPrevEnabled={false}
      nextBtn={nextStep}
      selected={selectedVehicleTypeId}
      wrapperTitle="What type of vehicle?"
      wrapperDescription="Select the category that best describes your vehicle."
      prevBtn={() => {}}
    >
      <div className="flex flex-wrap gap-5">
        {vehicleTypes.map((vt, index) => (
          <VehicleTypeComponent
            key={index + 'vt-index'}
            id={vt.id}
            vehicleType={vt}
            handleSelect={handleSetVehicleData}
            seleted={selectedVehicleTypeId}
          />
        ))}
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleTypeSelection;

const VehicleTypeComponent = ({
  id,
  vehicleType,
  handleSelect,
  seleted,
}: {
  id: string;
  vehicleType: VehicleTypesType;
  seleted: string | undefined;
  handleSelect: (id: string, value: string) => void;
}) => {
  const getTypeLowerCase = () => {
    return vehicleType.type.toLowerCase();
  };

  const lowerCasedType = getTypeLowerCase();
  return (
    <div
      id={lowerCasedType}
      onClick={() => handleSelect(vehicleType.id, lowerCasedType)}
      className={`transition-all ease-in w-52 h-28 rounded-xl ${seleted === id ? 'border border-amber-500' : ''} p-5 ${seleted === id ? 'bg-amber-500/5' : 'bg-black/30'} flex flex-col items-center text-white/40 hover:scale-105 cursor-pointer`}
    >
      <p className={`${seleted === id ? 'text-amber-500' : ''}`}>
        {vehicleType.icon}
      </p>
      <p
        className={`mt-1 ${seleted === id ? 'text-amber-500' : 'text-white/80'} text-sm`}
      >
        {vehicleType.title}
      </p>
      <p
        className={`mt-1 text-xs ${seleted === id ? 'text-amber-500' : 'text-white/80'}`}
      >
        {vehicleType.subtitle}
      </p>
    </div>
  );
};
