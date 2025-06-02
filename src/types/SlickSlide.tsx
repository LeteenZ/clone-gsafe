export type Sponsor = {
    id: string | number;
    name: string;
    image: string;
};

export type SliderProps = {
    people: Sponsor[];
};