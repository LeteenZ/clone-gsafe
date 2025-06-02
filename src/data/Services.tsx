import type { TFunction } from "i18next";

export const mainOptions = (t: TFunction) => [
    { key: 'optionA', label: t('form.form3.package1.des1') },
    { key: 'optionB', label: t('form.form3.package2.des1') },
    { key: 'optionC', label: t('form.form3.package3.des1') },
    { key: 'optionD', label: t('form.form3.package4.des1') },
];

export const subOptionsDsc = (t: TFunction) => {
    return {
        optionA: [t('form.form3.package1.des2'), t('form.form3.package1.des3'), t('form.form3.package1.des4'), t('form.form3.package1.des5'), t('form.form3.package1.des6')],
        optionB: [t('form.form3.package2.des2'), t('form.form3.package2.des3'), t('form.form3.package2.des4')],
        optionC: [t('form.form3.package3.des2'), t('form.form3.package3.des3'), t('form.form3.package3.des4')],
        optionD: [t('form.form3.package4.des2'), t('form.form3.package4.des3'), t('form.form3.package4.des4')],
    };
};

export const priceOptionsMap = (t: TFunction) => {
    return {
        optionA: [t('form.form3.prices.package1.price1'), t('form.form3.prices.package1.price2'), t('form.form3.prices.package1.price3')],
        optionB: [t('form.form3.prices.package2.price1'), t('form.form3.prices.package2.price2'), t('form.form3.prices.package2.price3')],
        optionC: [t('form.form3.prices.package3.price1'), t('form.form3.prices.package3.price2'), t('form.form3.prices.package3.price3')],
        optionD: [t('form.form3.prices.package4.price1'), t('form.form3.prices.package4.price2'), t('form.form3.prices.package4.price3')],
    };
};