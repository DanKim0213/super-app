import { FilterType } from "../page";

type PropsType = {
  isPressed: boolean;
  name: FilterType;
  setFilter: (name: FilterType) => void;
};

function FilterButton(props: PropsType) {
  return (
    <button
      type="button"
      className="flex-1 cursor-pointer border border-[#d3d3de] py-2 text-xl aria-pressed:border-[#4d4d4d] aria-pressed:underline"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="hidden">Show </span>
      <span>{props.name}</span>
      <span className="hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
