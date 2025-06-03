import { Steps } from 'antd';
import { useFormContext } from '../Form Context';
import CustomerInformation from '../Form/Customer info';
import SiteInformation from '../Form/Locale info';
import { useTranslation } from 'react-i18next';
import { customDot, getStepItems } from '../../../data/StepProps';
import ServicePackageAndCycle from '../Form/Services and period';
import ServiceUsageRegistration from '../Form/Register service info';
import OrderPayment from '../Form/Payment';

const MultiStepForm = () => {
  const { t } = useTranslation('purchase');
  const { currentStep = 0 } = useFormContext();

  const steps = [
    { title: t("steps.step1"), content: <CustomerInformation /> },
    { title: t("steps.step2"), content: <SiteInformation /> },
    { title: t("steps.step3"), content: <ServicePackageAndCycle /> },
    { title: t("steps.step4"), content: <ServiceUsageRegistration /> },
    { title: t("steps.step5"), content: <OrderPayment /> },
  ];

  const safeCurrentStep = Math.min(Math.max(0, currentStep), steps.length - 1);
  const currentStepContent = steps[safeCurrentStep]?.content || null;

  return (
    <>
      <div className="mt-16 min-h-[70vh] w-full xl:mt-[76px]">
            <div className="bg-sky-100 p-10 text-center text-4xl font-bold">
                {t("tittle")}
            </div>
            <div className="mx-auto my-5 max-w-screen-xl p-5">
                <div className="">
                    <Steps
                        current={safeCurrentStep}
                        progressDot={customDot}
                        items={getStepItems(t)}
                        className="mb-8"
                    />
                </div>
                <div className="mt-5 p-5">
                    {currentStepContent}
                </div>
            </div>
      </div>
    </>
  );
};

export default MultiStepForm;
