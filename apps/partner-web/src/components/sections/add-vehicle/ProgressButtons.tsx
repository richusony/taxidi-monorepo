import type { SyntheticEvent } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

export const ProgressNextButton = ({
  selected,
  nextStep,
}: {
  selected: string | undefined;
  nextStep: (e: SyntheticEvent) => void;
}) => {
  return (
    <button
      onClick={nextStep}
      disabled={selected == undefined}
      className={`rounded-xl px-4 py-2 flex items-center gap-x-1 ${selected ? 'bg-amber-500 text-black/80 cursor-pointer' : 'bg-white/10 text-white/10 cursor-not-allowed'}`}
    >
      <span className="">Continue</span>
      <span className="">
        <BiRightArrowAlt />
      </span>
    </button>
  );
};

export const ProgressPrevButton = ({
  prevStep,
}: {
  prevStep: (e: SyntheticEvent) => void;
}) => {
  return (
    <button
      onClick={prevStep}
      className={`rounded-xl px-4 py-2 flex items-center gap-x-1 bg-white/10 text-white/80 cursor-pointer`}
    >
      <BiLeftArrowAlt />
      <span>Back</span>
    </button>
  );
};
