import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Song from "../assets/musica/music/Roses - Saint jhn.mp3";
import { PlayIcon, PauseIcon, VolumeIcon } from "../icons/icon.jsx";

export default function WavePlayer() {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ffffff",
      progressColor: "#F527EE",
      cursorColor: "transparent",
      height: 18,
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      responsive: true,
      normalize: true,
      fillParent: true,
    });

    ws.load(Song);

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));

    waveSurferRef.current = ws;

    return () => ws.destroy();
  }, []);

  const togglePlay = () => waveSurferRef.current?.playPause();

  const handleVolume = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    waveSurferRef.current?.setVolume(newVol);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-2 p-2 text-white">
      {/* Contenedor de ondas */}
      <div
        ref={containerRef}
        className="w-full max-w-3xl h-16 cursor-pointer"
      />

      {/* Controles */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => waveSurferRef.current?.skipBackward(5)}
          className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          ⏮
        </button>

        <button
          onClick={togglePlay}
          className="w-10 h-10 text-2xl hover:scale-110 transition-transform"
        >
          {isPlaying ? (
            <PauseIcon className="w-full h-full" />
          ) : (
            <PlayIcon className="w-full h-full" />
          )}
        </button>

        <button
          onClick={() => waveSurferRef.current?.skipForward(5)}
          className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          ⏭
        </button>

        <div className="flex items-center gap-2">
          <VolumeIcon className="w-5 h-5 text-white" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-24 accent-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
