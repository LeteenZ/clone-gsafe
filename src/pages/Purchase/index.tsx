import { FormProvider } from './Form Context';
import MultiStepForm from './MultiStepForm';

const Purchase = () => {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
}

export default Purchase;
