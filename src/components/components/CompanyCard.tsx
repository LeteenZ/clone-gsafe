import React from "react";
import type { CompanyCardProps } from "../../types/Global";

const CompanyCard: React.FC<CompanyCardProps> = ({ imageSrc, altText = "Company logo", title }) => {
    return (
      <div className="border bg-white rounded-2xl drop-shadow-xl border-gray-200">
        <div className="m-4 rounded-t-2xl bg-sky-100 py-5 flex items-center justify-center">
          <img src={imageSrc} alt={altText} className="object-contain" />
        </div>
        <div className="p-4 grid place-items-center text-center">
          <p className="text-xl font-semibold text-[#252627]">{title}</p>
        </div>
      </div>
    );
  };
  
export default CompanyCard;