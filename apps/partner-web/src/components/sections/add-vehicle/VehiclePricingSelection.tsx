import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';

const VehiclePricingSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedPricePerDay = useVehicleAddStore((s) => s.data.pricePerDay);
  const selectedPricePerWeek = useVehicleAddStore((s) => s.data.pricePerWeek);
  const setValues = useVehicleAddStore((s) => s.setData);

  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={
        selectedPricePerDay?.toString() && selectedPricePerWeek?.toString()
      }
      wrapperTitle="Pricing"
      wrapperDescription="Set a fair price to attract serious buyers."
    >
      <div>
        <div className="flex justify-between gap-x-4">
          <div className="w-1/2">
            <label htmlFor="pricePerDay" className="text-sm text-white/80">
              PRICE PER DAY
            </label>
            <div className="mt-2 rounded-md border border-white/40 px-4 py-2 bg-black/20 flex items-center">
              <input
                onChange={(e) =>
                  setValues({ pricePerDay: parseInt(e.target.value) })
                }
                className="w-full outline-none"
                type="number"
                value={selectedPricePerDay}
                name="pricePerDay"
                id="pricePerDay"
              />
              <span className="text-sm text-white/40">INR</span>
            </div>
          </div>
          <div className="w-1/2">
            <label htmlFor="pricePerWeek" className="text-sm text-white/80">
              PRICE PER WEEK
            </label>
            <div className="mt-2 rounded-md border border-white/40 px-4 py-2 bg-black/20 flex items-center">
              <input
                onChange={(e) =>
                  setValues({ pricePerWeek: parseInt(e.target.value) })
                }
                className="w-full outline-none"
                type="number"
                value={selectedPricePerWeek}
                name="pricePerWeek"
                id="pricePerWeek"
              />
              <span className="text-sm text-white/40">INR</span>
            </div>
          </div>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehiclePricingSelction;
