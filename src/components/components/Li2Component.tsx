import React from "react";
import type { Li2ComponentProps } from "../../types/Global";

const Li2Component: React.FC<Li2ComponentProps> = ({ text }) => {
    return (
      <div className="flex items-start gap-2">
        <div className="size-5 shrink-0">
          <div className="mt-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center md:mt-1 sm:mt-1">
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
        </div>
        <span className="pl-2 text-sm font-medium text-gray-800 sm:text-base md:text-lg">
          {text}
        </span>
      </div>
    );
  };
  
  export default Li2Component;