const Layout = ({ children }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 w-full grow">
      <div className="mx-auto max-w-7xl h-full">{children}</div>
    </div>
  );
};

export default Layout;
