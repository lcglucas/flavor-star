import { classNames } from "../../utils/classNames";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-600",
        props.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
