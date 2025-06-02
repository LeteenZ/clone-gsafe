import { useTranslation } from "react-i18next";
import './index.css';
import LinkButton from "../../../components/components/LinkButton";
import Licomponent from "../../../components/components/Licomponent";
import Li2Component from "../../../components/components/Li2Component";
import DevicePriceCard from "../../../components/components/DevicePriceCard";
import { useInView } from "../../../hooks/useInView";
const DevicePrice = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView();
    return (
        <>
            <div className="mx-auto max-w-screen-2xl md:px-5 price-list" id="device-price">   
                <div className="m-5 py-8 md:mx-10">
                    <div className="mb-6 text-center">
                        <h2 className="mb-4 text-2xl font-bold xl:text-5xl text-gray-900">
                            {t("device_price.tittle")}
                        </h2>
                        <p className="text-lg font-medium text-gray-600">
                            {t("device_price.tittle1")}
                        </p>
                    </div>
                    <div 
                        ref={ref as React.RefObject<HTMLDivElement>}
                        className={`
                            duration-700 ease transform transition-all 
                            ${inView ? "opacity-100 translate-y-0 slide-in-up" : "opacity-0 translate-y-8"}
                        `}
                    >
                        <div className="overflow-hidden rounded-lg bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex items-center justify-center bg-sky-50 p-6 pb-0 md:w-5/12">
                                    <div className="flex gap-4 flex-col items-center">
                                        <img 
                                            src="/assets/Gsafe G6.png" 
                                            alt="img" 
                                            className="object-contain"
                                            width={494}
                                            height={452}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="mt-10">
                                            <LinkButton to="/device" labelKey="device_price.device.btn" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 pb-0 md:w-7/12">
                                    <div className="flex flex-col justify-center h-full">
                                        <h3 className="mb-5 text-center text-2xl font-bold text-[#0267ab] sm:text-3xl md:text-left xl:text-4xl">
                                            {t("device_price.device.tittle")}
                                        </h3>
                                        <h4 className="mb-4 block text-center md:text-left">
                                            <span className="text-xl font-bold text-gray-900 sm:text-3xl xl:text-4xl">{t("device_price.device.price")}</span>
                                            <span className="text-sm font-medium text-gray-500 ml-2">/{t("device_price.device.price1")}</span>
                                        </h4>
                                        <ul className="mb-6 space-y-4">
                                            <Licomponent label={t("device_price.device.feature")} />
                                            <Licomponent label={t("device_price.device.feature1")} />
                                            <Licomponent label={t("device_price.device.feature2")} />
                                            <Licomponent label={t("device_price.device.feature3")} />
                                            <Licomponent label={t("device_price.device.feature4")} />
                                            <Licomponent label={t("device_price.device.feature5")} />
                                        </ul>
                                        <div className="mb-6 pt-4">
                                            <h4 className="mb-2 text-center text-lg font-bold text-[#0267ab] sm:text-xl md:text-left xl:text-2xl">
                                                <span className="text-lg font-medium text-red-600 sm:text-xl xl:text-2xl">*</span>
                                                <span className="pl-2">{t("device_price.device.tittle2")}</span>
                                            </h4>
                                            <p className="mb-3 font-medium text-gray-500 sm:text-lg xl:text-xl">
                                                - {t("device_price.device.para")}
                                            </p>
                                            <p className="font-medium text-gray-500 sm:text-lg xl:text-xl">
                                                - {t("device_price.device.para1")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-5 md:mx-10">
                    <div className="rounded-lg bg-sky-100 p-6 shadow-sm">
                        <h2 className="text-lg font-extrabold text-[#0267ab] mb-6 uppercase sm:text-xl md:text-2xl">
                            {t("device_price.feature.tittle")}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Li2Component text={t("device_price.feature.feature")} />
                            <Li2Component text={t("device_price.feature.feature1")} />
                            <Li2Component text={t("device_price.feature.feature2")} />
                            <Li2Component text={t("device_price.feature.feature3")} />  
                        </div>
                    </div>
                </div>
                <div className="mx-5 py-8 md:mx-10">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                        <DevicePriceCard deviceKey="device1" />
                        <DevicePriceCard deviceKey="device2" />
                        <DevicePriceCard deviceKey="device3" />
                        <DevicePriceCard deviceKey="device4" />
                    </div>
                    <div className="mt-8 text-sm italic text-gray-500">
                        <span>{t("device_price.price.note1")}</span>
                        <span className="text-red-500">*</span>
                        <span>{t("device_price.price.note2")}</span>
                    </div>
                </div>
                <div className="m-10 overflow-hidden rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                    <div className="rounded-t-lg bg-sky-100 p-5 md:px-28">
                        <p className="font-bold md:text-xl">{t("device_price.preference.tittle")}</p>
                    </div>
                    <div className="flex items-center justify-around border-b border-gray-200 bg-gray-100 px-5 py-3 font-semibold text-gray-600">
                        <p className="md:text-lg">{t("device_price.preference.header")}</p>
                        <p className="md:text-lg">{t("device_price.preference.header1")}</p>
                    </div>
                    <div className="flex items-center justify-around border-b border-gray-200 px-5 py-4 last:border-b-0">
                        <p className="font-medium md:text-lg">{t("device_price.preference.para")}</p>
                        <p className="font-medium md:text-lg">{t("device_price.preference.para2")}</p>
                    </div>
                    <div className="flex items-center justify-around border-b border-gray-200 px-5 py-4 last:border-b-0">
                        <p className="font-medium md:text-lg">{t("device_price.preference.para1")}</p>
                        <p className="font-medium md:text-lg">{t("device_price.preference.para22")}</p>
                    </div>
                    <div className="flex items-center justify-around border-b border-gray-200 px-5 py-4 last:border-b-0">
                        <p className="font-medium md:text-lg">{t("device_price.preference.para11")}</p>
                        <p className="font-medium md:text-lg">{t("device_price.preference.para222")}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DevicePrice;
