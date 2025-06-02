import React from "react";
import type { LicomponentProps } from "../../types/Global";

const Licomponent: React.FC<LicomponentProps> = ({ label }) => {
  return (
    <li className="flex gap-1">
      <div className="size-5 shrink-0 pt-1">
        <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#0266ad] shadow-[0_0_5px_2px_rgba(29,78,216,0.5)] md:mt-1.5"></div>
      </div>
      <span className="text-lg font-medium text-gray-500 sm:text-lg xl:text-xl">
        {label}
      </span>
    </li>
  );
};

export default Licomponent;
