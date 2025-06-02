import i18n from "i18next";
import { initReactI18next} from "react-i18next";
import home_en from '../locales/en/home-en.json';
import home_vi from '../locales/vi/home-vi.json';
import device_vi from '../locales/vi/device-vi.json';
import device_en from '../locales/en/device-en.json';
import purchase_en from '../locales/en/purchase-en.json';
import purchase_vi from '../locales/vi/purchase-vi.json';

const resources = {
    vi: {
        home: home_vi,
        device: device_vi,
        purchase: purchase_vi
    },
    en: {
        home: home_en,
        device: device_en,
        purchase: purchase_en
    }
}

const savedLang = localStorage.getItem('i18n-lang') || 'vi';

i18n.use(initReactI18next)
.init({
    resources,
    lng: savedLang,
    ns: ['home', 'device', 'purchase'],
    defaultNS: 'home',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false
    }
})

// export const defaultNS = 'home'
// export const locales = {
//     vi: 'Tiếng Việt',
//     en: 'English'
// } as const
export default i18n;