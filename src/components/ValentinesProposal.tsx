import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 36 images
const images = [
  "/game-photos/1.jpg",
  "/game-photos/2.jpg",
  "/game-photos/3.jpg",
  "/game-photos/4.jpg",
  "/game-photos/5.jpg",
  "/game-photos/6.jpg",
  "/game-photos/7.jpg",
  "/game-photos/8.jpg",
  "/game-photos/9.jpg",
  "/game-photos/10.jpg",
  "/game-photos/11.jpg",
  "/game-photos/12.jpg",
  "/game-photos/13.jpg",
  "/game-photos/14.jpg",
  "/game-photos/15.jpg",
  "/game-photos/16.jpg",
  "/game-photos/17.jpg",
  "/game-photos/18.jpg",
  "/game-photos/19.jpg",
  "/game-photos/20.jpg",
  "/game-photos/21.jpg",
  "/game-photos/22.jpg",
  "/game-photos/23.jpg",
  "/game-photos/24.jpg",
  "/game-photos/25.jpg",
  "/game-photos/26.jpg",
  "/game-photos/27.jpg",
  "/game-photos/28.jpg",
  "/game-photos/29.jpg",
  "/game-photos/30.jpg",
  "/game-photos/31.jpg",
  "/game-photos/32.jpg",
  "/game-photos/33.jpg",
  "/game-photos/34.jpg",
  "/game-photos/35.jpg",
  "/game-photos/36.jpg",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2) {
      // Change step after 5 seconds
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  return (
    <div className="after game flex flex-col items-center justify-center h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
  className={`text-4xl font-semibold mb-4 ${playfairDisplay.className} proposal-text`}
>
  Congratulations My Love ! You have completed the game.
</motion.h2>
        )}
        {step === 1 && (
          <motion.h2
  key="step-1"
  className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
  style={{ color: "#ffffff" }}
>
  I have a surprise for you !
</motion.h2>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
  className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
  style={{ color: "#ffffff55" }} // lighter, softer pink
>
  Will you be my Valentine?
</h2>

            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />
            <div className="flex space-x-4 mt-10">
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleYesClick}
              >
                Yes, I will! ☺️
              </button>
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? {
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                      }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 🥺
              </button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
  <motion.div
    key="step-3"
    className={`fixed inset-0 z-10 flex flex-col justify-center items-center text-4xl font-semibold ${playfairDisplay.className}`}
    style={{
      backgroundColor: "#ffffff", // full white screen
      color: "#000000",           // black text
    }}
    transition={{ duration: 1 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    Thank you for accepting, I love you! ❤︎⁠
    <p className="text-sm mt-4">Forever yours, my Phia 𐙚⋆°｡⋆♡</p>
    <Image
      src="/hamster_jumping.gif"
      alt="Hamster Feliz"
      width={200}
      height={200}
      unoptimized
    />
  </motion.div>
)}

</AnimatePresence>

{/* 🔥 Fireworks always running and on top */}
{showFireworks && (
  <div className="fixed inset-0 z-20 pointer-events-none">
    <Fireworks
      options={{
        autoresize: true,
        opacity: 0.8,
        acceleration: 1.05,
        gravity: 1.5,
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  </div>
)}
    </div>
  );
}
