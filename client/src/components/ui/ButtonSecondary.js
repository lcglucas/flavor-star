const ButtonSecondary = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
