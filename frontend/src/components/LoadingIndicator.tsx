import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingIndicator;
