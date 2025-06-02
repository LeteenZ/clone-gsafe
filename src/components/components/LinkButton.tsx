import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import type { NavigationButtonProps } from "../../types/NavigationButton";

const LinkButton: React.FC<NavigationButtonProps> = ({ to, labelKey }) => {
  const { t } = useTranslation();
  
  return (
    <Link to={to}>
      <button
        className="border-2 flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 text-base bg-[#0266ad] border-[#0266ad] hover:bg-white hover:text-[#0266ad] hover:border-[#0266ad] text-white cursor-pointer"
      >
        <div className="group flex h-10 items-center gap-2 text-sm md:h-12 md:text-base">
          <p>{t(labelKey)}</p>
        </div>
      </button>
    </Link>
  );
};

export default LinkButton;
