import { useTranslation } from "react-i18next";
import FeatureCard from "../../../components/components/FeatureCard";
import WorkCard from "../../../components/components/WorkCard";
import Li2Component from "../../../components/components/Li2Component";
import { useInView } from "../../../hooks/useInView";
import fourGImage from "../../../../public/assets/4g.png";
import shieldImage from "../../../../public/assets/shield.png";
import phoneImage from "../../../../public/assets/phone.png";
import batteryImage from "../../../../public/assets/battery.png";
import deviceImg from "../../../../public/assets/Gsafe G6.png";
import specificationsImage from "../../../../public/assets/specifications.png";
import signalImage from "../../../../public/assets/signal.png";
import notifImage from "../../../../public/assets/notif.png";
import carImage from "../../../../public/assets/car.png";
import achiveImage from "../../../../public/assets/achive.png";
import arrowImage from "../../../../public/assets/arrow.png";
import fireImage from "../../../../public/assets/fire.png";

const Details = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView();

    return (
        <>
            <div className="mx-auto max-w-screen-2xl md:px-5">
                <div className="mx-5 py-8 md:mx-10">
                    <div className="m-8 text-center">
                        <h1 className="mb-5 text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                            {t("details.tittle")}
                        </h1>
                        <p className="mx-auto max-w-6xl font-medium text-gray-600 text-base sm:text-lg md:text-xl">
                            {t("details.tittle1")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                        <div className="md:col-span-4">
                            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
                                <FeatureCard
                                    imageSrc={fourGImage}
                                    title={t("details.feature.tittle")}
                                    description={t("details.feature.para")}
                                />
                                <FeatureCard
                                    imageSrc={shieldImage}
                                    title={t("details.feature1.tittle")}
                                    description={t("details.feature1.para")}
                                />
                                <FeatureCard
                                    imageSrc={phoneImage}
                                    title={t("details.feature2.tittle")}
                                    description={t("details.feature2.para")}
                                />
                                <FeatureCard
                                    imageSrc={batteryImage}
                                    title={t("details.feature3.tittle")}
                                    description={t("details.feature3.para")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 bg-sky-100 px-6 py-4 shadow md:col-span-3">
                            <div className="overflow-hidden">
                                <img 
                                    src={deviceImg} 
                                    alt="img" 
                                    className="object-contain max-w-full max-h-full"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-5 rounded-xl border border-gray-200 bg-sky-100 p-4 py-8 md:mx-10">
                    <div className="mb-5 ml-5 mt-5 text-left text-xl font-extrabold text-[#0266AD] sm:text-3xl md:text-[28px]">
                        {t("details.tittle2")}
                    </div>
                    <div className="flex h-full flex-col items-center justify-center gap-3 xl:h-72 xl:flex-row xl:gap-0">
                        <div className="flex h-full flex-col items-center justify-center xl:h-72 xl:flex-row gap-2 xl:gap-0">
                            <WorkCard
                                iconSrc={fireImage}
                                title={t("details.feature4.tittle")}
                                description={t("details.feature4.para")}
                            />
                            <img
                                src={arrowImage}
                                alt="img"
                                loading="lazy"
                                decoding="async"
                                className="my-2 py-5 rotate-90 xl:py-0 xl:mx-6 xl:my-0 xl:-rotate-0"
                            />
                        </div>
                        <div className="flex h-full flex-col items-center justify-center xl:h-72 xl:flex-row gap-2 xl:gap-0">
                            <WorkCard
                                iconSrc={signalImage}
                                title={t("details.feature5.tittle")}
                                description={t("details.feature5.para")}
                            />
                            <img
                                src={arrowImage}
                                alt="img"
                                loading="lazy"
                                decoding="async"
                                className="my-2 py-5 rotate-90 xl:py-0 xl:mx-6 xl:my-0 xl:-rotate-0"
                            />
                        </div>
                        <div className="flex h-full flex-col items-center justify-center xl:h-72 xl:flex-row gap-2 xl:gap-0">
                            <WorkCard
                                iconSrc={notifImage}
                                title={t("details.feature6.tittle")}
                                description={t("details.feature6.para")}
                            />
                            <img
                                src={arrowImage}
                                alt="img"
                                loading="lazy"
                                decoding="async"
                                className="my-2 py-5 rotate-90 xl:py-0 xl:mx-6 xl:my-0 xl:-rotate-0"
                            />
                        </div>
                        <WorkCard
                            iconSrc={carImage}
                            title={t("details.feature7.tittle")}
                            description={t("details.feature7.para")}
                        />
                    </div>
                </div>
                <div className="overflow-x-hidden">
                    <div className="mx-4 mb-10 md:mx-10">
                        <div className="flex flex-wrap items-stretch justify-between gap-6">
                            <div
                                ref={ref as React.RefObject<HTMLDivElement>}
                                className={` 
                                    ${inView ? 'left-in opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} 
                                    duration-700 ease transform transition-all 
                                    flex-1 max-w-full lg:max-w-[calc(50%-0.75rem)]
                                `}
                            >
                                <div className="h-full min-w-[300px] flex-1 rounded-xl bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                                    <div className="mb-4 flex items-center gap-3">
                                        <img 
                                            src={specificationsImage} 
                                            alt="img" 
                                            loading="lazy"
                                            decoding="async"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {t("details.parameter.tittle")}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        <Li2Component text={t("details.parameter.para")} />
                                        <Li2Component text={t("details.parameter.para1")} />
                                        <Li2Component text={t("details.parameter.para2")} />
                                        <Li2Component text={t("details.parameter.para3")} />
                                        <Li2Component text={t("details.parameter.para4")} /> 
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={ref as React.RefObject<HTMLDivElement>}
                                className={`
                                    ${inView ? 'right-in opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} 
                                    duration-700 ease transform transition-all 
                                    flex-1 max-w-full lg:max-w-[calc(50%-0.75rem)]
                                `}
                            >
                                <div className="h-full min-w-[300px] flex-1 rounded-xl bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                                    <div className="mb-4 flex items-center gap-3">
                                        <img 
                                            src={achiveImage} 
                                            alt="img" 
                                            loading="lazy"
                                            decoding="async"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {t("details.benefit.tittle")}
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        <Li2Component text={t("details.benefit.para")} />
                                        <Li2Component text={t("details.benefit.para1")} />
                                        <Li2Component text={t("details.benefit.para2")} />
                                        <Li2Component text={t("details.benefit.para3")} />
                                        <Li2Component text={t("details.benefit.para4")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;