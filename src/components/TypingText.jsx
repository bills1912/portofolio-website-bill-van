import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const TypingText = ({ data, delay = 50 }) => {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (segmentIndex >= data.length) return;

    const currentSegment = data[segmentIndex];
    
    const timeout = setTimeout(() => {
      if (charIndex < currentSegment.text.length) {
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setSegmentIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 100); 
      }
    }, delay + (Math.random() * 20));

    return () => clearTimeout(timeout);
  }, [segmentIndex, charIndex, data, delay]);

  return (
    <span className="inline-block break-words">
      {data.map((segment, index) => {
        let textToShow = "";
        
        if (index < segmentIndex) {
          textToShow = segment.text;
        } else if (index === segmentIndex) {
          textToShow = segment.text.slice(0, charIndex);
        } else {
          return null;
        }

        const isCompleted = index < segmentIndex;
        const shouldHighlight = segment.highlight && isCompleted;

        return (
          <span
            key={index}
            // PERBAIKAN UTAMA: Gunakan 'currentColor' agar warna mengikuti class text-zinc-...
            style={shouldHighlight ? { WebkitTextFillColor: 'currentColor' } : {}}
            className={`transition-all duration-500 pb-0.5 ${
              shouldHighlight 
                /* 1. text-zinc-900 (Light Mode): Teks jadi Hitam Gelap.
                   2. dark:text-zinc-100 (Dark Mode): Teks jadi Putih Terang.
                   3. border-b-2 border-sky-400: Garis bawah biru.
                   4. drop-shadow: Efek glow pada teks & garis.
                */
                ? "text-zinc-900 dark:text-zinc-100 border-b-2 border-sky-400 drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]" 
                : "border-b-2 border-transparent"
            }`}
          >
            {textToShow}
          </span>
        );
      })}
      
      {/* Kursor */}
      <span className="animate-pulse inline-block w-[3px] h-[1em] bg-sky-400 ml-1 align-middle shadow-[0_0_10px_#38bdf8] dark:shadow-[0_0_10px_#0ea5e9]">
        &nbsp;
      </span>
    </span>
  );
};

TypingText.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      highlight: PropTypes.bool,
    })
  ).isRequired,
  delay: PropTypes.number,
};

export default TypingText;