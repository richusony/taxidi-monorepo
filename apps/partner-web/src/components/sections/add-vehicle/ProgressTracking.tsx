const ProgressTracking = ({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) => {
  return (
    <section className="mt-10 mb-5 md:min-w-96 overflow-x-scroll hide-scrollbar">
      {/* main container */}
      <div className="flex">
        {/* step */}
        {steps.map((s, index) => (
          <StepComponent
            key={index}
            indexKey={index}
            stepText={s}
            currentStep={currentStep}
          />
        ))}
      </div>
    </section>
  );
};

export default ProgressTracking;

const StepComponent = ({
  indexKey,
  stepText,
  currentStep,
}: {
  indexKey: number;
  stepText: string;
  currentStep: number;
}) => {
  return (
    <div className="w-32 flex flex-col items-start">
      {/* step text */}
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full border-2 text-sm bg-white/5 ${currentStep >= indexKey ? 'border-amber-500 text-amber-500' : 'border-white/20 text-white/20'} flex justify-center items-center`}
        >
          {indexKey + 1}
        </div>
        {/* step loader */}
        <span
          className={`${indexKey >= 7 && 'hidden'} ml-1 h-px w-20 rounded-full ${currentStep >= indexKey + 1 ? 'bg-amber-500' : 'bg-white/20'}`}
        ></span>
      </div>
      <p
        className={`mt-2 text-xs font-semibold ${currentStep >= indexKey ? 'text-amber-500' : 'text-white/20'}`}
      >
        {stepText}
      </p>
    </div>
  );
};
