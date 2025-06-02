import React from "react";
import { useTranslation } from "react-i18next";
import Licomponent from "./Licomponent";
import LinkButton from "./LinkButton";
import type { DevicePriceCardProps } from "../../types/Global";

const DevicePriceCard: React.FC<DevicePriceCardProps> = ({ deviceKey }) => {
  const { t } = useTranslation();

  const prefixs = `device_price.price`;
  const prefix = `device_price.price.${deviceKey}`;

  return (
    <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.3)] scale-hover">
      <div className="md:h-full">
        <div className="mb-4 rounded-t-md bg-sky-100 p-4">
          <h4 className="mb-1 mt-3 text-center text-3xl font-bold text-[#0066b3] sm:text-2xl md:text-3xl">
            {t(`${prefix}.tittle`)}
          </h4>
          <div className="my-3 text-center">
            <span className="text-xl font-bold sm:text-2xl md:text-2xl">
              {t(`${prefix}.price`)}
            </span>
            <span className="ml-1 text-xs font-medium sm:text-sm md:text-base">
              /{t(`${prefix}.price1`)}
            </span>
          </div>
        </div>
        <ul className="mx-3 my-8 space-y-3">
          <Licomponent label={t(`${prefix}.feature`)} />
          <Licomponent label={t(`${prefix}.feature1`)} />
          <Licomponent label={t(`${prefix}.feature2`)} />
        </ul>
      </div>
      <div className="flex items-center justify-center mb-2">
        <LinkButton to="/purchase" labelKey={`${prefixs}.btn`} />
      </div>
      <div className="mb-3 mt-2 text-center text-gray-500">
        <p>{t(`${prefixs}.note`)}</p>
      </div>
    </div>
  );
};

export default DevicePriceCard;
