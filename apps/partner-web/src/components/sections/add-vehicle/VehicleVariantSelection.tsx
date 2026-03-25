import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehicleVariantSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedVariant = useVehicleAddStore((s) => s.data.vehicleVariant);
  const selectedTransmission = useVehicleAddStore((s) => s.data.transmission);
  const selectedFuel = useVehicleAddStore((s) => s.data.fuel);
  const setVariant = useVehicleAddStore((s) => s.setData);

  const trimList = [
    { id: '1', title: 'Base', subtitle: 'Standard trim' },
    { id: '2', title: 'Mid', subtitle: 'Mid-range trim' },
    { id: '3', title: 'High', subtitle: 'Premium trim' },
    { id: '4', title: 'Top of the line', subtitle: 'Flagship trim' },
    { id: '5', title: 'Sport', subtitle: 'Sport edition' },
    { id: '6', title: 'Limited', subtitle: 'Limited edition' },
  ];

  const transmissionList = [
    {
      id: '1',
      title: 'AT',
      subtitle: 'Automatic',
    },
    {
      id: '2',
      title: 'MT',
      subtitle: 'Manual',
    },
    {
      id: '3',
      title: 'CVT',
      subtitle: 'CVT',
    },
    {
      id: '4',
      title: 'DCT',
      subtitle: 'DCT',
    },
  ];

  const fuelList = [
    {
      id: '1',
      title: 'Petrol',
    },
    {
      id: '2',
      title: 'Diesel',
    },
    {
      id: '3',
      title: 'Electric',
    },
    {
      id: '4',
      title: 'Hybrid',
    },
    {
      id: '5',
      title: 'CNG',
    },
  ];

  const handleSelectVariant = (variantId: string) =>
    setVariant({ vehicleVariant: variantId });
  const handleSelectTransmission = (tranmissionId: string) =>
    setVariant({ transmission: tranmissionId });
  const handleSelectFuel = (fuelId: string) => setVariant({ fuel: fuelId });
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedVariant && selectedTransmission && selectedFuel}
      wrapperTitle="Choose the variant"
      wrapperDescription="Specify the trim level, transmission, and fuel type."
    >
      <div>
        <div>
          <label
            className="text-xs font-semibold text-white/40"
            htmlFor="trimLevel"
          >
            TRIM LEVEL
          </label>
          <div className="mt-2 mb-4 transition-all ease-in flex flex-wrap gap-2 group-parent focus-within:border-2 focus-within:border-amber-600">
            {trimList.map((t, i) => (
              <TrimComponent
                key={i + t.title}
                id={t.id}
                title={t.title}
                subtitle={t.subtitle}
                selected={selectedVariant}
                handleSelect={handleSelectVariant}
              />
            ))}
          </div>

          <label
            className="text-xs font-semibold text-white/40"
            htmlFor="transmission"
          >
            TRANSMISSION
          </label>
          <div className="mt-2 mb-4 transition-all ease-in flex flex-wrap gap-2 group-parent focus-within:border-2 focus-within:border-amber-600">
            {transmissionList.map((t, i) => (
              <TransmissionComponent
                key={i + t.title}
                id={t.id}
                title={t.title}
                subtitle={t.subtitle}
                selected={selectedTransmission}
                handleSelect={handleSelectTransmission}
              />
            ))}
          </div>

          <label
            className="text-xs font-semibold text-white/40"
            htmlFor="fuelType"
          >
            FUEL TYPE
          </label>
          <div className="mt-2 mb-4 transition-all ease-in flex flex-wrap gap-2 group-parent focus-within:border-2 focus-within:border-amber-600">
            {fuelList.map((t, i) => (
              <FuelComponent
                key={i + t.title}
                id={t.id}
                title={t.title}
                selected={selectedFuel}
                handleSelect={handleSelectFuel}
              />
            ))}
          </div>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleVariantSelction;

const TrimComponent = ({
  id,
  title,
  subtitle,
  selected,
  handleSelect,
}: {
  id: string;
  title: string;
  subtitle: string;
  selected: string | undefined;
  handleSelect: (value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id)}
      className={`transition-all ease-in w-1/5 border ${selected == id ? 'border-amber-500' : 'border-white/20'} rounded-xl px-3 py-2 ${selected == id ? 'bg-amber-500/5' : 'bg-black/20'} cursor-pointer hover:scale-105`}
    >
      <p className={`text-sm`}>{title}</p>
      <p className="mt-1 text-xs text-white/30">{subtitle}</p>
    </div>
  );
};

const TransmissionComponent = ({
  id,
  title,
  subtitle,
  selected,
  handleSelect,
}: {
  id: string;
  title: string;
  subtitle: string;
  selected: string | undefined;
  handleSelect: (value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id)}
      className={`transition-all ease-in w-1/5 text-center border ${selected == id ? 'border-amber-500' : 'border-white/20'} rounded-xl px-3 py-2 ${selected == id ? 'bg-amber-500/5' : 'bg-black/20'} cursor-pointer hover:scale-105`}
    >
      <p className={`text-xs`}>{title}</p>
      <p className="mt-1 text-xs text-white/30">{subtitle}</p>
    </div>
  );
};

const FuelComponent = ({
  id,
  title,
  selected,
  handleSelect,
}: {
  id: string;
  title: string;
  selected: string | undefined;
  handleSelect: (value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id)}
      className={`transition-all ease-in w-1/8 text-center border ${selected == id ? 'border-amber-500' : 'border-white/20'} rounded-xl px-1 py-2 ${selected == id ? 'bg-amber-500/5' : 'bg-black/20'} cursor-pointer hover:scale-105`}
    >
      <p className={`text-xs`}>{title}</p>
    </div>
  );
};
