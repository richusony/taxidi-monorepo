import type { SyntheticEvent } from 'react';
import { create } from 'zustand';

export interface VehicleFormData {
  vehicleType?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleVariant?: string;
  details?: any;
  pricing?: any;
  location?: any;
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
