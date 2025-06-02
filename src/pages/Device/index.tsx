import { useTranslation } from "react-i18next";
import { useInView } from "../../hooks/useInView";

const Device = () => {
    window.scrollTo(0, 0);
    const { t } = useTranslation('device');
    const { ref, inView } = useInView();
    return (
        <>
            <div className="mt-16 min-h-[70vh] w-full xl:mt-[76px]">
                <div className="relative flex min-h-[50px] w-full items-center justify-center overflow-hidden bg-sky-100">
                    <h2 className="z-10 my-4 text-[32px] font-bold text-neutral-900">
                        {t("devices.tittle")}
                    </h2>
                </div>
                <div 
                    ref={ref as React.RefObject<HTMLDivElement>}
                    className={`
                        duration-700 ease transform transition-all 
                        ${inView ? "opacity-100 translate-y-0 slide-in-up" : "opacity-0 translate-y-8"}
                    `}
                >
                    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 md:flex-row">
                        <div className="order-1 flex flex-1 justify-center md:order-2">
                            <img 
                                src="/assets/Gsafe G6.png" 
                                alt="img" 
                                className="object-contain"
                                width={494}
                                height={452}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div className="order-2 flex-1 md:order-1">
                            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
                                {t("devices.details.tittle")}
                            </h1>
                            <p className="mb-8 text-sm text-gray-700 md:text-lg text-justify">
                                {t("devices.details.para")}
                            </p>
                            <a href="/purchase">
                                <button
                                    className="border-2 flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 text-base bg-[#0266ad] border-[#0266ad] hover:bg-white hover:text-[#0266ad] hover:border-[#0266ad] text-white cursor-pointer"
                                >
                                    <div className="group flex h-10 items-center gap-2 text-sm md:h-12 md:text-base">
                                        <p>{t("devices.details.btn")}</p>
                                    </div>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Device;    
