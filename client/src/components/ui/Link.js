import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, ...props }) => {
  return (
    <RouterLink
      {...props}
      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    >
      {children}
    </RouterLink>
  );
};

export default Link;
