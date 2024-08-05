import StepsProps from "@/data/interfaces/StepsProps.interface";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

export default function Steps(props: Readonly<StepsProps>) {
  const [currentStep, setCurrentStep] = useState(0);
  function previosStep() {
    setCurrentStep(currentStep - 1);
    props.changeNextStep(true);
  }
  function nextStep() {
    setCurrentStep(currentStep + 1);
    props.changeNextStep(false);
  }
  function renderStep() {
    return (
      <ul className="flex flex-col md:flex-row gap-4 md:gap-7">
        {props.labels.map((label, i) => {
          return (
            <li key={label} className="flex items-center gap-2 list-none">
              <span
                key={label}
                className={`flex justify-center items-center w-9 h-9 p-1 rounded-full font-bold ${i === currentStep ? "bg-white text-black" : "text-zinc-500 bg-zinc-700"}`}>
                {i + 1}
              </span>
              <h2 className={i === currentStep ? "text-white" : "text-zinc-700"}>
                {label}
              </h2>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <section className="flex flex-col gap-10 items-center lg:items-stretch">
      {renderStep()}
      <section>{props.children?.[currentStep] ?? props.children}</section>
      <nav className="flex gap-3 select-none">
        <button
          onClick={previosStep}
          disabled={currentStep === 0}
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <IconChevronLeft size={20} />
          <p>Anterior</p>
        </button>
        <button
          onClick={nextStep}
          disabled={
            currentStep === (props.children?.length ?? 0) - 1 ||
            !props.allowsNextStep
          }
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <p>Próximo</p>
          <IconChevronRight size={20} />
        </button>
      </nav>
    </section>
  );
}
