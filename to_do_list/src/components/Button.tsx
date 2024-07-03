interface ButtonProps {
  name: string;
  isPressed: boolean;
  setFilter: (name: string) => void;
}

const Button = ({ name, isPressed, setFilter }: ButtonProps) => {
  return (
    <button
      type="button"
      className="border w-full h-fit text-center text-xl bg-slate-600 text-white hover:bg-blue-700 focus:ring ring-red-900 ring-inset focus:bg-white focus:text-black rounded-md"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
      <span className="hidden sm:inline"> Tasks</span>
    </button>
  );
};

export default Button;
