import { useTranslation } from "react-i18next";


const Banner = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className="relative w-full pt-16">
                <img 
                    src="/assets/bg-banner.jpg" 
                    alt="banner" 
                    width={1920}
                    height={1200}
                    className="h-auto w-full object-cover"
                    decoding="async"
                />
                <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center px-6 md:px-16">
                    <div className="flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-8 md:flex-row">
                        <div className="text-center md:w-1/2 md:text-left">
                            <h1 className="font-extrabold text-3xl mt-20 text-black drop-shadow-xl md:mt-1 lg:text-5xl leading-15">{t("banner.tittle")}</h1>
                            <p className="my-2 text-sm font-medium text-[#252627] md:text-lg md:my-6 md:flex-row md:justify-start">{t("banner.para")}</p>
                            <div className="my-3 flex items-center justify-center gap-3 md:my-6 md:flex-row md:justify-start">
                                <a href="/purchase">
                                    <button 
                                        className="border-2 flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 text-base bg-[#0266ad] border-[#0266ad] hover:bg-white hover:text-[#0266ad] hover:border-[#0266ad] text-white cursor-pointer"
                                    >
                                        <div className="group flex h-10 items-center gap-2 text-sm md:h-12 md:text-base">
                                            <p className="font-bold">{t("banner.btn")}</p>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="24" 
                                                height="24" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                className="lucide lucide-shopping-cart" 
                                                aria-hidden="true"
                                            >
                                                <circle cx="8" cy="21" r="1" />
                                                <circle cx="19" cy="21" r="1" />
                                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-1/2">
                        <img 
                            alt="Device" 
                            loading="lazy" 
                            width="500" 
                            height="400" 
                            decoding="async" 
                            className="h-auto w-full object-contain"
                            src="/assets/dv-banner.png"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
    
export default Banner;