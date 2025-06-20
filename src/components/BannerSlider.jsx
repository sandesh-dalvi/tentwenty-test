import { useEffect, useState } from "react";

const BannerSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const [showContent, setShowContent] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

  // text animation
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const completeTimer = setTimeout(() => {
      setTextAnimationComplete(true);
    }, 2000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  //   autoplay slides
  useEffect(() => {
    if (!isAnimating || !textAnimationComplete) return;

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setCurrentSlide((prev) => {
        if (prev === images.length - 1) return 0;
        return prev + 1;
      });
      // Reset animation after a brief delay
      setTimeout(() => setIsAnimating(true), 100);
    }, 5000); //5 seconds for border animation

    return () => clearTimeout(timer);
  }, [currentSlide, images.length, isAnimating, textAnimationComplete]);

  const handleNext = () => {
    setIsAnimating(false);

    // console.log(currentSlide);

    setCurrentSlide((prev) => {
      if (prev === images.length - 1) return 0;
      return prev + 1;
    });
    // Reset animation after a brief delay
    setTimeout(() => setIsAnimating(true), 100);
  };

  return (
    <div
      className={` w-full h-full absolute inset-0  bg-zinc-900 transition-all duration-500 ${
        textAnimationComplete ? "z-[0]" : "z-[70]"
      }`}
    >
      <div
        className={` w-full h-full overflow-hidden relative ${
          textAnimationComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* image  */}
        <div
          className={` absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out  animate-fade-in-up ${
            textAnimationComplete ? " opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={images[currentSlide]}
            alt="TenTwenty Farms"
            className={`w-full h-full object-cover transition-all duration-500 animate-fade-in-up`}
          />
        </div>
      </div>
      {/* Content Overlay */}
      <div className=" absolute top-[30%] left-12 text-white z-50">
        <h1
          className={` text-base md:text-lg font-light mb-4 opacity-0 ${
            showContent ? "text-slide-up" : ""
          }`}
        >
          Welcome to TenTwenty Farms
        </h1>
        <h2
          className={` text-4xl md:text-5xl max-w-sm opacity-0 ${
            showContent ? "text-slide-left" : ""
          }`}
        >
          From Our Farms To Your Hands
        </h2>
      </div>

      {/* Next Button */}
      <div
        className={` absolute bottom-12 left-12 flex justify-center items-center gap-8 text-white z-40 transition-opacity duration-500 ${
          textAnimationComplete ? " opacity-100" : "opacity-0"
        } `}
      >
        {/* Thumbnail animated button */}
        <div className=" flex justify-center cursor-pointer">
          <div className=" relative" onClick={handleNext}>
            <div className=" relative w-24 h-24 overflow-hidden border border-white hover:scale-105 transition-transform">
              <img
                src={
                  currentSlide === images.length - 1
                    ? images[0]
                    : images[currentSlide + 1]
                }
                className=" w-24 h-24 object-cover relative z-40 p-3"
                alt=""
              />
              <span className=" absolute inset-0 flex justify-center items-center w-full h-full z-40 text-white ">
                Next
              </span>
              {/* border animation */}
              <svg
                className=" absolute top-0 left-0 w-full h-full z-40"
                viewBox="0 0 96 96"
              >
                <rect
                  x="2"
                  y="2"
                  width="92"
                  height="92"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeDasharray="360"
                  strokeDashoffset="360"
                  className={
                    isAnimating && textAnimationComplete
                      ? " animate-stroke"
                      : ""
                  }
                />
              </svg>
            </div>
          </div>
        </div>
        {/*  */}
        <div className=" flex justify-center items-center gap-2">
          <span>0{currentSlide + 1}</span>
          <span className=" w-16 h-[2px] bg-white"></span>
          <span>0{images.length}</span>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
