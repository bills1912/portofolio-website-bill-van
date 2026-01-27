/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useState, useEffect, useCallback } from 'react';

/**
 * Components
 */
import TestimonialCard from "./TestimonialCard";

/**
 * API Configuration
 */
const API_BASE_URL = 'https://testimonials-system-production.up.railway.app';

/**
 * Testimonial Section Component
 */
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  /**
   * Fetch testimonials from API
   */
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [testimonialsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/public/testimonials`),
        fetch(`${API_BASE_URL}/api/public/stats`)
      ]);

      if (!testimonialsRes.ok) {
        throw new Error('Failed to fetch testimonials');
      }

      const testimonialsData = await testimonialsRes.json();
      const statsData = statsRes.ok ? await statsRes.json() : null;

      // Sort: featured first, then by date
      const sortedTestimonials = testimonialsData.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setTestimonials(sortedTestimonials);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch data on mount
   */
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  /**
   * Navigation functions
   */
  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, testimonials.length]);

  const goToNext = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, testimonials.length]);

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  /**
   * Touch handlers for swipe
   */
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

  /**
   * Auto-play carousel
   */
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  /**
   * Pause on hover
   */
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  /**
   * Calculate card style based on position
   */
  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = index - activeIndex;

    // Handle circular navigation
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isAdjacent = Math.abs(diff) === 1;

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

  /**
   * Loading State
   */
  if (loading) {
    return (
      <section id="testimonials" className="section overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="headline-2 mb-4 reveal-up mx-auto">
              What Clients Say About Me
            </h2>
            <p className="text-zinc-400 dark:text-zinc-400 max-w-[50ch] mx-auto reveal-up">
              Real feedback from clients I&apos;ve had the pleasure of working with.
            </p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-zinc-700 border-t-sky-400 rounded-full animate-spin" />
              </div>
              <p className="text-zinc-400 dark:text-zinc-400 text-sm animate-pulse">
                Loading testimonials...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /**
   * Error State
   */
  if (error) {
    return (
      <section id="testimonials" className="section overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="headline-2 mb-4 reveal-up mx-auto">
              What Clients Say About Me
            </h2>
          </div>
          
          {/* Error Message */}
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-full bg-red-500/10 text-red-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-zinc-400 dark:text-zinc-400">
                Unable to load testimonials at the moment
              </p>
              <button 
                onClick={fetchTestimonials}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /**
   * Empty State
   */
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section overflow-hidden">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="headline-2 mb-4 reveal-up mx-auto">
              What Clients Say About Me
            </h2>
          </div>
          
          {/* Empty Message */}
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-full bg-zinc-700/50 text-zinc-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-zinc-400 dark:text-zinc-400">
                No testimonials yet. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="section overflow-hidden"
    >
      <div className="container">
        {/* Header - Added relative and z-index to ensure visibility */}
        <div className="relative z-10 text-center mb-8">
          <h2 className="headline-2 mb-4 reveal-up mx-auto">
            What Clients Say About Me
          </h2>
          <p className="text-zinc-400 dark:text-zinc-400 max-w-[50ch] mx-auto reveal-up">
            Real feedback from clients I&apos;ve had the pleasure of working with on various projects.
          </p>

          {/* Stats */}
          {stats && (
            <div className="flex items-center justify-center gap-8 mt-6 reveal-up">
              {/* Average Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-rounded text-amber-400 text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    star
                  </span>
                  <span className="text-3xl font-semibold text-zinc-100 dark:text-zinc-100">
                    {stats.average_rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-zinc-500 dark:text-zinc-500 text-sm">
                  avg rating
                </span>
              </div>

              <div className="w-px h-8 bg-zinc-700" />

              {/* Total Reviews */}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-semibold text-zinc-100 dark:text-zinc-100">
                  {stats.total_testimonials}
                </span>
                <span className="text-zinc-500 dark:text-zinc-500 text-sm">
                  reviews
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Container */}
        <div
          className="relative h-[360px] md:h-[400px] overflow-hidden"
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
          <div className="absolute inset-0 flex items-center justify-center overflow-visible">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div
                  key={testimonial.id}
                  className="absolute transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  style={{
                    opacity: style.opacity,
                    transform: style.transform,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                  }}
                >
                  <TestimonialCard
                    clientName={testimonial.client_name}
                    clientRole={testimonial.client_role}
                    clientCompany={testimonial.client_company}
                    clientAvatar={testimonial.client_avatar}
                    rating={testimonial.rating}
                    title={testimonial.title}
                    content={testimonial.content}
                    projectName={testimonial.project_name}
                    isFeatured={testimonial.is_featured}
                    createdAt={testimonial.created_at}
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
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-2 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-zinc-800/90 dark:bg-zinc-800/90 text-zinc-100 dark:text-zinc-100 hover:bg-sky-400 hover:text-zinc-900 transition-all duration-300 shadow-xl backdrop-blur-sm z-40 disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Play/Pause Button */}
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
              width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
            }}
          />
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative transition-all duration-500 ease-out rounded-full overflow-hidden ${
                index === activeIndex
                  ? 'w-10 h-3 bg-sky-400'
                  : 'w-3 h-3 bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              {index === activeIndex && (
                <span className="absolute inset-0 bg-gradient-to-r from-sky-300 to-sky-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-500 text-sm">
            <span className="font-mono text-lg text-sky-400 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-600 dark:text-zinc-600">/</span>
            <span className="font-mono tabular-nums">
              {String(testimonials.length).padStart(2, '0')}
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

        {/* Write Review CTA */}
        <div className="mt-8 text-center reveal-up">
          <p className="text-zinc-500 dark:text-zinc-500 text-sm mb-3">
            Have we worked together? I&apos;d love to hear your feedback!
          </p>
          <a
            href="https://vandataalchemist-testimoni.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline inline-flex"
          >
            <span className="material-symbols-rounded text-lg">
              rate_review
            </span>
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;