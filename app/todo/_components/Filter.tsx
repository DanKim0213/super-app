import type { FilterType } from "../page";
import FilterButton from "./FilterButton";

type PropsType = {
  FILTER_NAMES: FilterType[];
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

/**
 * show a different filter responsively
 */
function Filter({ FILTER_NAMES, filter, setFilter }: PropsType) {
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <section className="mx-10 mt-5">
      <div className="flex justify-between gap-2 max-sm:hidden">
        {filterList}
      </div>
      <div className="flex justify-end sm:hidden">
        <label className="flex items-center gap-2 text-xl" htmlFor="filter">
          Active
          <input
            className="appearance-none w-16 h-9 rounded-full flex items-center bg-neutral-400 checked:bg-red-200 after:w-8 after:h-8 after:bg-neutral-200 after:checked:bg-red-500 after:block after:box-content after:rounded-full after:checked:translate-x-full after:transition  
              "
            type="checkbox"
            role="switch"
            name="toggle"
            id="filter"
            checked={filter === "Active"}
            onChange={() =>
              setFilter((curr) => (curr === "Active" ? "All" : "Active"))
            }
          />
        </label>
      </div>
    </section>
  );
}

export default Filter;
