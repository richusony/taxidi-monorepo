import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import { Book, Car, Info } from 'lucide-react';
import { BiRupee } from 'react-icons/bi';
import { FaLocationPin } from 'react-icons/fa6';

const VehicleConfirm = () => {
  const {data} = useVehicleAddStore();
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
        {data.vehicleType && <div className='rounded-xl border border-white/10'>
          <h3 className='border-b border-white/10 flex items-center px-3 py-2 gap-x-2 font-semibold text-sm text-white/80'><Car className='w-5 h-5 text-amber-500'/>VEHICLE</h3>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Type</span> <span className='text-white/80'>{data.vehicleType}</span></p>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Brand</span> <span className='text-white/80'>{data.vehicleBrand}</span></p>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Model</span> <span className='text-white/80'>{data.vehicleModel}</span></p>
          <p className='rounded-b-xl px-4 text-sm bg-black/30 flex justify-between text-white/30 py-2'><span>Variant</span> <span className='text-white/80'>{data.vehicleVariant}</span></p>
        </div>}

        {data.bodyColor && <div className='mt-5 rounded-xl border border-white/10'>
          <h3 className='border-b border-white/10 flex items-center px-3 py-2 gap-x-2 font-semibold text-sm text-white/80'><Book className='w-5 h-5 text-amber-500'/>DETAILS</h3>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Body Color</span> <span className='text-white/80'>{data.bodyColor}</span></p>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Mileage</span> <span className='text-white/80'>{data.mileage} km</span></p>
          <p className='rounded-b-xl px-4 text-sm bg-black/30 flex justify-between text-white/30 py-2'><span>Engine Displacement</span> <span className='text-white/80'>{data.engineDisplacement} cc</span></p>
        </div>}

        {data.pricePerDay && <div className='mt-5 rounded-xl border border-white/10'>
          <h3 className='border-b border-white/10 flex items-center px-3 py-2 gap-x-2 font-semibold text-sm text-white/80'><BiRupee className='w-5 h-5 text-amber-500'/>PRICING</h3>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Price per day</span> <span className='text-white/80'>{data.pricePerDay}</span></p>
          <p className='rounded-b-xl px-4 text-sm bg-black/30 flex justify-between text-white/30 py-2'><span>Price per week</span> <span className='text-white/80'>{data.pricePerWeek}</span></p>
        </div>}

        {data.latitude && <div className='mt-5 rounded-xl border border-white/10'>
          <h3 className='border-b border-white/10 flex items-center px-3 py-2 gap-x-2 font-semibold text-sm text-white/80'><FaLocationPin className='w-5 h-5 text-amber-500'/>LOCATION</h3>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>City</span> <span className='text-white/80'>{data.city}</span></p>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>State</span> <span className='text-white/80'>{data.state}</span></p>
          <p className='px-4 text-sm bg-black/30 flex justify-between text-white/30 border-b border-white/5 py-2'><span>Pincode</span> <span className='text-white/80'>{data.pincode}</span></p>
          <p className='rounded-b-xl px-4 text-sm bg-black/30 flex justify-between text-white/30 py-2'><span>Full Address</span> <span className='text-white/80'>{data.fullAddress}</span></p>
        </div>}

        <div className='mt-5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 flex items-center gap-x-2'>
          <span><Info className='w-4 h-4 text-amber-500'/></span>
          <p className='text-xs text-white/40'>By publishing, you confirm that the information above is accurate and agree to Taxidi's <span className='hover:underline cursor-pointer text-amber-500'>Terms of Service</span> and <span className='hover:underline cursor-pointer text-amber-500'>Listing Guidelines</span>.</p>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleConfirm;
