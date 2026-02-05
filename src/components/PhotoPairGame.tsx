"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 18 images
const imagesList = [
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
];

const imagePairs = imagesList.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [hasPlayedMusic, setHasPlayedMusic] = useState(false);

  // 🔊 Volume state (0–1)
  const [volume, setVolume] = useState(0.6);

  // 🎵 Audio
  const [audio] = useState<HTMLAudioElement | null>(
    typeof Audio !== "undefined" ? new Audio("/background-music.mp3") : null
  );

  useEffect(() => {
    setImages(shuffleArray([...imagePairs]));

    if (audio) {
      audio.loop = true;
      audio.volume = 0; // start silent for fade-in
    }
  }, [audio]);

  // 🔊 Sync slider volume to audio
  useEffect(() => {
    if (audio && hasPlayedMusic) {
      audio.volume = volume;
    }
  }, [volume, audio, hasPlayedMusic]);

  // ▶️ Play music once with fade-in
  const playMusicOnce = () => {
    if (!audio || hasPlayedMusic) return;

    audio.play();
    setHasPlayedMusic(true);

    let current = 0;
    const fade = setInterval(() => {
      current += 0.02;
      if (current >= volume) {
        audio.volume = volume;
        clearInterval(fade);
      } else {
        audio.volume = current;
      }
    }, 100);
  };

  const handleClick = async (index: number) => {
    playMusicOnce();

    if (selected.length === 2 || matched.includes(index)) return;

    setSelected((prev) => [...prev, index]);

    if (selected.length === 1) {
      const firstIndex = selected[0];
      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000);
      }
      setTimeout(() => setSelected([]), 1000);
    }
  };

  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  const handleDevSkip = () => {
    playMusicOnce();
    handleShowProposal();
  };

  return (
    <>
      {/* 🔊 VOLUME CONTROL (overlay — layout untouched) */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 9999,
          background: "rgba(0,0,0,0.5)",
          padding: "8px 12px",
          borderRadius: 12,
        }}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>

      <div className="grid grid-cols-9 gap-2 relative">
        {/* Hidden DEV SKIP */}
        <button
          onClick={handleDevSkip}
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            opacity: 0,
            width: 40,
            height: 40,
            zIndex: 9999,
          }}
        />

        {/* Preload */}
        <div className="hidden">
          {images.map((image, i) => (
            <Image
              key={i}
              src={image}
              alt=""
              layout="fill"
              priority
            />
          ))}
        </div>

        {/* Heart grid */}
        {heartLayout.flat().map((index, i) =>
          index !== null ? (
            <motion.div
              key={i}
              className="w-20 h-20 relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleClick(index)}
              style={{ perspective: "1000px" }}
            >
              {!selected.includes(index) && !matched.includes(index) && (
                <motion.div
                  className="w-full h-full bg-gray-300 rounded-md absolute"
                  style={{ backfaceVisibility: "hidden" }}
                />
              )}

              {(selected.includes(index) || matched.includes(index)) && (
                <motion.div className="w-full h-full absolute">
                  <Image
                    src={images[index]}
                    alt=""
                    layout="fill"
                    className="rounded-md"
                  />
                </motion.div>
              )}

              {incorrect.includes(index) && (
                <div className="absolute inset-0 bg-red-500 rounded-md" />
              )}
            </motion.div>
          ) : (
            <div key={i} className="w-20 h-20" />
          )
        )}
      </div>
    </>
  );
}
