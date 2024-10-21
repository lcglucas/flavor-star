const LoadingOverlay = () => {
  return (
    <div className="absolute bg-gray-900 bg-opacity-40 z-50 h-full w-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full animate-spin border-4 border-solid border-purple-500 border-t-transparent" />
    </div>
  );
};

export default LoadingOverlay;
