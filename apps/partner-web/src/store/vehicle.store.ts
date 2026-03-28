import type { SyntheticEvent } from 'react';
import { create } from 'zustand';

export interface VehicleFormData {
  vehicleType?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleVariant?: string;
  transmission?: string;
  fuel?: string;
  bodyColor?: string;
  mileage?: number;
  engineDisplacement?: number;
  numberPlate?: string;
  description?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  latitude?: number;
  longitude?: number;
  city?: string;
  landmark?: string;
  state?: string;
  pincode?: string;
  fullAddress?: string;
}

interface VehicleAddStore {
  currentStep: number;

  data: VehicleFormData;

  setData: (values: Partial<VehicleFormData>) => void;

  moveToNextStep: (e: SyntheticEvent) => void;
  moveToPrevStep: (e: SyntheticEvent) => void;

  reset: () => void;
}

export const useVehicleAddStore = create<VehicleAddStore>((set) => ({
  currentStep: 0,
  data: {},
  setData: (values) =>
    set((state) => ({
      data: {
        ...state.data,
        ...values,
      },
    })),
  moveToNextStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  moveToPrevStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1 })),
  reset: () => set({ data: {} }),
}));
