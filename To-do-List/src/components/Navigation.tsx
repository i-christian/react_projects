import Button from "./Button";
import { FILTER_NAMES } from "./filterTasks";

interface NavigationProps {
  filter: string;
  setFilter: (name: string) => void;
}

const Navigation = ({ filter, setFilter }: NavigationProps) => {
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
