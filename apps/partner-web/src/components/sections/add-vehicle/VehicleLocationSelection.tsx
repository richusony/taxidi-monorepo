import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import { LocateIcon } from 'lucide-react';
import MapComponent from '../map/MapComponent';
import { useState } from 'react';
import axios from 'axios';
import { FaLocationPin } from 'react-icons/fa6';

const VehicleLocationSelction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [detectedFullAddress, setDetectedFullAddress] = useState('');
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedLatitude = useVehicleAddStore((s) => s.data.latitude);
  const selectedLongitude = useVehicleAddStore((s) => s.data.longitude);
  const selectedCity = useVehicleAddStore((s) => s.data.city);
  const selectedLandmark = useVehicleAddStore((s) => s.data.landmark);
  const selectedFullAddress = useVehicleAddStore((s) => s.data.fullAddress);
  const setLocation = useVehicleAddStore((s) => s.setData);

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat;

    setLocation({ latitude: lat, longitude: lng });
  };

  const reverseGeoLocation = async (lat: number, lng: number) => {
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );

      setLocation({
        city: data?.address.city ?? data?.address.town,
        state: data?.address?.state,
        pincode: data?.address?.postcode,
        fullAddress: data?.display_name,
      });
      setDetectedFullAddress(data?.display_name);
      return data;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return null;
    }
  };

  const handleGetCurrentCoordinates = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ latitude: lat, longitude: lng });
        reverseGeoLocation(lat, lng);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        alert('Failed to get location');
        setIsLoading(false);
      },
    );
  };

  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={
        selectedLatitude?.toString() &&
        selectedLongitude?.toString() &&
        selectedFullAddress
      }
      wrapperTitle="Pin your location"
      wrapperDescription="Click or tap the map to drop a pin. Drag to adjust. Your exact coordinates are saved privately."
    >
      <div>
        <div>
          <div className="rounded-xl h-96 border border-white/20">
            <MapComponent onClick={(e: any) => handleMapClick(e)} />
          </div>
          <div
            onClick={handleGetCurrentCoordinates}
            className="transition-all rounded-md mt-2 border border-white/20 py-2 bg-black/20 text-sm text-amber-500 flex justify-center gap-x-2 items-center cursor-pointer"
          >
            <LocateIcon className="w-5" />
            <span>
              {isLoading
                ? 'Fetching your coordintates...'
                : 'Use my current location'}
            </span>
          </div>
        </div>

        <div className="mt-2">
          {detectedFullAddress && (
            <div className="rounded-xl border border-white/20 px-4 py-2 bg-black/20 flex gap-x-4 items-center">
              <div>
                <FaLocationPin className="text-amber-500" />
              </div>
              <div>
                <h4 className="text-xs text-white/40 font-semibold">
                  DETECTED ADDRESS
                </h4>
                <p className="mt-1 text-white/80">{detectedFullAddress}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-x-4">
            <div className="w-1/2">
              <label htmlFor="city" className="text-sm text-white/40">
                CITY / MUNICIPALITY
              </label>
              <div className="mt-2 rounded-xl w-full border border-white/20 bg-black/20">
                <input
                  onChange={(e) => setLocation({ city: e.target.value })}
                  className={`outline-none w-full px-4 py-2`}
                  type="text"
                  id="city"
                  name="city"
                  value={selectedCity ?? ''}
                  placeholder="e.g. Thavakara"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="landmark" className="text-sm text-white/40">
                LANDMARK / BARANGAY (OPTIONAL)
              </label>
              <div className="mt-2 rounded-xl w-full border border-white/20 bg-black/20">
                <input
                  onChange={(e) => setLocation({ landmark: e.target.value })}
                  className={`outline-none w-full px-4 py-2`}
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={selectedLandmark ?? ''}
                  placeholder="e.g. Near MG showroom"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="fullAddress" className="text-sm text-white/40">
              FULL ADDRESS (OPTIONAL)
            </label>
            <div className="mt-2 rounded-xl w-full border border-white/20 bg-black/20">
              <textarea
                onChange={(e) => setLocation({ fullAddress: e.target.value })}
                rows={3}
                className={`outline-none w-full px-4 py-2`}
                id="fullAddress"
                name="fullAddress"
                value={selectedFullAddress ?? ''}
                placeholder="Street, Landmark, City, Pincode"
              />
            </div>
          </div>
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleLocationSelction;
