import React from "react";
import type { WorkCardProps } from "../../types/Global";

const WorkCard: React.FC<WorkCardProps> = ({ iconSrc, title, description }) => {
    return (
    <div className="flex h-full">
      <div className="flex min-w-60 max-w-72 flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm">
        <div className="mb-3">
          <div className="flex size-20 items-center justify-center rounded-lg bg-blue-100">
            <img
              src={iconSrc}
              alt="img"
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <h1 className="mb-1 text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-base text-gray-500">{description}</p>
      </div>
    </div>
    );
  };
  
  export default WorkCard;