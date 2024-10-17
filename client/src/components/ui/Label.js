const Label = ({ children, ...props }) => {
  return (
    <label
      {...props}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {children}
    </label>
  );
};

export default Label;
