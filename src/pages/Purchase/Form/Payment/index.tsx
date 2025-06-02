import { Checkbox, Form, message, notification, Radio, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useFormContext } from "../../Form Context";
import { useTranslation } from "react-i18next";
import ScrollToTop from "../../../../hooks/ScrollToTop";
import { Card, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { MONEY } from "../../../../constants/payment";
import { mainOptions } from "../../../../data/Services";

const OrderPayment = () => {
    const { t } = useTranslation('purchase');
    const [form] = Form.useForm();
    const { formData, updateFormData, setCurrentStep } = useFormContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState();
    const navigate = useNavigate();

    const [isAgreed1, setIsAgreed1] = useState(false);
    const [isAgreed2, setIsAgreed2] = useState(false);
    const [orderItems, setOrderItems] = useState<Array<{
        siteName: string;
        deviceCount: string;
        packageName: string;
        price: string;
    }>>([]);

    const totalAmount = useMemo(() => {
        return orderItems.reduce((total, item) => {
            const devicePrice = MONEY.DEVICE;
            const deviceCount = parseInt(item.deviceCount) || 0;
            const packagePrice = parseFloat(item.price.split(' ')[0].replace(/\./g, '')) || 0;
            let months = 0;
            const slashParts = item.price.split('/');
            if (slashParts.length > 1) {
                const match = slashParts[1].match(/\d+/);
                if (match) months = parseInt(match[0]);
            }

            const extraDevices = Math.max(deviceCount - 1, 0);
            return total + (devicePrice * deviceCount) + packagePrice + (MONEY.EXTRA * months * extraDevices);
        }, 0);
    }, [orderItems]);
    const vatAmount = useMemo(() => {
        return isAgreed1 ? 0 : totalAmount * 0.1;
    }, [totalAmount, isAgreed1]);
    const grandTotal = useMemo(() => {
        return totalAmount + vatAmount;
    }, [totalAmount, vatAmount]);
    
    useEffect(() => {
        if (formData?.fm1) {
            form.setFieldsValue({
                tenToChuc: formData.fm1.tenToChuc || '',
                soDienThoai: formData.fm1.soDienThoai || '',
                diaChi: formData.fm1.diaChi || '',
                email: formData.fm1.email || '',
                maSoThue: formData.fm1.maSoThue || '',
                nguoiDaiDien: formData.fm1.nguoiDaiDien || '',
                linhVucNganhNghe: formData.fm1.linhVucNganhNghe || 'none'
            });
            if (formData?.fm2 && formData?.fm3) {
                const items = Object.entries(formData.fm2).map(([siteKey, siteData]) => {
                    const packageInfo = formData.fm3[siteKey as keyof typeof formData.fm3];
                    return {
                        siteName: siteData.tenCoSo,
                        deviceCount: siteData.soThietBi,
                        packageName: mainOptions(t).find(option => option.key === packageInfo.mainOption)?.label || '',
                        price: packageInfo.priceOption
                    };
                });
                setOrderItems(items);
            }
        }
    }, [formData, form]);

    const prev = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    
    const handleFinish = () => {
        navigate('/');
    };
    
    const handlePayment = async () => {
        if(isAgreed2){
            try {
                const values = await form.validateFields();
                setIsProcessing(true);
                const paymentData = {
                    ...values,
                    orderItems,
                    totalAmount,
                    vatAmount,
                    grandTotal,
                    paymentMethod,
                    paymentDate: new Date().toISOString()
                };
        
                if (paymentMethod === 'tratruoc') {
                    setTimeout(() => {
                        setIsProcessing(false);
                        notification.success({
                            message: (
                                <div className="relative pr-8">
                                    <p className="text-lg font-semibold text-left">{t("form.form5.message.success1")}</p>
                                    <p className="text-left">{t("form.form5.message.success2")}</p>
                                </div>
                            ),
                            className: 'custom-message',
                            icon: (
                            <div className="mt-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center md:mt-0.5 sm:mt-0.5">
                                <svg
                                  className="w-3.5 h-3.5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ),
                        });
                        setIsAgreed2(false);
                        setTimeout(() => {
                            navigate('/');
                        }, 5000);
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setIsProcessing(false);
                        notification.success({
                            message: (
                                <div className="relative pr-8">
                                    <p className="text-lg font-semibold text-left">{t("form.form5.message.success1")}</p>
                                    <p className="text-left">{t("form.form5.message.success2")}</p>
                                </div>
                            ),
                            className: 'custom-message',
                            duration: 5,
                            icon: (
                            <div className="mt-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center md:mt-0.5 sm:mt-0.5">
                                <svg
                                  className="w-3.5 h-3.5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ),
                        });
                        setIsAgreed2(false);
                        setIsComplete(true);
                        setTimeout(() => {
                            navigate('/');
                        }, 5000);
                    }, 2000);
                }
              } catch (error) {
                console.error('Validation failed:', error);
                setIsProcessing(false);
              }
        }
    }
    
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={formData}
            autoComplete="on"
        >
            <ScrollToTop />
            <div className="flex flex-1 flex-col gap-3 lg:flex-row">
                <Card
                    className="!bg-sky-50 flex-1"
                >
                    <div className="mx-auto">
                        <p className="mb-5 text-center text-xl font-semibold">{t("form.form5.panel1.tittle")}</p>
                        <div className="flex flex-col gap-3">
                            {orderItems.map((item, index) => (
                                <div key={index}>
                                    <p className="text-lg font-semibold  text-[#0267ab]">{index + 1}:</p>
                                    <div className="flex justify-between gap-4 border-b border-solid border-gray-300 py-2">
                                        <span className="flex-1 font-semibold text-neutral-700">
                                            {t("form.form5.panel1.des1")}
                                            &nbsp;(x&nbsp;{item.deviceCount} {t("form.form5.panel1.des11")})
                                        </span>
                                        <span className="font-semibold text-neutral-700">
                                            {(
                                                parseFloat(MONEY.DEVICE.toString()) * 
                                                (parseInt(item.deviceCount) || 0)
                                            ).toLocaleString('vi-VN')} 
                                            &nbsp;{t("form.form5.panel1.des31")}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-4 border-b border-solid border-gray-300 py-2">
                                        <span className="flex-1 font-semibold text-neutral-700">
                                            {item.packageName}
                                            &nbsp;({item.price.split('/')[1].trim()})
                                        </span>
                                        <span className="font-semibold text-neutral-700">
                                            {item.price.split(' ')[0]}
                                            &nbsp;{t("form.form5.panel1.des31")}
                                        </span>
                                    </div>
                                    {parseInt(item.deviceCount) > 1 && (
                                        <div className="flex justify-between gap-4 border-b border-solid border-gray-300 py-2">
                                            <span className="flex-1 font-semibold text-neutral-700">
                                                {t("form.form5.panel1.des2")}
                                                &nbsp;({parseInt(item.deviceCount) -1} {t("form.form5.panel1.des21")} x {item.price.split('/')[1].trim().split(' ')[0]} {t("form.form5.panel1.des22")})
                                            </span>
                                            <span className="font-semibold text-neutral-700">
                                                {(
                                                    parseFloat(MONEY.EXTRA.toString()) * 
                                                    (parseInt(item.deviceCount) - 1 || 0) * 
                                                    parseInt(item.price.split('/')[1].trim().split(' ')[0])
                                                ).toLocaleString('vi-VN')} 
                                                &nbsp;{t("form.form5.panel1.des31")}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between gap-4 py-2">
                                        <span className="flex-1 font-semibold text-neutral-700">
                                            {t("form.form5.panel1.des3")}
                                        </span>
                                        <span className="font-semibold text-neutral-700">
                                            {(
                                                parseFloat(MONEY.DEVICE.toString()) * 
                                                (parseInt(item.deviceCount) || 0) + 
                                                parseFloat(item.price.split(' ')[0].replace(/\./g, '')) + 
                                                parseFloat(MONEY.EXTRA.toString()) * 
                                                parseInt(item.price.split('/')[1].trim().split(' ')[0]) * 
                                                (parseInt(item.deviceCount) - 1 || 0)
                                            ).toLocaleString('vi-VN')} 
                                            &nbsp;{t("form.form5.panel1.des31")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {orderItems.length > 1 && (<div className="mt-5 flex justify-between gap-4 border-b border-solid border-gray-300 py-2">
                            <span className="flex-1 font-semibold text-neutral-700">
                                {t("form.form5.panel1.des4")}
                            </span>
                            <span className="font-semibold text-neutral-700">
                                {totalAmount.toLocaleString('vi-VN')}
                                &nbsp;{t("form.form5.panel1.des31")}
                            </span>
                        </div>)}
                        <div className="my-3 flex justify-between gap-4">
                            <span className="flex-1 font-semibold text-neutral-700">
                                {t("form.form5.panel1.des41")}
                            </span>
                            <span className="font-semibold text-neutral-700">
                                {isAgreed1 ? 0 : vatAmount.toLocaleString('vi-VN')} 
                                &nbsp;{t("form.form5.panel1.des31")}
                            </span>
                        </div>
                        <Checkbox 
                            checked={isAgreed1}
                            onChange={(e) => setIsAgreed1(e.target.checked)}
                            className="flex md:col-span-2"
                        >
                            {t("form.form5.panel1.para1")} <span className="text-red-500">{t("form.form5.panel1.para2")}</span> {t("form.form5.panel1.para3")}
                        </Checkbox>
                        <div className="mt-5 flex items-center justify-between gap-4 border-t border-solid border-[#0267ab] pt-2">
                            <span className="flex-1 text-lg font-semibold text-[#0267ab]">
                                {t("form.form5.panel1.des5")}
                            </span>
                            <span className="text-lg font-semibold text-[#0267ab]">
                                {grandTotal.toLocaleString('vi-VN')}
                                &nbsp;{t("form.form5.panel1.des31")}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card
                    className="!bg-sky-50 flex-1"
                >
                    <div className="mx-auto">
                        <p className="pb-5 text-center text-xl font-semibold">{t("form.form5.panel2.tittle")}</p>
                        <div className="mx-2 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            <Form.Item
                                label={t("form.form5.panel2.field1")}
                                name="tenToChuc"
                                rules={[{ required: true, message: t("alerts.form5.alert1") }]}
                            >
                                <Input placeholder={t("form.form5.panel2.plhr1")} />
                            </Form.Item>

                            <Form.Item
                                label={t("form.form5.panel2.field2")}
                                name="soDienThoai"
                                validateTrigger="onChange"
                                rules={[
                                    { required: true, message: t("alerts.form5.alert2") },
                                    {
                                        pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                        message: t("alerts.form5.alert21"),
                                    },
                                ]}
                            >
                                <Input placeholder={t("form.form5.panel2.plhr2")} />
                            </Form.Item>

                            <Form.Item
                                label={t("form.form5.panel2.field3")}
                                name="diaChi"
                                rules={[{ required: true, message: t("alerts.form5.alert3") }]}
                            >
                                <Input placeholder={t("form.form5.panel2.plhr3")} />
                            </Form.Item>

                            <Form.Item
                                label={t("form.form5.panel2.field4")}
                                name="email"
                                validateTrigger="onChange"
                                rules={[
                                    { required: true, message: t("alerts.form5.alert4") },
                                    {
                                        type: "email",
                                        message: t("alerts.form5.alert41"),
                                    },
                                ]}
                            >
                                <Input placeholder={t("form.form5.panel2.plhr4")} />
                            </Form.Item>


                            <Form.Item
                                label={t("form.form5.panel2.field5")}
                                name="maSoThue"
                                validateTrigger="onChange"
                                rules={[
                                    { required: true, message: t("alerts.form5.alert5") },
                                    {
                                        pattern: /^\d{10}(-\d{3})?$/,
                                        message: t("alerts.form5.alert51"),
                                    },
                                ]}
                            >
                                <Input placeholder={t("form.form5.panel2.plhr5")} />
                            </Form.Item>

                            <Form.Item
                                label={t("form.form5.panel2.field6")}
                                name="phuongThucThanhToan"
                                rules={[{ required: true, message: t("alerts.form5.alert6") }]}
                            >
                                <Radio.Group
                                    value={paymentMethod} 
                                    onChange={(e) => {
                                        const selected = e.target.value;
                                        setPaymentMethod(selected);
                                    }}
                                >
                                    <Radio value="tratruoc">{t("form.form5.panel2.choice1")}</Radio>
                                    <Radio value="trasau">{t("form.form5.panel2.choice2")}</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <Checkbox 
                            checked={isAgreed2}
                            onChange={(e) => setIsAgreed2(e.target.checked)}
                            className="flex md:col-span-2"
                        >
                            {t("form.form5.panel2.para1")} <Link to="/assets/doccuments/term-and-conditions.pdf" target="_blank">{t("form.form5.panel2.para2")}</Link>
                        </Checkbox>

                        <div className="mt-6 flex gap-2">
                            <button
                                className={`
                                    h-12 flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6
                                    ${!isAgreed2 ? 'bg-[#cad0d6] text-[#a8aeb6]' : 'border-2 bg-[#0266ad] border-[#0266ad] hover:bg-white hover:text-[#0266ad] hover:border-[#0266ad] text-white cursor-pointer'}
                                `}
                                onClick={handlePayment}
                                disabled={!isAgreed2}
                            >
                                <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
                                    <p>{t("controls.cn6")}</p>
                                    {isProcessing && (
                                            <Spin 
                                                indicator={
                                                        <LoadingOutlined 
                                                            spin
                                                            onMouseOver={(e) => e.currentTarget.style.color = '#0267ab'}
                                                            onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
                                                        />
                                                }
                                                size="large"
                                            />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-between pt-10">
                <button
                    className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 cursor-pointer"
                    onClick={prev}
                    disabled={isComplete}
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
                    className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-slate-600 hover:text-white hover:bg-[#0266ad] h-10 cursor-pointer"
                    onClick={handleFinish}
                    
                >
                    <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
                        <p>{t("controls.cn7")}</p>
                    </div>
                </button>
            </div>
        </Form>
    );
};

export default OrderPayment;