import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import { Book, Car, Info } from 'lucide-react';
import { BiRupee } from 'react-icons/bi';
import { FaLocationPin } from 'react-icons/fa6';
import type { JSX } from 'react';

const VehicleConfirm = () => {
  const { data } = useVehicleAddStore();
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  return (
    <SelectionWrapperUI
      isNextEnabled={false}
      nextBtn={() => {}}
      prevBtn={prevStep}
      selected={''}
      wrapperTitle="Review & Publish"
      wrapperDescription="Double-check everything before your listing goes live."
    >
      <div>
        {data.vehicleType && (
          <div className="rounded-xl border border-white/10">
            <TableHeader
              headerText="VEHICLE"
              headerIcon={<Car className="w-5 h-5 text-amber-500" />}
            />
            <NormalRow keyName="Type" value={data.vehicleType} />
            <NormalRow keyName="Brand" value={data.vehicleBrand} />
            <NormalRow keyName="Model" value={data.vehicleModel} />
            <NormalRow keyName="Variant" value={data.vehicleVariant} />
            <NormalRow keyName="Fuel" value={data.fuel} />
            <LastRow keyName="Transmission" value={data.transmission} />
          </div>
        )}

        {data.bodyColor && (
          <div className="mt-5 rounded-xl border border-white/10">
            <TableHeader
              headerText="DETAILS"
              headerIcon={<Book className="w-5 h-5 text-amber-500" />}
            />
            <NormalRow keyName="Body Color" value={data.bodyColor} />
            <NormalRow
              keyName="Mileage"
              value={data.mileage?.toString() + ' km'}
            />
            <LastRow
              keyName="Engine Displacement"
              value={data.engineDisplacement?.toString() + ' cc'}
            />
          </div>
        )}

        {data.pricePerDay && (
          <div className="mt-5 rounded-xl border border-white/10">
            <TableHeader
              headerText="PRICING"
              headerIcon={<BiRupee className="w-5 h-5 text-amber-500" />}
            />
            <NormalRow
              keyName="Price per day"
              value={data.pricePerDay?.toString() + ' Rs'}
            />
            <LastRow
              keyName="Price per week"
              value={data.pricePerWeek?.toString() + ' Rs'}
            />
          </div>
        )}

        {data.latitude && (
          <div className="mt-5 rounded-xl border border-white/10">
            <TableHeader
              headerText="LOCATION"
              headerIcon={<FaLocationPin className="w-5 h-5 text-amber-500" />}
            />
            <NormalRow keyName="City" value={data.city} />
            <NormalRow keyName="State" value={data.state} />
            <NormalRow keyName="Pincode" value={data.pincode} />
            <LastRow keyName="Full Address" value={data.fullAddress} />
          </div>
        )}

        <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 flex items-center gap-x-2">
          <span>
            <Info className="w-4 h-4 text-amber-500" />
          </span>
          <p className="text-xs text-white/40">
            By publishing, you confirm that the information above is accurate
            and agree to Taxidi's{' '}
            <span className="hover:underline cursor-pointer text-amber-500">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="hover:underline cursor-pointer text-amber-500">
              Listing Guidelines
            </span>
            .
          </p>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleConfirm;

const TableHeader = ({
  headerText,
  headerIcon,
}: {
  headerText: string;
  headerIcon: JSX.Element;
}) => {
  return (
    <h3 className="border-b border-white/10 flex items-center px-3 py-2 gap-x-2 font-semibold text-sm text-white/80">
      {headerIcon}
      {headerText}
    </h3>
  );
};

const NormalRow = ({
  keyName,
  value,
}: {
  keyName: string;
  value: string | undefined;
}) => {
  return (
    <p className="px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2">
      <span>{keyName}</span>{' '}
      <span className="text-white/80">{value ?? ''}</span>
    </p>
  );
};

const LastRow = ({
  keyName,
  value,
}: {
  keyName: string;
  value: string | undefined;
}) => {
  return (
    <p className="rounded-b-xl px-4 text-sm bg-black/30 flex justify-between text-white/30 py-2">
      <span>{keyName}</span>{' '}
      <span className="text-white/80">{value ?? ''}</span>
    </p>
  );
};
