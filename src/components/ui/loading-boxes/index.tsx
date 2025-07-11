import React, { useState, useEffect } from "react";

// Data for quotes
const mockQuotes = [
  { label: "Believe in yourself.", author: "Anonymous" },
  { label: "Stay focused and never give up.", author: "John Doe" },
  { label: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
];

// Hook to auto increment index
const useAutoIncrementingIndex = (length: number, interval: number, isLoading: boolean) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isLoading, length, interval]);
  return index;
};

// Main loader component
const BoxesLoader = ({
  boxColor = "#5C8DF6",
  shadowColor = "#DBE3F4",
  duration = 800,
  size = "32px",
  desktopSize = "",
  mobileSize = "",
  isLoading = true,
  processMessages = [
    "Preparing your data...",
    "Removing filler words...",
    "Constructing your story...",
    "Finalizing the details...",
  ],
}) => {
  const sizePassed = parseFloat(desktopSize || size) * (window.innerWidth >= 1224 ? 2 : 1);
  const sizeBoxes = (sizePassed * 32) / 64;

  const darkenColor = (color: string, amount: number) => {
    // A simple function to darken the color using inline styles
    const darkenHex = (hex: string, amount: number) =>
      `#${hex
        .replace(/^#/, "")
        .replace(/../g, (hexPair) =>
          (
            "0" +
            Math.min(255, Math.max(0, parseInt(hexPair, 16) + amount)).toString(16)
          ).slice(-2)
        )}`;
    return darkenHex(color, amount);
  };

  const colors = {
    main: boxColor,
    right: darkenColor(boxColor, -40),
    left: darkenColor(boxColor, -20),
    shadow: shadowColor,
  };

  const animParams = [
    {
      start: [100, 100, 200],
      end: [0, 0, 0],
    },
    {
      start: [0, 0, 100],
      end: [100, 0, 0],
    },
    {
      start: [100, 100, 0],
      end: [100, 100, 100],
    },
    {
      start: [200, 200, 100],
      end: [0, 100, 100],
    },
  ];

  const boxTransforms = [
    [100, 0],
    [0, 100],
    [100, 100],
    [200, 0],
  ];

  const messageIndex = useAutoIncrementingIndex(
    processMessages.length,
    12000,
    isLoading
  );
  const quoteIndex = useAutoIncrementingIndex(
    mockQuotes.length,
    6000,
    isLoading
  );

  return (
    <div className="flex flex-col items-center gap-8 p-12 mt-10 bg-gray-100 rounded-xl shadow-lg max-w-lg mx-auto">
      <div
        className="relative w-96 h-96"
        style={{
          transform: "rotateX(60deg) rotateZ(45deg)",
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
          padding: "70px",
        }}
      >
        {boxTransforms.map((transform, index) => (
          <div
            key={index}
            className="absolute w-full h-full flex justify-center items-center text-white"
            style={{
              width: `${sizeBoxes}px`,
              height: `${sizeBoxes}px`,
              transform: `translate(${transform[0]}%, ${transform[1]}%)`,
              animation: `animBox-${index} ${duration}ms linear infinite`,
              backgroundColor: colors.main,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: colors.main,
                transform: `translateZ(${sizeBoxes / 2}px)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: colors.right,
                transform: `rotateY(90deg) translateZ(${sizeBoxes / 2}px)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: colors.left,
                transform: `rotateX(-90deg) translateZ(${sizeBoxes / 2}px)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: colors.shadow,
                transform: `translateZ(${-3 * sizeBoxes}px)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="text-xl text-gray-800 max-w-sm text-center p-5 bg-white rounded-lg shadow-md w-full">
        {processMessages[messageIndex]}
      </div>

      <div className="text-xl text-gray-800 max-w-sm text-center p-5 bg-white rounded-lg shadow-md w-full">
        <blockquote>{mockQuotes[quoteIndex].label || "Loading..."}</blockquote>
        <small>{mockQuotes[quoteIndex].author || ""}</small>
      </div>
    </div>
  );
};

export default BoxesLoader;
