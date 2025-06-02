import type { StepsProps } from "antd";
import { Popover } from "antd";
import type { TFunction } from "i18next";

export const customDot: StepsProps["progressDot"] = (dot, { status }) => {
    const isActive = status === "process";

    return (
      // <Popover content={<span>Status: {status}</span>}>
      <Popover>
        <div
          className={`inline-block transition-transform duration-300 ${
            isActive ? "scale-140 pt-1" : "scale-100"
          }`}
        >
          <div className="w-[14px] h-[14px] -mt-1.5 -ml-0.5">
            {dot}
          </div>
        </div>
      </Popover>
    );
  };

  export const getStepItems = (t: TFunction): StepsProps["items"] => [
    { title: t("steps.step1"), description: "" },
    { title: t("steps.step2"), description: "" },
    { title: t("steps.step3"), description: "" },
    { title: t("steps.step4"), description: "" },
    { title: t("steps.step5"), description: "" },
  ];