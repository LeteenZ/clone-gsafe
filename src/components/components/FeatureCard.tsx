import React from "react";
import type { FeatureCardProps } from "../../types/Global";

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex flex-col gap-3 p-4 pb-9 h-full rounded-lg border border-gray-200 bg-white shadow-md scale-hover">
      <div className="flex flex-col items-center gap-3 md:items-baseline">
        <div className="mb-2 place-items-center md:place-items-start">
          <div className="size-16 rounded-lg bg-sky-100 py-5 flex items-center justify-center">
            <img
              src={imageSrc}
              alt="img"
              loading="lazy"
              decoding="async"
              className="object-contain"
            />
          </div>
        </div>
        <h3 className="mb-1 text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm font-medium text-[#686D72]">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
