import "../index.css";
import Button from "./Button";
import { FILTER_NAMES } from "./filterTasks";

const Navigation = ({ filter, setFilter }) => {
  const filterList = FILTER_NAMES.map((name) => (
    <Button
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <nav className="flex flex-row gap-1 flex-wrap sm:flex-nowrap w-full">
      {filterList}
    </nav>
  );
};

export default Navigation;
