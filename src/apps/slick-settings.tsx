export const slickSettings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 1500,
    arrows: false,
    touchMove: false,
    draggable: false,
    swipe: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
};