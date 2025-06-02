import { Form, Radio, message } from 'antd';
import { useFormContext } from '../../Form Context';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { mainOptions, subOptionsDsc, priceOptionsMap } from '../../../../data/Services';
import ScrollToTop from '../../../../hooks/ScrollToTop';

interface SiteData {
  services: Record<string, any>;
  mainOption?: string;
  priceOption?: string;
}

interface FormValues {
  sites: SiteData[];
}

interface OptionType {
  key: string;
  label: string;
}

const ServicePackageAndCycle = () => {
  const { t } = useTranslation('purchase');
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [form] = Form.useForm<FormValues>();
  const [sites, setSites] = useState<SiteData[]>([]);

  const { mainOpts, priceOpts, subOptsDsc } = useMemo(() => ({
    mainOpts: mainOptions(t) as OptionType[],
    priceOpts: priceOptionsMap(t) as Record<string, string[]>,
    subOptsDsc: subOptionsDsc(t) as Record<string, string[]>
  }), [t]);

  useEffect(() => {
    if (formData?.fm2) {
      try {
        const sitesArray = Object.values(formData.fm2);
        setSites(sitesArray);
        form.setFieldsValue({
          sites: sitesArray.map((_, idx) => ({
            key: `site-${idx}`,
            services: {},
            mainOption: undefined,
            priceOption: undefined
          }))
        });
      } catch (error) {
        console.error('Error initializing form data:', error);
      }
    }
  }, [formData, form, t]);

  const handleFinish = useCallback((values: FormValues) => {
    try {
      const formattedData = {
        fm3: values.sites.reduce((acc, site, index) => {
          return {
            ...acc,
            [`site${index + 1}`]: {
              mainOption: site.mainOption,
              priceOption: site.priceOption
            }
          };
        }, {})
      };

      updateFormData({
        ...formData,
        ...formattedData
      });
      setCurrentStep(3);
    } catch (error) {
      console.error('Error in handleFinish:', error);
    }
  }, [updateFormData, setCurrentStep, formData]);

  const next = async () => {
    try {
      const values = await form.validateFields();
      await handleFinish(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderMainOptions = useCallback((mainOptionValue: string, name: number) => (
    <div className="flex flex-wrap gap-2">
      {mainOpts.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={mainOptionValue === key}
          className={`
            flex min-w-48 flex-1 cursor-pointer flex-col gap-2  
            rounded-xl border-2 border-solid p-5 duration-300 ease-out text-left bg-transparent
            ${mainOptionValue === key ? 'border-[#0267ad]' : ' hover:border-[#0267ad]/30 border-gray-200'}
          `}
          onClick={() =>
            form.setFieldsValue({
              sites: form.getFieldValue('sites').map((site: SiteData, i: number) =>
                i === name
                  ? { ...site, mainOption: key, priceOption: undefined }
                  : site
              ),
            })}
        >
            <p className='text-lg font-semibold text-[#0267ad]'>{label}</p>
            <div className='flex flex-col'>
                {subOptsDsc[key]?.slice(0, 3)
                    .map((item: string, idx: number) => (
                        <p key={idx}>
                            <span className="text-lg text-[#0267ad]">•  </span>
                            <span>{item}</span>
                        </p>
                    ))}

                {subOptsDsc[key]?.length > 3 && (
                    <p key="rest">
                        {subOptsDsc[key]?.slice(3).map((item: string, idx: number, array) => (
                            <span key={idx} className={idx === 0 ? 'font-bold text-red-500' : ''}>
                                {item}{idx < array.length - 1 ? ': ' : ''}
                            </span>
                        ))}
                    </p>
                )}
            </div>
        </button>
      ))}
    </div>
  ), [form, mainOpts, subOptsDsc]);

  const renderSiteFields = useCallback((fields: any[]) => {
    return fields.map(({ key, name, ...restField }) => {
      const mainOptionValue = form.getFieldValue(['sites', name, 'mainOption']);
      
      return (
        <div key={key}>
          <h2 className="text-lg font-semibold text-[#0f68ad]">
            {t("form.form3.tittle")} {name + 1}
          </h2>
          <div className='mt-2 flex flex-col rounded-xl !bg-sky-50 p-6'>
            <Form.Item
              {...restField}
              label={t('form.form3.label1')}
              name={[name, 'mainOption']}
              rules={[{ required: true, message: ''}]}
            >
              {renderMainOptions(mainOptionValue, name)}
            </Form.Item>

            <Form.Item
              {...restField}  
              label={t('form.form3.label2')}
              name={[name, 'priceOption']}
              rules={[
                { required: true, message: t('alerts.form3.alert1') },
              ]}
            >
              <Radio.Group block>
                {(priceOpts[mainOptionValue] || []).map((priceOpt: string) => (
                  <Radio key={priceOpt} value={priceOpt}>
                    {priceOpt}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
      );
    });
  }, [form, t, renderMainOptions, priceOpts]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onFinish={handleFinish}
      autoComplete="on"
    >
        <ScrollToTop />
      <Form.List name="sites">
        {(fields) => (
          <div className="my-5 flex flex-col gap-6">
            {renderSiteFields(fields)}
          </div>
        )}
      </Form.List>

      <div className="flex justify-between pt-10">
        <button
          type="button"
          onClick={prev}
          className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            <p>{t("controls.cn2") || 'Back'}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={next}
          className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
            <p>{t("controls.cn1") || 'Next'}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </button>
      </div>
    </Form>
  );
};

export default ServicePackageAndCycle;