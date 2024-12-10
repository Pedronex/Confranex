interface Props {
  sequence: string;
  name: string;
  number: number;
}

export function Card({ name, sequence, number }: Props) {
  return (
    <article className="bg-[#125C3A] flex-row w-1/3 justify-between inline-flex items-center rounded-xl p-3 m-4 h-fit">
      <span className="text-[#f5f5f5] text-4xl font-black w-fit pr-3">
        {sequence}
      </span>
      <span className="text-[#f5f5f5] text-4xl font-black w-full border-r-2 border-l-2 text-center">
        {name}
      </span>
      <span className="text-[#f5f5f5] text-4xl font-black w-fit text-end pl-3">
        {number.toString().padStart(4, "0")}
      </span>
    </article>
  );
}
