import TitleProps from "@/data/interfaces/TitleProps.interface";

export default function Title(props: TitleProps) {
  return (
    <header className="flex flex-col items-center gap-2">
      {props.tag && (
        <h4 className="text-sm md:text-base bg-zinc-700 px-4 py-1.5 rounded-md font-black mb-2">
          {props.tag}
        </h4>
      )}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gradient">
        {props.primary}
      </h2>
      <p className="text-zinc-500 md:w-[450px] px-7 md:px-0 text-center">
        {props.secondary}
      </p>
    </header>
  );
}
