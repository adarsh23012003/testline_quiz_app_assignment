import React from "react";

function LoadingIcon() {
  return (
    <>
      <div className="fixed inset-0 bg-black/80 bg-opacity-10 z-30 flex h-screen w-full justify-center items-center">
        <div className="loader z-30"></div>
      </div>
    </>
  );
}

export default LoadingIcon;
