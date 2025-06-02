import React, { createContext, useContext, useEffect, useState } from "react";

interface FormContextType {
  formData: Record<string, any>;
  updateFormData: (data: object) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<Record<string, object>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (data: object) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]); 

  return (
    <FormContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
