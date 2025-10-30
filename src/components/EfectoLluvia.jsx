

function EfectoLluvia() {

    const notes = ["🎵", "🎶", "♩", "♪", "♬", "🎼"];


  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 25 }).map((_, i) => {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const left = Math.random() * 100;
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 5;
        const size = 1 + Math.random() * 1.5;

        return (
          <span
            key={i}
            className="absolute text-white opacity-80"
            style={{
              left: `${left}%`,
              top: `-5%`,
              fontSize: `${size}rem`,
              animation: `fall ${duration}s linear ${delay}s infinite`,
            }}
          >
            {note}
          </span>
        );
      })}

      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10%) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  )
}

export default EfectoLluvia
