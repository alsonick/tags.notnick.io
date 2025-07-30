export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className="flex items-center justify-center text-white font-semibold
      bg-black p-2 px-4 rounded-lg focus:outline-2"
    >
      {props.children}
    </button>
  );
};
