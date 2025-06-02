import { useTranslation } from "react-i18next";
import type { Sponsor } from "../../../types/SlickSlide";
import { slickSlideData } from "../../../data/SlickSlide";
import { Slider } from "../../../components/components/Slider";
import CompanyCard from "../../../components/components/CompanyCard";

// const Recognize = () => {
//     const { t } = useTranslation();
//     return (
//         <>
//             <div className="w-full py-16 md:px-10 bg-[linear-gradient(180deg,_#fff_0%,_rgba(2,103,171,0.15)_50%,_#fff_100%)]">
//                 <div className="mx-auto max-w-screen-2xl px-5">
//                     <div className="mb-10 flex flex-col items-center">
//                         <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
//                             {t("recognize.rn1")}
//                         </h1>
//                     </div>
//                     <div className="mx-auto my-10">
//                         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
//                             <CompanyCard
//                                 imageSrc="/assets/company1.png"
//                                 altText="Company 1"
//                                 title={t("recognize.rn2")}
//                             />
//                             <CompanyCard
//                                 imageSrc="/assets/company2.png"
//                                 altText="Company 2"
//                                 title={t("recognize.rn3")}
//                             />
//                             <CompanyCard
//                                 imageSrc="/assets/company3.png"
//                                 altText="Company 3"
//                                 title={t("recognize.rn4")}
//                             />
//                             <CompanyCard
//                                 imageSrc="/assets/company4.png"
//                                 altText="Company 4"
//                                 title={t("recognize.rn5")}
//                             />
//                             <CompanyCard
//                                 imageSrc="/assets/company5.png"
//                                 altText="Company 5"
//                                 title={t("recognize.rn6")}
//                             />
//                         </div>
//                     </div>
//                     <div className="relative rounded-xl border bg-white p-6 pt-0 shadow border-gray-200">
//                         <div className="flex items-center justify-center mb-10">
//                             <img 
//                                 src="/assets/quotes.png" 
//                                 alt="quote" 
//                                 className=" text-[#73b5e7] transform hidden md:block absolute -left-4 -top-5" 
//                             />
//                         </div>
//                         <p className="mb-4 text-center font-semibold text-[#0266AD] sm:text-lg md:text-left md:text-xl">
//                             {t("recognize.rn7")}
//                         </p>
//                         <div className="flex items-center gap-4">
//                             <div className="size-12 aspect-square flex items-center justify-center rounded-full bg-sky-100 overflow-hidden">
//                                 <img 
//                                     src="/assets/avatar.png"
//                                     alt="img" 
//                                     loading="lazy"
//                                     decoding="async"
//                                     className="max-w-full max-h-full object-contain"
//                                 />
//                             </div>
//                             <div>
//                                 <p className="font-bold sm:text-lg md:text-xl">{t("recognize.rn8")}</p>
//                                 <p className="text-sm text-gray-500 sm:text-lg">{t("recognize.rn9")}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

const Recognize = () => {
    const { t } = useTranslation();
    const people: Sponsor[] = slickSlideData;

    return (
        <>
            <div className="w-full py-16 md:px-10 bg-[linear-gradient(180deg,_#fff_0%,_rgba(2,103,171,0.15)_50%,_#fff_100%)]">
                <div className="mx-auto max-w-screen-2xl px-5">
                    <div className="mb-10 flex flex-col items-center">
                        <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                            {t("recognize.tittle")}
                        </h1>
                    </div>
                    <div className="mx-auto my-10">
                        <Slider people={people} />
                    </div>

                    <div className="relative rounded-xl border bg-white p-6 pt-0 shadow border-gray-200">
                        <div className="flex items-center justify-center mb-10">
                            <img 
                                src="/assets/quotes.png" 
                                alt="quote" 
                                className=" text-[#73b5e7] transform hidden md:block absolute -left-4 -top-5" 
                            />
                        </div>
                        <p className="mb-4 text-center font-semibold text-[#0266AD] sm:text-lg md:text-left md:text-xl">
                            {t("recognize.comment")}
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="size-12 aspect-square flex items-center justify-center rounded-full bg-sky-100 overflow-hidden">
                                <img 
                                    src="/assets/mockUser.png"
                                    alt="img" 
                                    loading="lazy"
                                    decoding="async"
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-bold sm:text-lg md:text-xl">{t("recognize.customer")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Recognize;