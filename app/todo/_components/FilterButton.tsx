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
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
