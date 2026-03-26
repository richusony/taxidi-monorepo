import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleDetailsSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedBodyColor = useVehicleAddStore((s) => s.data.bodyColor);
  const selectedMileage = useVehicleAddStore((s) => s.data.mileage);
  const selectedEngineDisplacement = useVehicleAddStore(
    (s) => s.data.engineDisplacement,
  );
  const selectedNumberPlate = useVehicleAddStore((s) => s.data.numberPlate);
  const selectedDescription = useVehicleAddStore((s) => s.data.description);
  const setValues = useVehicleAddStore((s) => s.setData);

  const bodyColorList = [
    {
      id: '1',
      color: 'bg-blue-500',
      colorText: 'STEALTH BLUE',
    },
    {
      id: '2',
      color: 'bg-green-500',
      colorText: 'SOLID GREEN',
    },
    {
      id: '3',
      color: 'bg-red-500',
      colorText: 'DANGER RED',
    },
    {
      id: '4',
      color: 'bg-yellow-500',
      colorText: 'GLOSSY YELLOW',
    },
    {
      id: '5',
      color: 'bg-black/80',
      colorText: 'MAT BLACK',
    },
  ];

  const handleSelectBodyColor = (color: string) =>
    setValues({ bodyColor: color });
  const handleSelectMileage = (mileage: number) => {
    if (!mileage || mileage <= 0) return setValues({ mileage: undefined });
    setValues({ mileage });
  };
  const handleSelectEngineDisplacement = (cc: number) => {
    if (!cc || cc <= 0) return setValues({ engineDisplacement: undefined });
    setValues({ engineDisplacement: cc });
  };
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={
        selectedBodyColor &&
        selectedMileage?.toString() &&
        selectedEngineDisplacement?.toString()
      }
      wrapperTitle="Vehicle details"
      wrapperDescription="Provide key specs that help buyers understand your vehicle."
    >
      <div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-white/40 ">
            BODY COLOUR
          </h3>
          <div className="flex gap-x-4 overflow-x-scroll hide-scrollbar">
            {bodyColorList.map((c, i) => (
              <ColorListComponent
                key={i + c.colorText}
                id={c.id}
                color={c.color}
                colorText={c.colorText}
                selected={selectedBodyColor}
                handleSelect={handleSelectBodyColor}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-x-6">
          <div className="w-1/2">
            <h3 className="mb-2 text-sm font-semibold text-white/40 ">
              MILEAGE
            </h3>
            <div className="bg-black/20 border border-white/20 rounded-md py-2 px-4 flex items-center">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSelectMileage(parseInt(e.target.value))
                }
                className="w-full outline-none placeholder:text-gray-500"
                type="number"
                value={selectedMileage ?? ''}
                name="mileage"
                id="mileage"
                placeholder="e.g. 25"
              />{' '}
              <span className="text-white/40">km</span>
            </div>
          </div>

          <div className="w-1/2">
            <h3 className="mb-2 text-sm font-semibold text-white/40 ">
              ENGINE DISPLACEMENT
            </h3>
            <div className="bg-black/20 border border-white/20 rounded-md py-2 px-4 flex items-center">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSelectEngineDisplacement(parseInt(e.target.value))
                }
                className="w-full outline-none placeholder:text-gray-500"
                type="number"
                name="engineDisplacement"
                id="engineDisplacement"
                placeholder="e.g. 1200"
                value={selectedEngineDisplacement ?? ''}
              />{' '}
              <span className="text-white/40">cc</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-white/40 ">
            NUMBER PLATE
          </h3>
          <div className="bg-black/20 border border-white/20 rounded-md py-2 px-4 flex items-center">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValues({ numberPlate: e.target.value })
              }
              className="w-full outline-none placeholder:text-gray-500"
              type="text"
              value={selectedNumberPlate ?? ''}
              name="numberPlate"
              id="numberPlate"
              placeholder="e.g. KL01A0000"
            />{' '}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold text-white/40 ">
            DESCRIPTION (optional)
          </h3>
          <div className="bg-black/20 border border-white/20 rounded-md py-2 px-4 flex items-center">
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setValues({ description: e.target.value })
              }
              rows={3}
              className="w-full outline-none placeholder:text-gray-500"
              name="description"
              id="description"
              value={selectedDescription ?? ''}
              placeholder="Describe your vehicle - notable features, service history, upgrades..."
            />{' '}
          </div>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleDetailsSelction;

const ColorListComponent = ({
  id,
  color,
  colorText,
  selected,
  handleSelect,
}: {
  id: string;
  color: string;
  colorText: string;
  selected: string | undefined;
  handleSelect: (value: string) => void;
}) => {
  return (
    <div
      className="transition-all ease-in w-32 hover:scale-105"
      onClick={() => handleSelect(id)}
    >
      <button className={`w-32 h-24 rounded-md ${color}`}></button>
      <p
        className={`mt-1 text-center text-xs font-semibold ${selected == id ? 'text-amber-500' : 'text-white/30'}`}
      >
        {colorText}
      </p>
    </div>
  );
};
