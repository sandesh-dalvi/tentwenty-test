import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronsLeftRight } from "lucide-react";

import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.jpg";
import card5 from "../assets/card5.jpg";

const cards = [
  {
    title: "Flora Delight",
    desc: "There's always something happening at Flower Exchange",
    image: card1,
    started: "2017",
    product: "New Products",
  },
  {
    title: "Uhuru",
    desc: "There's always something happening at Flower Exchange",
    image: card2,
    started: "2017",
    product: "New Products",
  },
  {
    title: "Flora Delight",
    desc: "There's always something happening at Flower Exchange",
    image: card3,
    started: "2017",
    product: "New Products",
  },
  {
    title: "Uhuru",
    desc: "There's always something happening at Flower Exchange",
    image: card4,
    started: "2017",
    product: "New Products",
  },
  {
    title: "Flora Delight",
    desc: "There's always something happening at Flower Exchange",
    image: card5,
    started: "2017",
    product: "New Products",
  },
];

const ImageCardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const containerRef = useRef(null);

  // Handle mouse movement for custom cursor
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Simplified drag handlers
  const handleDragStart = (e) => {
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
      const offset = clientX - startX;
      setDragOffset(offset);

      // Update mouse position for cursor
      if (e.type === "mousemove") {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [isDragging, startX]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setDragOffset(0);
  }, [isDragging, dragOffset, currentIndex]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const cleanup = () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };

    if (isDragging) {
      const handleGlobalMove = (e) => handleDragMove(e);
      const handleGlobalEnd = () => handleDragEnd();

      document.addEventListener("mousemove", handleGlobalMove);
      document.addEventListener("mouseup", handleGlobalEnd);
      document.addEventListener("touchmove", handleGlobalMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleGlobalEnd);

      return () => {
        cleanup();
        document.removeEventListener("mousemove", handleGlobalMove);
        document.removeEventListener("mouseup", handleGlobalEnd);
        document.removeEventListener("touchmove", handleGlobalMove);
        document.removeEventListener("touchend", handleGlobalEnd);
      };
    }

    return cleanup;
  }, [
    isDragging,
    handleMouseMove,
    handleMouseLeave,
    handleDragMove,
    handleDragEnd,
  ]);

  return (
    <div
      className=" relative w-full h-screen overflow-hidden cursor-none"
      ref={containerRef}
    >
      {/* Cursor */}
      {isHovering && (
        <div
          className=" fixed pointer-events-none z-50 w-12 h-12 rounded-full backdrop-invert flex items-center justify-center transition-transform duration-150 ease-out"
          style={{
            left: mousePos.x - 24,
            top: mousePos.y - 24,
            transform: isDragging ? "scale(1.2)" : "scale(1)",
            mixBlendMode: "difference",
          }}
        >
          <ChevronsLeftRight className=" w-6 h-6 text-white" />
        </div>
      )}

      {/* Card Slider */}
      <div className=" flex items-center justify-center h-full w-full">
        <div
          className="h-full flex items-center justify-center gap-10 md:gap-18 lg:gap-30"
          style={{
            transform: `translateX(${dragOffset * 0.5}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {cards.map((card, index) => {
            const isCenter = index === currentIndex;
            const isLeft = index === currentIndex - 1;
            const isRight = index === currentIndex + 1;
            const isVisible = isCenter || isLeft || isRight;

            if (!isVisible) return null;

            let transform = "";
            let zIndex = 1;

            if (isCenter) {
              transform = "rotateZ(0deg)";
              zIndex = 3;
            } else if (isLeft) {
              transform = "rotateZ(-15deg)";
              zIndex = 2;
            } else if (isRight) {
              transform = "rotateZ(15deg)";
              zIndex = 2;
            }

            // Add drag effect
            if (isDragging && isCenter) {
              transform += ` translateX(${dragOffset * 0.1}px)`;
            }

            return (
              <div
                key={index}
                className={` w-[150px] h-[200px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:h-[400px] transition-all duration-700 ease-out  active:cursor-grabbing relative shrink-0 ${
                  isCenter ? "top-0" : "top-[3%] md:top-[5%] lg:top-[6%]"
                } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{
                  transform: `perspective(1000px) ${transform}`,
                  transformStyle: "preserve-3d",
                  zIndex: zIndex,
                }}
              >
                <div className=" h-full flex justify-center items-center">
                  <img
                    src={card.image}
                    alt={card.title}
                    className=" w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Card overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-8 pb-12 ">
        <div
          className=" text-center text-black animate-fade-in-up"
          style={{ animation: "fadeInUp 0.8s ease-out forwards" }}
          key={currentIndex} //force re-render for animation
        >
          <h4 className=" text-sm">Started in {cards[currentIndex].started}</h4>
          <h3 className=" text-lg lg:text-xl">{cards[currentIndex].title}</h3>
          <p className=" text-sm lg:text-base text-[#7A7777]">
            {cards[currentIndex].desc}
          </p>
          <p className=" text-sm lg:text-base text-[#7A7777]">
            {cards[currentIndex].product}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCardSlider;
