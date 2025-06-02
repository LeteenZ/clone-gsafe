import SlickSlider from 'react-slick';
import { slickSettings } from '../../apps/slick-settings';
import type { SliderProps } from '../../types/SlickSlide';

export const Slider = ({ people }: SliderProps) => {
  return (
    <div className="w-full max-w-full">
      <SlickSlider {...slickSettings}>
        {people.map((person) => (
            <div 
                key={person.id} 
                className="!flex !items-center !justify-center"
            >
                <img 
                    src={person.image} 
                    alt={person.name} 
                    className="object-contain max-w-full max-h-full"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        ))}
      </SlickSlider>
    </div>
  );
};
