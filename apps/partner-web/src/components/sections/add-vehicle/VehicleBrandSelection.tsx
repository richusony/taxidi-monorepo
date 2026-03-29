import { Search } from 'lucide-react';
import SelectionWrapperUI from './SelectionWrapperUI';
import { useVehicleAddStore } from '@/store/vehicle.store';
import React, { useState } from 'react';

const VehicleBrandSelction = () => {
  const [searchInput, setSearchInput] = useState('');
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedBrand = useVehicleAddStore((s) => s.data.vehicleBrand);
  const setVehicleBrand = useVehicleAddStore((s) => s.setData);

  const vehicleBrands = [
    { id: '1', brand: 'Toyota' },
    { id: '2', brand: 'Honda' },
    { id: '3', brand: 'Nissan' },
    { id: '4', brand: 'Mitsubishi' },
    { id: '5', brand: 'Suzuki' },
    { id: '6', brand: 'Hyundai' },
    { id: '7', brand: 'Kia' },
    { id: '8', brand: 'Ford' },
    { id: '9', brand: 'Chevrolet' },
    { id: '10', brand: 'Isuzu' },
    { id: '11', brand: 'Mazda' },
    { id: '12', brand: 'Subaru' },
    { id: '13', brand: 'BMW' },
    { id: '14', brand: 'Mercedes-Benz' },
    { id: '15', brand: 'Audi' },
    { id: '16', brand: 'Volkswagen' },
    { id: '17', brand: 'Lexus' },
    { id: '18', brand: 'Volvo' },
    { id: '19', brand: 'Land Rover' },
    { id: '20', brand: 'Jeep' },
  ];

  const handleSelectBrand = (brandId: string) =>
    setVehicleBrand({ vehicleBrand: brandId });

  const filteredVehicleBrands =
    searchInput === ''
      ? vehicleBrands
      : vehicleBrands.filter((b) =>
          b.brand.toLowerCase().startsWith(searchInput.toLowerCase()),
        );

  const handleBrandSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedBrand}
      wrapperTitle="Select a brand"
      wrapperDescription="Choose the manufacturer of your vehicle."
    >
      <div>
        <div className="transition-all ease-in border border-white/20 rounded-xl px-2 py-2 flex gap-x-2 group-parent focus-within:border-2 focus-within:border-amber-600">
          <span className="text-xs text-white/50">
            <Search className="w-4" />
          </span>
          <input
            type="text"
            name="searchBrand"
            className="w-full h-full placeholder:text-gray-600 placeholder:text-sm outline-none group-child"
            onChange={handleBrandSearchInput}
            value={searchInput}
            placeholder="Search brand..."
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filteredVehicleBrands.map((man) => (
            <BrandComponent
              key={man.id + man.brand}
              id={man.id}
              name={man.brand}
              selected={selectedBrand}
              onClick={handleSelectBrand}
            />
          ))}
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleBrandSelction;

const BrandComponent = ({
  id,
  name,
  onClick,
  selected,
}: {
  id: string;
  name: string;
  selected: string | undefined;
  onClick: (brandId: string) => void;
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`transition-all ease-in w-32 h-10 border rounded-md p-2 ${selected == id ? 'bg-amber-500/5 border-amber-500/80' : 'bg-black/20 border-white/20'} flex justify-center items-center hover:scale-105 cursor-default`}
    >
      <span className="text-white/70 text-xs">{name}</span>
    </div>
  );
};
