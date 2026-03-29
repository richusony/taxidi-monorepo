import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useVehicleAddStore } from '@/store/vehicle.store';
import { useRef, useEffect } from 'react';

const MapComponent = ({ onClick }: { onClick: (e: any) => void }) => {
  const mapRef = useRef<any>(null);

  const selectedLatitude = useVehicleAddStore((s) => s.data.latitude);
  const selectedLongitude = useVehicleAddStore((s) => s.data.longitude);

  const latitude = selectedLatitude ?? 11.8745;
  const longitude = selectedLongitude ?? 75.3704;

  useEffect(() => {
    if (mapRef.current && selectedLatitude && selectedLongitude) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        duration: 1000,
      });
    }
  }, [selectedLatitude, selectedLongitude]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude,
        latitude,
        zoom: 13,
      }}
      style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
      mapStyle="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
      onClick={onClick}
    >
      <Marker longitude={longitude} latitude={latitude} />
    </Map>
  );
};

export default MapComponent;
