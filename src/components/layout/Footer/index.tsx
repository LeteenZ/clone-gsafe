import { useTranslation } from 'react-i18next';
import { linkData } from '../../../data/Link';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#0f68ad] text-white py-10 px-6">
      <div className="mx-auto px-5 max-w-screen-2xl ">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_1.5fr]">
          
          <div className="border-b pb-10 md:border-b-0 md:pb-0">
            <h4 className="mb-4 text-xl font-bold text-white">{t('footer.company.tittle')}</h4>
            <ul className="space-y-2 text-base font-medium text-white">
              {linkData.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.href} 
                    className="cursor-pointer hover:underline"
                    target={item.isblank ? "_blank" : "_self"}
                    rel={item.isblank ? "noreferrer" : ""}
                  >
                    {t(item.name)[0].toUpperCase() + t(item.name).slice(1).toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b pb-10 md:border-b-0 md:pb-0">
            <h4 className="mb-4 text-xl font-bold text-white">{t('footer.contact.tittle')}</h4>
            <ul className="space-y-2 text-base font-medium text-white">
              <li><p>{t('footer.contact.address')}</p></li>
              <li><p>{t('footer.contact.email')}</p></li>
              <li><p>{t('footer.contact.hotline')}</p></li>
              <li><p>{t('footer.contact.hotline1')}</p></li>
            </ul>
          </div>

          <div className="border-b pb-10 md:border-b-0 md:pb-0">
            <h4 className="mb-4 text-xl font-bold text-white">{t('footer.partner.tittle')}</h4>
            <ul className="space-y-2 text-base font-medium text-white">
              <li><p>{t('footer.partner.partner1')}</p></li>
              <li><p>{t('footer.partner.partner2')}</p></li>
              <li><p>{t('footer.partner.partner3')}</p></li>
              <li><p>{t('footer.partner.partner4')}</p></li>
              <li><p>{t('footer.partner.partner5')}</p></li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 md:flex-row lg:flex-col">
            <div className="w-[40%]">
              <a href="/lol" className="flex items-center justify-center cursor-pointer">
                <img
                  src="/assets/Logo GEIC white.png"
                  alt="Logo GEIC"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div className="w-[40%]">
              <img
                src="/assets/Group 5.png"
                alt="Group Logo"
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t-0 pt-6 text-base text-white md:flex-row md:justify-between md:border-t">
          <p className="font-medium hover:underline">{t('footer.policy')}</p>
          <p className="text-center text-sm font-semibold md:text-base">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
