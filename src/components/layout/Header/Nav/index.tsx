import { useTranslation } from "react-i18next";
import { useState } from "react";
import { linkData } from "../../../../data/Link";
import SidebarDrawer from "../../../components/Drawer";
import logoGEIC from "../../../../../public/assets/Logo GEIC blue.png";
import vectorStroke from "../../../../../public/assets/Vector (Stroke).png";
import arrow from "../../../../../public/assets/arrow_drop down_icon.png";

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [ isClicked, setisClicked ] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const changeLanguage = (language: string) => {
    if (i18n?.changeLanguage) {
        i18n.changeLanguage(language).then(() => {
            window.scrollTo(0, 0);
            localStorage.setItem('i18n-lang', language);
        });
    }
  };


  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/90 px-5 py-2 shadow-[0_5px_8px_-2px_rgba(0,0,0,0.1)] duration-200 xl:px-20">
        <div className="max-w-screen-3xl flex flex-wrap items-center justify-between">

            <a href="/lol" className="flex items-center justify-center cursor-pointer">
                <img 
                    src={logoGEIC} 
                    className="max-h-7 w-fit md:max-h-10 object-contain"
                    width={85}
                    height={30}
                    alt="Logo"
                />
            </a>

            <div className="hidden xl:block">
                <ul className="gap-4 px-1 flex py-2">
                    {linkData.map((item) => (
                        <li key={item.id} className="relative group rounded-md py-2 px-4">
                            <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-50 rounded-md transition-all duration-200 group-active:bg-black group-active:opacity-100 "></div>
                            <a
                                href={item.href}
                                className="relative z-10 flex justify-center items-center text-xl font-medium uppercase text-gray-500 group-active:text-white"
                                target={item.isblank ? "_blank" : "_self"}
                                rel={item.isblank ? "noreferrer" : ""}
                                onClick={(e) => {
                                    if (item.href.startsWith("#")) {
                                      const id = item.href.slice(1);
                                      const element = document.getElementById(id);
                                      if (!element) {
                                        e.preventDefault();
                                      }
                                    }
                                  }}
                            >
                                {t(item.name)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-1 lg:gap-3">

                <div className="hidden xl:flex gap-3 items-center">
                    <div className="flex justify-center content-center rounded-2xl bg-[#0266ad] w-[50px] h-[50px]">
                        <img 
                            src={vectorStroke}
                            className="object-none" 
                            alt="img" 
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">{t('navigation.consult')}:</span>
                        <span className="text-lg font-extrabold text-[#0266ad]">{t('navigation.hotline')}</span>
                    </div>
                </div>

                <div className="block rounded-md xl:hidden order-2 z-100">
                    <div className="text-center">
                        <button 
                            className="text-black font-medium text-sm md:px-2.5 py-2 cursor-pointer" 
                            onClick={toggleDrawer}
                        >
                            <svg 
                                className="swap-off fill-current" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="32" 
                                height="32" 
                                viewBox="0 0 512 512"
                            >
                                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"></path>
                            </svg>
                        </button>
                    </div>

                    <SidebarDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
                </div>

                <div 
                    className="relative inline-flex items-center space-x-2 group order-1"
                    onClick={() => setisClicked(!isClicked)}
                >
                    <div className="flex items-end gap-1">
                        {i18n.language == 'vi' ? (
                            <svg 
                                className="w-8 h-8 cursor-pointer"
                                enableBackground="new 0 0 512 512" 
                                viewBox="0 0 512 512" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle 
                                    cx="256" 
                                    cy="256" 
                                    fill="#d80027" 
                                    r="256"
                                />
                                <path 
                                    d="m256 133.565 27.628 85.029h89.405l-72.331 52.55 27.628 85.03-72.33-52.551-72.33 52.551 27.628-85.03-72.33-52.55h89.404z" 
                                    fill="#ffda44"
                                />
                                <g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/>
                            </svg>
                        ) : (
                            <svg 
                                className="w-8 h-8 cursor-pointer" 
                                enableBackground="new 0 0 512 512" 
                                viewBox="0 0 512 512" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle 
                                    cx="256" 
                                    cy="256" 
                                    fill="#f0f0f0" 
                                    r="256"
                                />
                                <g fill="#0052b4">
                                    <path d="m52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178z"/>
                                    <path d="m503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076z"/>
                                    <path d="m8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075z"/>
                                    <path d="m411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177z"/>
                                    <path d="m100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102v-133.176z"/>
                                    <path d="m189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075z"/>
                                    <path d="m322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075z"/>
                                    <path d="m370.005 322.784 89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076z"/>
                                </g>
                                <g fill="#d80027">
                                    <path d="m509.833 222.609h-220.44-.001v-220.442c-10.931-1.423-22.075-2.167-33.392-2.167-11.319 0-22.461.744-33.391 2.167v220.44.001h-220.442c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319.744 22.461 2.167 33.391h220.44.001v220.442c10.931 1.423 22.073 2.167 33.392 2.167 11.317 0 22.461-.743 33.391-2.167v-220.44-.001h220.442c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-.744-22.461-2.167-33.391z"/>
                                    <path d="m322.783 322.784 114.236 114.236c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482z"/>
                                    <path d="m189.217 322.784h-.002l-114.235 114.235c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804z"/>
                                    <path d="m189.217 189.219v-.002l-114.236-114.237c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803h31.481z"/>
                                    <path d="m322.783 189.219 114.237-114.238c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803z"/>
                                </g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/>
                            </svg> 
                        )}
                        <img
                            src={arrow}
                            alt="arrow"
                            className="cursor-pointer object-cover"
                        />
                    </div>

                    <div 
                        className={`
                            absolute top-10 left-0 md:group-hover:flex flex-col bg-white border border-gray-300 rounded-lg shadow-md z-50
                            ${isClicked ? 'flex' : 'hidden'} md:hidden
                        `}
                    >
                        <button 
                            className="px-4 py-2 hover:bg-gray-100" 
                            onClick={() => changeLanguage("vi")}
                        >
                            <div className="flex items-center">
                                <svg 
                                    className="w-5 h-5 cursor-pointer"
                                    enableBackground="new 0 0 512 512" 
                                    viewBox="0 0 512 512" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle 
                                        cx="256" 
                                        cy="256" 
                                        fill="#d80027" 
                                        r="256"
                                    />
                                    <path 
                                        d="m256 133.565 27.628 85.029h89.405l-72.331 52.55 27.628 85.03-72.33-52.551-72.33 52.551 27.628-85.03-72.33-52.55h89.404z" 
                                        fill="#ffda44"
                                    />
                                    <g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/>
                                </svg>
                                <p className="ml-2">VN</p>
                            </div>
                        </button>
                        <button 
                            className="px-4 py-2 hover:bg-gray-100 text-left" 
                            onClick={() => changeLanguage("en")}
                        >
                            <div className="flex items-center">
                                <svg 
                                    className="w-5 h-5 cursor-pointer" 
                                    enableBackground="new 0 0 512 512" 
                                    viewBox="0 0 512 512" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                        <circle 
                                            cx="256" 
                                            cy="256" 
                                            fill="#f0f0f0" 
                                            r="256"
                                        />
                                        <g fill="#0052b4">
                                            <path d="m52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178z"/>
                                            <path d="m503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076z"/>
                                            <path d="m8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075z"/>
                                            <path d="m411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177z"/>
                                            <path d="m100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102v-133.176z"/>
                                            <path d="m189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075z"/>
                                            <path d="m322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075z"/>
                                            <path d="m370.005 322.784 89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076z"/>
                                        </g>
                                        <g fill="#d80027">
                                            <path d="m509.833 222.609h-220.44-.001v-220.442c-10.931-1.423-22.075-2.167-33.392-2.167-11.319 0-22.461.744-33.391 2.167v220.44.001h-220.442c-1.423 10.931-2.167 22.075-2.167 33.392 0 11.319.744 22.461 2.167 33.391h220.44.001v220.442c10.931 1.423 22.073 2.167 33.392 2.167 11.317 0 22.461-.743 33.391-2.167v-220.44-.001h220.442c1.423-10.931 2.167-22.073 2.167-33.392 0-11.317-.744-22.461-2.167-33.391z"/>
                                            <path d="m322.783 322.784 114.236 114.236c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482z"/>
                                            <path d="m189.217 322.784h-.002l-114.235 114.235c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804z"/>
                                            <path d="m189.217 189.219v-.002l-114.236-114.237c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803h31.481z"/>
                                            <path d="m322.783 189.219 114.237-114.238c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803z"/>
                                        </g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/>
                                    </svg> 
                                <p className="ml-2">EN</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Nav;