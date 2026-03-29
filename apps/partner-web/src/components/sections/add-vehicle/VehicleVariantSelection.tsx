import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import type {
  VehicleVariantFuelType,
  VehicleVariantTransmissionType,
  VehicleVariantTrimType,
} from '@/types';

const VehicleVariantSelction = ({
  trimList,
  transmissionList,
  fuelList,
}: {
  trimList: VehicleVariantTrimType[];
  transmissionList: VehicleVariantTransmissionType[];
  fuelList: VehicleVariantFuelType[];
}) => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedVariantId = useVehicleAddStore((s) => s.data.vehicleVariantId);
  const selectedTransmissionId = useVehicleAddStore((s) => s.data.transmissionId);
  const selectedFuelId = useVehicleAddStore((s) => s.data.fuelId);
  const storeValues = useVehicleAddStore((s) => s.setData);

  const handleSelectVariant = (variantId: string, variant: string) =>
    storeValues({ vehicleVariantId: variantId, vehicleVariant: variant });

  const handleSelectTransmission = (tranmissionId: string, value: string) =>
    storeValues({ transmissionId: tranmissionId, transmission: value });

  const handleSelectFuel = (fuelId: string, value: string) => storeValues({ fuelId: fuelId, fuel: value });

  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedVariantId && selectedTransmissionId && selectedFuelId}
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
                selected={selectedVariantId}
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
                selected={selectedTransmissionId}
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
                selected={selectedFuelId}
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
  handleSelect: (id:string, value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id, title)}
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
  handleSelect: (id: string, value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id, title)}
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
  handleSelect: (id: string, value: string) => void;
}) => {
  return (
    <div
      onClick={() => handleSelect(id, title)}
      className={`transition-all ease-in w-1/8 text-center border ${selected == id ? 'border-amber-500' : 'border-white/20'} rounded-xl px-1 py-2 ${selected == id ? 'bg-amber-500/5' : 'bg-black/20'} cursor-pointer hover:scale-105`}
    >
      <p className={`text-xs`}>{title}</p>
    </div>
  );
};
