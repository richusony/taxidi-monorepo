import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import { LocateIcon } from 'lucide-react';
import MapComponent from '../map/MapComponent';
import { nav } from 'framer-motion/client';

const VehicleLocationSelction = () => {
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedLatitude = useVehicleAddStore((s) => s.data.latitude);
  const selectedLongitude = useVehicleAddStore((s) => s.data.longitude);
  const setLocation = useVehicleAddStore((s) => s.setData);

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;

    console.log('Latitude:', lat);
    console.log('Longitude:', lng);

    setLocation({ latitude: lat, longitude: lng });
  };

  const handleGetCurrentCoordinates = () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log(lat, lng);

      setLocation({ latitude: lat, longitude: lng });
    },
    (error) => {
      console.error(error);
      alert('Failed to get location');
    }
  );
};

  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedLatitude?.toString() && selectedLongitude?.toString()}
      wrapperTitle="Pin your location"
      wrapperDescription="Click or tap the map to drop a pin. Drag to adjust. Your exact coordinates are saved privately."
    >
      <div>
        <div>
          <div className="rounded-xl h-72 border border-white/20">
            <MapComponent onClick={(e: any) => handleMapClick(e)} />
          </div>
          <div onClick={handleGetCurrentCoordinates} className="transition-all rounded-md mt-2 border border-white/20 py-2 bg-black/20 text-sm text-amber-500 flex justify-center gap-x-2 items-center cursor-pointer">
            <LocateIcon className="w-5" />
            <span>
              Use my current location
            </span>
          </div>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleLocationSelction;
