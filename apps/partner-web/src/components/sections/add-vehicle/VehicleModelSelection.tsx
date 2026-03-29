import { useVehicleAddStore } from '@/store/vehicle.store';
import SelectionWrapperUI from './SelectionWrapperUI';
import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { VehicleModelType } from '@/types';

const VehicleModelSelction = ({models}: {models: VehicleModelType[]}) => {
  const [searchInput, setSearchInput] = useState('');
  const prevStep = useVehicleAddStore((s) => s.moveToPrevStep);
  const nextStep = useVehicleAddStore((s) => s.moveToNextStep);
  const selectedModelId = useVehicleAddStore((s) => s.data.vehicleModelId);
  const selectedModelYear = useVehicleAddStore((s) => s.data.vehicleModelYear);
  const setModel = useVehicleAddStore((s) => s.setData);

  const modelYears = useMemo(() => {
    const years: number[] = [];

    const start = 1999;
    const end = new Date().getFullYear();

    for (let y = end; y >= start; y--) {
      years.push(y);
    }
    return years;
  }, []);

  const handleModelSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSelectModel = (modelId: string, model: string) =>
    setModel({ vehicleModelId: modelId, vehicleModel: model });

  const filteredVehicleModels =
    searchInput == ''
      ? models
      : models.filter((mod) =>
          mod.model.toLowerCase().startsWith(searchInput.toLowerCase()),
        );

  const handleSelectedYear = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setModel({vehicleModelYear: parseInt(e.target.value)});

  return (
    <SelectionWrapperUI
      nextBtn={nextStep}
      prevBtn={prevStep}
      selected={selectedModelId && selectedModelYear?.toString()}
      wrapperTitle="Select the model & year"
      wrapperDescription="Pick the exact model series and production year."
    >
      <div>
        <div>
          <label
            className="text-xs font-semibold text-white/40"
            htmlFor="selectModelYear"
          >
            YEAR
          </label>
          <div className="mt-2 mb-4 transition-all ease-in border border-white/20 rounded-xl px-2 py-2 flex gap-x-2 group-parent focus-within:border-2 focus-within:border-amber-600">
            <select
              name="selectModelYear"
              id="selectModelYear"
              defaultValue={selectedModelYear}
              className="w-full text-white/80 outline-none"
              onChange={handleSelectedYear}
            >
              <option value="none" className="bg-black/70">
                Select year
              </option>
              {modelYears.map((year) => (
                <option
                  key={'model-year-' + year}
                  value={year}
                  className="bg-black/70"
                  selected={selectedModelYear == year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>

          <label
            className="text-xs font-semibold text-white/40"
            htmlFor="searchModel"
          >
            MODEL
          </label>
          <div className="mt-2 transition-all ease-in border border-white/20 rounded-xl px-2 py-2 flex gap-x-2 group-parent focus-within:border-2 focus-within:border-amber-600">
            <span className="text-xs text-white/50">
              <Search className="w-4" />
            </span>
            <input
              type="text"
              id="searchModel"
              name="searchModel"
              className="w-full h-full placeholder:text-gray-600 placeholder:text-sm outline-none group-child"
              onChange={handleModelSearchInput}
              value={searchInput}
              placeholder="Search model..."
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filteredVehicleModels.map((mod) => (
            <ModelComponent
              key={mod.id + mod.model}
              id={mod.id}
              name={mod.model}
              selected={selectedModelId}
              onClick={handleSelectModel}
            />
          ))}
        </div>
      </div>
    </SelectionWrapperUI>
  );
};

export default VehicleModelSelction;

const ModelComponent = ({
  id,
  name,
  onClick,
  selected,
}: {
  id: string;
  name: string;
  selected: string | undefined;
  onClick: (modelId: string, model: string) => void;
}) => {
  return (
    <div
      onClick={() => onClick(id, name)}
      className={`transition-all ease-in w-32 h-10 border rounded-md p-2 ${selected == id ? 'bg-amber-500/5 border-amber-500/80' : 'bg-black/20 border-white/20'} flex justify-center items-center hover:scale-105 cursor-default`}
    >
      <span className="text-white/70 text-xs">{name}</span>
    </div>
  );
};
