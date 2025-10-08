const SuspenseLoading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 mt-4 text-sm">Loading...</p>
    </div>
  );
};

export default SuspenseLoading;