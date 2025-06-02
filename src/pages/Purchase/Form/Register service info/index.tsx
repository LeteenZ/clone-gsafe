import { Card, Form, Input, Radio, message } from 'antd';
import { useFormContext } from '../../Form Context';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import ScrollToTop from '../../../../hooks/ScrollToTop';

interface User {
  name: string;
  phone: string;
}

interface SiteData2 {
  key: string;
  users: User[];
  mainOption?: string;
  priceOption?: string;
}
  
interface FormValues2 {
    sites: SiteData2[];
}

const ServiceUsageRegistration = () => {
  const { t } = useTranslation('purchase');
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [form] = Form.useForm<FormValues2>();
  const [sites, setSites] = useState<SiteData2[]>([]);

  useEffect(() => {
    if (formData?.fm3) {
      try {
        const sitesArray = Object.values(formData.fm3);
        setSites(sitesArray);
        form.setFieldsValue({
          sites: sitesArray.map((site, idx) => ({
            key: `site-${idx}`,
            mainOption: site.mainOption,
            priceOption: site.priceOption,
            users: Array(2).fill({ name: '', phone: '' })
          }))
        });
      } catch (error) {
        console.error('Error initializing form data:', error);
      }
    }
  }, [formData, form, t]);

  const validateUniquePhone = (users: User[] = []) => {
    const phoneNumbers = users.map(u => u.phone).filter(Boolean);
    return new Set(phoneNumbers).size === phoneNumbers.length;
  };

  const validatePhoneNumberAcrossSites = (getFieldValue: any, t: any) => {
    return {
      validator(_: any, value: string) {
        if (!value) return Promise.resolve();
        
        const allSites = getFieldValue('sites') || [];
        let allPhoneNumbers: string[] = [];
        
        allSites.forEach((site: SiteData2) => {
          if (site?.users) {
            site.users.forEach(user => {
              if (user?.phone) {
                allPhoneNumbers.push(user.phone);
              }
            });
          }
        });
  
        const duplicateCount = allPhoneNumbers.filter(phone => phone === value).length;
        
        if (duplicateCount > 1) {
          return Promise.reject(new Error(t("alerts.form4.alert3")));
        }
        
        return Promise.resolve();
      }
    };
  };

  const getPhoneLimit = (mainOption: string): number => {
    const limits: Record<string, number> = {
      optionA: 5,
      optionB: 10,
      optionC: 5,
      optionD: 2
    };
    return limits[mainOption] || 2; // Default to 2 if mainOption is not found
  };

const handleFinish = useCallback((values: FormValues2) => {
  try {
    const formattedData = {
      fm4: values.sites.reduce((acc: any, site: any, index: number) => {
        const validUsers = site.users.filter((user: any) => 
          user?.name?.trim() && user?.phone?.trim()
        );
        
        return {
          ...acc,
          [`site${index + 1}`]: {
            mainOption: site.mainOption,
            priceOption: site.priceOption,
            users: validUsers
          }
        };
      }, {})
    };

    updateFormData({
      ...formData,
      ...formattedData
    });
    setCurrentStep(4);
  } catch (error) {
    console.error('Error in handleFinish:', error);
  }
}, [updateFormData, setCurrentStep, formData, t]);

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
            {fields.map(({ key, name, ...restField }, siteIndex) => (
              <Card
                key={key}
                title={
                  <span className="text-lg font-semibold text-[#0f68ad]">
                    {t("form.form4.tittle")} {siteIndex + 1}
                  </span>
                }
                className="!bg-sky-50"
              >
                <Form.List name={[name, 'users']}>
                  {(userFields, { add: addUser}) => (
                    <div className="space-y-4">
                      {userFields.map(({ key: userKey, name: userName, ...userRestField }, userIndex) => (
                        <div key={userKey} className="mx-auto relative group">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <Form.Item
                              {...userRestField}
                              label={`${t("form.form4.field1")} ${userIndex + 1}`}
                              name={[userName, 'name']}
                              rules={[
                                ...(userIndex < 2
                                  ? [{ required: true, message: t("alerts.form4.alert1") }]
                                  : []),
                              ]}
                            >
                              <Input placeholder={t("form.form4.plhr1")} />
                            </Form.Item>
      
                            <Form.Item
                              {...userRestField}
                              label={`${t("form.form4.field2")} ${userIndex + 1}`}
                              name={[userName, 'phone']}
                              rules={[
                                ...(userIndex < 2
                                  ? [{ required: true, message: t("alerts.form4.alert2") }]
                                  : []),
                                {
                                  pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                  message: t("alerts.form4.alert21"),
                                },
                                validatePhoneNumberAcrossSites(form.getFieldValue, t)
                              ]}
                            >
                              <Input placeholder={t("form.form4.plhr2")} />
                            </Form.Item>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        className={`
                          flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 text-white border border-[#0266ad] bg-[#0266ad] hover:text-[#0266ad] hover:bg-white hover:border-[#0266ad] h-10 cursor-pointer 
                          ${
                            userFields.length >= getPhoneLimit(form.getFieldValue(['sites', siteIndex, 'mainOption']))
                              ? 'hidden'
                              : 'block'
                          }`}
                        onClick={() => {
                          if (userFields.length < getPhoneLimit(form.getFieldValue(['sites', siteIndex, 'mainOption']))) {
                            addUser({ name: '', phone: '' });
                          }
                        }}
                        disabled={userFields.length >= getPhoneLimit(form.getFieldValue(['sites', siteIndex, 'mainOption']))}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        <p>{t("controls.cn5")}</p>
                      </button>
                    </div>
                  )}
                </Form.List>
              </Card>
            ))}
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
            <p>{t("controls.cn2")}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={next}
          className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
            <p>{t("controls.cn1")}</p>
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

export default ServiceUsageRegistration;