import { DotSpinner } from "@uiball/loaders";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <DotSpinner size={100} speed={0.9} color="white" />
    </div>
  );
};

export default Loader;
