const ButtonDanger = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
    >
      {children}
    </button>
  );
};

export default ButtonDanger;
