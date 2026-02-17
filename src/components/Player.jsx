import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PlayIcon, PauseIcon, VolumeIcon } from "../icons/icon.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useSongs } from "../context/SongsContext";

export default function Player() {
  const { currentSong, selectSong, songs } = useSongs();
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Definir la URL de audio compatible
  const audioUrl = currentSong ? (currentSong.url_cancion || currentSong.preview) : null;
  //  Definir metadatos compatibles
  const displayTitle = currentSong?.titulo || currentSong?.title;
  const displayArtist = currentSong?.artista || currentSong?.artist?.name;
  const displayImage = currentSong?.url_imagen || currentSong?.album?.cover_medium || currentSong?.imagenUrl;



  useEffect(() => {
    if (!containerRef.current) return;



    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ffffff",
      progressColor: "#F527EE",
      cursorColor: "#F527EE",
      height: 18,
      barWidth: 2,
      barGap: 1,
      barRadius: 1,
      responsive: true,
      normalize: true,
      fillParent: true,
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));

    waveSurferRef.current = ws;

    return () => ws.destroy();
  }, []);

  // Usar la URL de audio compatible
  useEffect(() => {
    if (audioUrl && waveSurferRef.current) {
      //  Se usa la variable compatible audioUrl
      waveSurferRef.current.load(audioUrl); 

      const ws = waveSurferRef.current;

      ws.once("ready", () => {
        ws.play();
        setIsPlaying(true); 
      });

      ws.on("finish", () => setIsPlaying(false));
    }
  }, [audioUrl]); 


  const playNextSong = () => {
    
  };


  const togglePlay = () => waveSurferRef.current?.playPause();

  const handleVolume = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    waveSurferRef.current?.setVolume(newVol);
  };


  return (
<div className="w-full h-full flex flex-col items-center justify-center gap-4 p-2 bg-gradient-to-l from-purple-950/40 to-black/40 text-white">
      {/* Contenedor de ondas */}
      <div
        ref={containerRef}
        className="w-200 h-8 bg-linear-to-b overflow-hidden cursor-pointer mt-5"
      />

      {/* Controles */}
      <div className="flex flex-row items-center justify-center gap-6 ">
        {currentSong ? (
          <img
            src={displayImage}
            alt={displayTitle || "Portada"} 
            className="w-14 h-14 rounded-lg border-2 border-fuchsia-700"
            onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/56"; }}
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-black border-2 border-gray-700 flex items-center justify-center text-gray-400">
            🎵
          </div>
        )}

        {currentSong && (
          <p className="text-white text-center hover:text-purple-400 hover:drop-shadow-lg hover:scale-105">
            Reproduciendo: {displayTitle} - {displayArtist}
          </p>
        )}
        

        <button
          onClick={() => {
            const ws = waveSurferRef.current;
            if (ws) ws.setTime(Math.max(0, ws.getCurrentTime() - 5));
          }}
          className="w-12 h-12 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40"
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>

        {/* play.pause*/}
        <button
          onClick={togglePlay}
          className="relative w-10 h-10 flex items-center justify-center bg-linear-to-br from-purple-600 via-violet-600 to-fuchsia-600 rounded-full shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/70 active:scale-95 group"
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isPlaying ? (
            <PauseIcon className="w-10 h-10 text-white" />
          ) : (
            <PlayIcon className="w-10 h-10 text-white" />
          )}
        </button>

        {/* adelantar */}
        <button
          onClick={playNextSong}
          className="w-12 h-12 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40"
        >
          <FontAwesomeIcon icon={faForward} />
        </button>

        <div className="flex items-center gap-2 ml-4">
          <VolumeIcon className="w-5 h-5 text-white" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-32 h-1 rounded-full accent-purple-600 cursor-pointer"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #d946ef ${
                volume * 100
              }%, rgba(88,28,135,0.3) ${
                volume * 100
              }%, rgba(88,28,135,0.3) 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}