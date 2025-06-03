import { DatePicker, Form, Input, Select } from 'antd';
import { useFormContext } from '../../Form Context';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import './index.css';
import { useState } from 'react';
import { useVietnamLocation } from '../../../../hooks/useVietnamLocation';
import ScrollToTop from '../../../../hooks/ScrollToTop';
import type { District, Ward } from '../../../../hooks/useVietnamLocation';

const SiteInformation = () => {
    const { t } = useTranslation('purchase');
    const [form] = Form.useForm();
    const { currentStep, formData, updateFormData, setCurrentStep } = useFormContext();
    const [removingKey, setRemovingKey] = useState<number | null>(null);

    const { provinces, error } = useVietnamLocation();
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const handleProvinceChange = (code: string, fieldName: string) => {
        const province = provinces.find(p => p.code === code);
        setDistricts(province?.districts || []);
        setWards([]);

        const fieldPath = fieldName.split('.');
        const siteIndex = fieldPath[1];
        form.setFieldsValue({
            sites: {
                [siteIndex]: {
                    huyen: undefined,
                    xaPhuongThiTran: undefined
                }
            }
        });
    };

    const handleDistrictChange = (code: string, fieldName: string) => {
        const district = districts.find((d: any) => d.code === code);
        setWards(district?.wards || []);
        const fieldPath = fieldName.split('.');
        const siteIndex = fieldPath[1];
        form.setFieldsValue({
            sites: {
                [siteIndex]: {
                    xaPhuongThiTran: undefined
                }
            }
        });
    };
    if (error) return <div>{error}</div>;

    const disablePastDates = (current: dayjs.Dayjs) => {
        return current && current < dayjs().startOf('day');
    };

    const validatePhoneNumber = (_: any, value: string) => {
        const formValues = form.getFieldsValue();
        const phoneNumbers = formValues.sites?.map((site: any) => site?.soDienThoai).filter(Boolean) || [];
        
        if (value && phoneNumbers.filter((phone: string) => phone === value).length > 1) {
            return Promise.reject(new Error(t('alerts.form2.alert22')));
        }
        
        return Promise.resolve();
    };

    const next = async () => {
        try {
            const values = await form.validateFields(); 
            const formattedData = {
                fm2: values.sites.reduce((acc: any, site: any, index: number) => {
                  acc[`site${index + 1}`] = site;
                  return acc;
                }, {})
              };
        
              updateFormData({
                ...formData,
                ...formattedData
              });
              setCurrentStep((currentStep || 0) + 1);
        } catch (error) {
            console.error('Error in handleFinish:', error);
        }
    };

    const prev = () => {
        setCurrentStep((currentStep || 1) - 1);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={formData}
            autoComplete="on"
        >
            <ScrollToTop />
            <Form.List name="sites" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                    <div className="my-5 flex flex-col gap-6">
                        {fields.map(({ key, name, ...restField }, index) => (
                            <div 
                                key={key} 
                                className={`transition-all ease-in-out ${
                                    removingKey === key ? 'slide-out-up' : 'slide-in-down'
                                  }`}
                            >
                                <div className="flex justify-between">
                                    <p className="text-lg font-semibold text-[#0f68ad]">{t("form.form2.tittle")} {index + 1}</p>
                                    {index > 0 && (
                                        <button
                                            className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-3 text-red-500 border border-red-500 bg-white hover:text-white hover:bg-red-500 cursor-pointer h-8"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setRemovingKey(key);
                                                setTimeout(() => {
                                                    remove(name);
                                                    setRemovingKey(null);
                                                }, 700);
                                            }}
                                        >
                                            <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    width="16" 
                                                    height="16" 
                                                    viewBox="0 0 24 24" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    aria-hidden="true"
                                                >
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                                <p>{t("controls.cn4")}</p>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                <div className="mt-2 rounded-xl !bg-sky-50 p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6">
                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field1")}
                                            name={[name, 'tenCoSo']}
                                            rules={[{ required: true, message: t("alerts.form2.alert1") }]}
                                            className="md:col-span-2"
                                        >
                                            <Input placeholder={t("form.form2.plhr1")} />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field2")}
                                            name={[name, 'soDienThoai']}
                                            rules={[
                                                { required: true, message: t("alerts.form2.alert2") },
                                                {
                                                    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                                    message: t("alerts.form2.alert21"),
                                                },
                                                {
                                                    validator: validatePhoneNumber,
                                                },
                                            ]}
                                            className="md:col-span-1"
                                        >
                                            <Input placeholder={t("form.form2.plhr2")} />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field3")}
                                            name={[name, 'ngayLapDat']}
                                            rules={[{ required: true, message: t("alerts.form2.alert3") }]}
                                            className="md:col-span-1"
                                        >
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                disabledDate={disablePastDates}
                                                placeholder={t("form.form2.plhr3")}
                                                className="w-full"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field4")}
                                            name={[name, 'tinhThanhPho']}
                                            rules={[{ required: true, message: t("alerts.form2.alert4") }]}
                                            className="md:col-span-1"
                                        >
                                            <Select
                                                placeholder={t("form.form2.plhr4")}
                                                onChange={(value) => handleProvinceChange(value, `sites.${name}.tinhThanhPho`)}
                                            >
                                                {provinces.map(p => (
                                                    <Select.Option key={p.code} value={p.code}>{p.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field5")}
                                            name={[name, 'huyen']}
                                            rules={[{ required: true, message: t("alerts.form2.alert5") }]}
                                            className="md:col-span-1"
                                        >
                                            <Select
                                                placeholder={t("form.form2.plhr5")}
                                                onChange={(value) => handleDistrictChange(value, `sites.${name}.huyen`)}
                                            >
                                                {districts.map(d => (
                                                    <Select.Option key={d.code} value={d.code}>{d.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field6")}
                                            name={[name, 'xaPhuongThiTran']}
                                            rules={[{ required: true, message: t("alerts.form2.alert6") }]}
                                            className="md:col-span-1"
                                        >
                                            <Select
                                                placeholder={t("form.form2.plhr6")}
                                            >
                                                {wards.map(w => (
                                                    <Select.Option key={w.code} value={w.code}>{w.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field7")}
                                            name={[name, 'duongPho']}
                                            rules={[{ required: true, message: t("alerts.form2.alert7") }]}
                                            className="md:col-span-1"
                                        >
                                            <Input placeholder={t("form.form2.plhr7")} />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field8")}
                                            name={[name, 'diaChiChiTiet']}
                                            rules={[{ required: true, message: t("alerts.form2.alert8") }]}
                                            className="md:col-span-2"
                                        >
                                            <Input placeholder={t("form.form2.plhr8")} />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label={t("form.form2.field9")}
                                            name={[name, 'soThietBi']}
                                            rules={[{ required: true, message: t("alerts.form2.alert9") }]}
                                            className="md:col-span-2"
                                        >
                                            <Input placeholder={t("form.form2.plhr9")} type="number" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 text-white border border-[#0266ad] bg-[#0266ad] hover:text-[#0266ad] hover:bg-white hover:border-[#0266ad] h-10 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                add();
                            }}
                        >
                            <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
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
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                <p>{t("controls.cn3")}</p>
                            </div>
                        </button>
                    </div>
                )}
            </Form.List>

            <div className="flex justify-between pt-10">
                <button
                    className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 cursor-pointer"
                    onClick={prev}
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
                    className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 cursor-pointer"
                    onClick={next}
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

export default SiteInformation;
