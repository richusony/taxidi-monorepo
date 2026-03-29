import type { JSX } from 'react';

export interface VehicleTypesType {
  id: string;
  type: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export interface VehicleBrandType {
  id: string;
  brand: string;
}

export interface VehicleModelType {
  id: string;
  model: string;
}

export interface VehicleVariantTrimType {
  id: string;
  title: string;
  subtitle: string;
}

export interface VehicleVariantTransmissionType {
  id: string;
  title: string;
  subtitle: string;
}

export interface VehicleVariantFuelType {
  id: string;
  title: string;
}

export interface VehicleBodyColorType {
  id: string;
  color: string;
  colorText: string;
}
