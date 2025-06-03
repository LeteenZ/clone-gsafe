import React from "react";
import type { SidebarDrawerProps } from "../../types/SidebarDrawer";
import { useTranslation } from "react-i18next";
import { linkData } from "../../data/Link";
import vectorStroke from '../../../public/assets/Vector (Stroke).png';

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, toggleDrawer }) => {
    const { t } = useTranslation();
    return (
        <>
            <div 
                className={`
                    fixed top-0 left-0 z-50 w-full h-screen bg-black opacity-50 
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
                onClick={toggleDrawer}
            >    
            </div>
            <div
                className={`
                    fixed top-0 right-0 h-screen w-80 bg-white p-4 overflow-y-auto
                    transition-transform duration-300 
                    z-100
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                <button
                    onClick={toggleDrawer}
                    className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>

                <div className="flex flex-col gap-5">
                    <div className="flex gap-3 items-center">
                        <div className="flex justify-center content-center rounded-2xl bg-[#0266ad] w-[50px] h-[50px]">
                            <img 
                                src={vectorStroke}
                                className="object-none" 
                                alt="img" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">{t('navigation.consult')}:</span>
                            <span className=" font-extrabold text-[#0266ad]">{t('navigation.hotline')}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <ul className="gap-8 px-1 flex py-2 flex-col w-full">
                            {linkData.map((item) => (
                                <li key={item.id} className="flex justify-left items-center rounded-md hover:bg-gray-200 py-2 px-4">
                                    <a href={item.href} className="text-xl font-medium uppercase text-gray-500" target="_blank" rel="noreferrer">{t(item.name)}</a>
                                </li>
                            ))}
                        </ul>   
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarDrawer;
