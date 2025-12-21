/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import AchievementCard from "./AchievementCard";
import CertificateModal from "./CertificateModal";

const achievements = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Effective Leadership Certification",
    organization: "HP",
    year: "2025",
    description: "Earned professional how to be an effective leader.",
    category: "Certification",
    certificateType: "pdf",
    certificateUrl: "/portofolio-website-bill-van/certificates/effective-leadership.pdf",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/effective-leadership-thumb.jpg",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Earth, Space, and Marine Sciences Cluster in IRIFair-Scholar Research Competition 2023 - Finalist",
    organization: "BRIN",
    year: "2024",
    description: "Be the one of the finalists in IRIFair-Scholar Research Competition 2023.",
    category: "Competition",
    certificateType: "image",
    certificateUrl: "/portofolio-website-bill-van/certificates/Finalis IRIFair_Bill Van Ricardo Zalukhu.jpg",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/Finalis IRIFair_Bill Van Ricardo Zalukhu.jpg",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Favorite Poster Award - IRIFair-Scholar Competition 2023",
    organization: "BRIN",
    year: "2023",
    description: "Won the favorite poster award in IRIFair-Scholar Competition 2023 in Earth, Space, and Marine Sciences Cluster.",
    category: "Competition",
    certificateType: "image",
    certificateUrl: "/portofolio-website-bill-van/certificates/Favorite Poster IRIFair_Bill Van Ricardo Zalukhu.jpg",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/Favorite Poster IRIFair_Bill Van Ricardo Zalukhu.jpg",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Patent: Model Deteksi Jenis Kapal Laut Dengan Object-Based Deep Learning Pada Citra Satelit Resolusi Sangat Tinggi",
    organization: "Direktorat Jenderal Kekayaan Intelektual",
    year: "2024",
    description: "Registered patent for detecting types of ships using object-based deep learning on high-resolution satellite images.",
    category: "Patent",
    certificateType: "pdf",
    certificateUrl: "/portofolio-website-bill-van/certificates/patent-model-deteksi-jenis-kapal-laut.pdf",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/patent-model-deteksi-jenis-kapal-laut-thumb.jpg",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Best Paper Award - Comnetsat 2022",
    organization: "COMNETSAT Conference",
    year: "2024",
    description: "Awarded for the best paper presentation at the COMNETSAT 2022 conference in Data Science and Machine Learning category.",
    category: "Competition",
    certificateType: "image",
    certificateUrl: "/portofolio-website-bill-van/certificates/Best Paper-2022 Comnetsat-Bil Van Ricardo Zalukhu.jpg",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/Best Paper-2022 Comnetsat-Bil Van Ricardo Zalukhu.jpg",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Machine Learning for Official Statistics and the SDG's-2023",
    organization: "United Nations ESCAP",
    year: "2023",
    description: "Earned professional certification in machine learning usability for optimalization SDG's analysis issue.",
    category: "Certification",
    certificateType: "pdf",
    certificateUrl: "/portofolio-website-bill-van/certificates/MLOS22 - Certificate.pdf",
    thumbnailUrl: "/portofolio-website-bill-van/certificates/MLOS22 - Certificate-thumb.jpg",
  }
];

const Achievement = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? achievements.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  const openCertificate = (achievement) => {
    if (achievement.certificateUrl) {
      if (achievement.certificateType === 'pdf') {
        window.open(achievement.certificateUrl, '_blank');
      } else {
        setSelectedCertificate(achievement);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === achievements.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, achievements.length]);

  // Pause saat hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Get position for each card
  const getCardStyle = (index) => {
    const total = achievements.length;
    let diff = index - activeIndex;

    // Handle circular navigation
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isAdjacent = Math.abs(diff) === 1;
    const isVisible = Math.abs(diff) <= 2;

    if (!isVisible) {
      return {
        opacity: 0,
        transform: `translateX(${diff * 100}%) scale(0.5)`,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }

    if (isActive) {
      return {
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        zIndex: 30,
        pointerEvents: 'auto',
      };
    }

    if (isAdjacent) {
      const direction = diff > 0 ? 1 : -1;
      return {
        opacity: 0.6,
        transform: `translateX(${direction * 85}%) scale(0.75)`,
        zIndex: 20,
        pointerEvents: 'auto',
      };
    }

    // Cards further away
    const direction = diff > 0 ? 1 : -1;
    return {
      opacity: 0.3,
      transform: `translateX(${direction * 150}%) scale(0.6)`,
      zIndex: 10,
      pointerEvents: 'none',
    };
  };

  return (
    <section
      id="achievements"
      className="section overflow-hidden"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="headline-2 mb-4 reveal-up mx-auto">
            Achievements & Recognition
          </h2>
          <p className="text-zinc-400 dark:text-zinc-400 max-w-[50ch] mx-auto reveal-up">
            A collection of certifications, awards, and patents. Click to view full certificate.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative h-[520px] md:h-[580px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            setIsPaused(true);
            onTouchStart(e);
          }}
          onTouchMove={onTouchMove}
          onTouchEnd={() => {
            onTouchEnd();
            setIsPaused(false);
          }}
        >
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {achievements.map((achievement, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  style={{
                    opacity: style.opacity,
                    transform: style.transform,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                  }}
                >
                  <AchievementCard
                    {...achievement}
                    hasCertificate={!!achievement.certificateUrl}
                    onViewCertificate={() => openCertificate(achievement)}
                    isActive={isActive}
                    onClick={!isActive ? () => goToSlide(index) : undefined}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={isAnimating}
            className="absolute left-2 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-zinc-800/90 dark:bg-zinc-800/90 text-zinc-100 dark:text-zinc-100 hover:bg-sky-400 hover:text-zinc-900 transition-all duration-300 shadow-xl backdrop-blur-sm z-40 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Previous achievement"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-2 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-zinc-800/90 dark:bg-zinc-800/90 text-zinc-100 dark:text-zinc-100 hover:bg-sky-400 hover:text-zinc-900 transition-all duration-300 shadow-xl backdrop-blur-sm z-40 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next achievement"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-zinc-800/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-sky-400 transition-colors z-40"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 bg-zinc-800 dark:bg-zinc-800 rounded-full max-w-md mx-auto mt-8 overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((activeIndex + 1) / achievements.length) * 100}%`,
            }}
          />
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {achievements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative transition-all duration-500 ease-out rounded-full overflow-hidden ${index === activeIndex
                ? 'w-10 h-3 bg-sky-400'
                : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
                }`}
              aria-label={`Go to achievement ${index + 1}`}
            >
              {index === activeIndex && (
                <span className="absolute inset-0 bg-gradient-to-r from-sky-300 to-sky-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Counter with animation */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-500 text-sm">
            <span className="font-mono text-lg text-sky-400 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-600 dark:text-zinc-600">/</span>
            <span className="font-mono tabular-nums">
              {String(achievements.length).padStart(2, '0')}
            </span>
          </span>
        </div>

        {/* Keyboard hint */}
        <div className="hidden md:flex justify-center mt-4 gap-4 text-xs text-zinc-600 dark:text-zinc-600">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 rounded bg-zinc-800 dark:bg-zinc-800 text-zinc-400">←</kbd>
            <kbd className="px-2 py-1 rounded bg-zinc-800 dark:bg-zinc-800 text-zinc-400">→</kbd>
            <span className="ml-1">Navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <span>Swipe on mobile</span>
          </span>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        certificate={selectedCertificate}
      />
    </section>
  );
};

export default Achievement;
