import { Form, Input } from 'antd';
import { useFormContext } from '../../Form Context';
import { useTranslation } from 'react-i18next';
import ScrollToTop from '../../../../hooks/ScrollToTop';

const CustomerInformation = () => {
    const { t } = useTranslation('purchase');
    const [form] = Form.useForm();
    const {currentStep, updateFormData, setCurrentStep } = useFormContext();

    const next = async () => {
        try {
            const values = await form.validateFields();
            updateFormData({ fm1: values }); 
            setCurrentStep((currentStep || 0) + 1);
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete="on"
        >
            <ScrollToTop />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item
                    label={t("form.form1.field1")}
                    name="tenToChuc"
                    rules={[{ required: true, message: t("alerts.form1.alert1") }]}
                >
                    <Input placeholder={t("form.form1.plhr1")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field2")}
                    name="maSoThue"
                    validateTrigger="onChange"
                    rules={[
                        { required: true, message: t("alerts.form1.alert2") },
                        {
                            pattern: /^\d{10}(-\d{3})?$/,
                            message: t("alerts.form1.alert21"),
                        },
                    ]}
                >
                    <Input placeholder={t("form.form1.plhr2")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field3")}
                    name="diaChi"
                    rules={[{ required: true, message: t("alerts.form1.alert3") }]}
                >
                    <Input placeholder={t("form.form1.plhr3")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field4")}
                    name="nguoiDaiDien"
                    rules={[{ required: true, message: t("alerts.form1.alert4") }]}
                >
                    <Input placeholder={t("form.form1.plhr4")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field5")}
                    name="email"
                    validateTrigger="onChange"
                    rules={[
                        { required: true, message: t("alerts.form1.alert5") },
                        {
                            type: "email",
                            message: t("alerts.form1.alert51"),
                        },
                    ]}
                >
                    <Input placeholder={t("form.form1.plhr5")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field6")}
                    name="soDienThoai"
                    validateTrigger="onChange"
                    rules={[
                        { required: true, message: t("alerts.form1.alert6") },
                        {
                            pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                            message: t("alerts.form1.alert61"),
                        },
                    ]}
                >
                    <Input placeholder={t("form.form1.plhr6")} />
                </Form.Item>

                <Form.Item
                    label={t("form.form1.field7")}
                    name="linhVucNganhNghiep"
                    className="md:col-span-2"
                >
                    <Input placeholder={t("form.form1.plhr7")} />
                </Form.Item>
            </div>

            <div className="flex justify-end pt-10">
                <button 
                    type="button"
                    className="flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.3)] bg-white text-[#475569] hover:text-white hover:bg-[#0266ad] h-10 cursor-pointer"
                    onClick={next}
                >
                    <div className="group flex items-center gap-2 text-sm font-medium md:text-base">
                        <p>{t("controls.cn1")}</p>
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
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </div>
                </button>
            </div>
        </Form>
    );
};

export default CustomerInformation;
