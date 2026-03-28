import type { ReactNode, SyntheticEvent } from 'react';
import {
  ProgressNextButton,
  ProgressPrevButton,
  SubmitButton,
} from './ProgressButtons';
import { useVehicleAddStore } from '@/store/vehicle.store';

interface SelectionWrapperParams {
  wrapperTitle: string;
  wrapperDescription: string;
  nextBtn: (e: SyntheticEvent) => void;
  prevBtn: (e: SyntheticEvent) => void;
  isNextEnabled?: boolean;
  isPrevEnabled?: boolean;
  children?: ReactNode;
  selected: string | undefined;
}

const SelectionWrapperUI = ({
  wrapperTitle,
  wrapperDescription,
  nextBtn,
  prevBtn,
  isNextEnabled = true,
  isPrevEnabled = true,
  children,
  selected,
}: SelectionWrapperParams) => {
  const currentStep = useVehicleAddStore((s) => s.currentStep);
  return (
    <section className="rounded-2xl border border-white/10 p-8 bg-white/10">
      <h3 className="font-semibold">{wrapperTitle}</h3>
      <p className="mt-1 text-sm text-white/40">{wrapperDescription}</p>
      <hr className="my-5 text-white/10" />
      {children}
      <hr className="my-5 text-white/10" />
      <div
        className={`flex ${
          isPrevEnabled && isNextEnabled
            ? 'justify-between'
            : isPrevEnabled == false && isNextEnabled == true
              ? 'justify-end'
              : isPrevEnabled == true &&
                  isNextEnabled == false &&
                  currentStep == 7
                ? 'justify-between'
                : 'justify-start'
        }`}
      >
        {isPrevEnabled && <ProgressPrevButton prevStep={prevBtn} />}
        {isNextEnabled && (
          <ProgressNextButton selected={selected} nextStep={nextBtn} />
        )}
        {currentStep == 7 && (
          <SubmitButton onSubmit={() => console.log('hi')} />
        )}
      </div>
    </section>
  );
};

export default SelectionWrapperUI;
