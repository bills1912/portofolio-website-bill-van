/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

const categoryColors = {
  Academic: {
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    hoverBg: 'hover:bg-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    glow: 'shadow-emerald-500/30',
    ring: 'ring-emerald-500/30',
    lightBadge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  },
  Competition: {
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    hoverBg: 'hover:bg-amber-500/20',
    iconBg: 'bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    glow: 'shadow-amber-500/30',
    ring: 'ring-amber-500/30',
    lightBadge: 'bg-amber-100 text-amber-700 border-amber-300',
  },
  Innovation: {
    gradient: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/40',
    text: 'text-violet-400',
    hoverBg: 'hover:bg-violet-500/20',
    iconBg: 'bg-violet-500/10',
    badge: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    glow: 'shadow-violet-500/30',
    ring: 'ring-violet-500/30',
    lightBadge: 'bg-violet-100 text-violet-700 border-violet-300',
  },
  Publication: {
    gradient: 'from-sky-500/20 to-sky-500/5',
    border: 'border-sky-500/40',
    text: 'text-sky-400',
    hoverBg: 'hover:bg-sky-500/20',
    iconBg: 'bg-sky-500/10',
    badge: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    glow: 'shadow-sky-500/30',
    ring: 'ring-sky-500/30',
    lightBadge: 'bg-sky-100 text-sky-700 border-sky-300',
  },
  Leadership: {
    gradient: 'from-rose-500/20 to-rose-500/5',
    border: 'border-rose-500/40',
    text: 'text-rose-400',
    hoverBg: 'hover:bg-rose-500/20',
    iconBg: 'bg-rose-500/10',
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    glow: 'shadow-rose-500/30',
    ring: 'ring-rose-500/30',
    lightBadge: 'bg-rose-100 text-rose-700 border-rose-300',
  },
  Certification: {
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    hoverBg: 'hover:bg-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    glow: 'shadow-cyan-500/30',
    ring: 'ring-cyan-500/30',
    lightBadge: 'bg-cyan-100 text-cyan-700 border-cyan-300',
  },
  Patent: {
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    hoverBg: 'hover:bg-orange-500/20',
    iconBg: 'bg-orange-500/10',
    badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    glow: 'shadow-orange-500/30',
    ring: 'ring-orange-500/30',
    lightBadge: 'bg-orange-100 text-orange-700 border-orange-300',
  }
};

const AchievementCard = ({
  icon,
  title,
  organization,
  year,
  description,
  category,
  hasCertificate,
  certificateType,
  thumbnailUrl,
  onViewCertificate,
  isActive,
  onClick,
}) => {
  const colors = categoryColors[category] || categoryColors.Academic;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Dynamic sizing based on active state
  const cardWidth = isActive ? 'w-[320px] md:w-[420px] lg:w-[480px]' : 'w-[260px] md:w-[300px]';
  const thumbnailHeight = isActive ? 'h-48 md:h-64 lg:h-72' : 'h-32 md:h-40';

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else if (isActive && onViewCertificate) {
      onViewCertificate();
    }
  };

  return (
    <div 
      className={`
        group relative ${cardWidth} rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        ${isActive 
          ? `bg-zinc-800/95 dark:bg-zinc-800/95 shadow-2xl ${colors.glow} ring-1 ${colors.ring}` 
          : 'bg-zinc-800/70 dark:bg-zinc-800/70 hover:bg-zinc-800/90'
        }
        backdrop-blur-xl border
        ${isActive ? colors.border : 'border-zinc-700/30 dark:border-zinc-700/30'}
      `}
      onClick={handleClick}
    >
      {/* Animated background gradient for active card */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50 transition-opacity duration-500`} />
      )}

      {/* Certificate Thumbnail Preview */}
      {hasCertificate && thumbnailUrl && (
        <div className={`relative ${thumbnailHeight} overflow-hidden bg-zinc-900 dark:bg-zinc-900 transition-all duration-500 ease-out`}>
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-zinc-800 dark:bg-zinc-800 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-zinc-700 border-t-sky-400 rounded-full animate-spin" />
              </div>
            </div>
          )}
          
          {/* Thumbnail Image */}
          <img
            src={thumbnailUrl}
            alt={`${title} certificate preview`}
            className={`
              w-full h-full object-cover object-top 
              transition-all duration-700 ease-out
              ${isActive ? 'group-hover:scale-110' : 'group-hover:scale-105'}
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Error state */}
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-2">
              <div className={`p-4 rounded-full ${colors.iconBg} ${colors.text}`}>
                {icon}
              </div>
              <span className="text-xs text-zinc-500">Certificate Preview</span>
            </div>
          )}

          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />

          {/* File Type Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`
              px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
              backdrop-blur-md shadow-lg
              transition-transform duration-300 group-hover:scale-105
              ${certificateType === 'pdf' 
                ? 'bg-red-500/90 text-white' 
                : 'bg-sky-500/90 text-white'
              }
            `}>
              {certificateType === 'pdf' ? 'PDF' : 'IMG'}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`
              px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
              backdrop-blur-md border shadow-lg
              transition-transform duration-300 group-hover:scale-105
              ${colors.badge}
            `}>
              {category}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className={`
              px-3 py-1.5 rounded-lg font-semibold
              bg-black/60 text-white backdrop-blur-md shadow-lg
              transition-all duration-300
              ${isActive ? 'text-sm' : 'text-xs'}
            `}>
              {year}
            </span>
          </div>

          {/* Active Indicator - View Button with animation */}
          {isActive && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              <div className={`
                relative flex items-center gap-2 px-6 py-3 rounded-xl
                ${colors.iconBg} ${colors.text} border ${colors.border}
                backdrop-blur-sm shadow-xl
                transform scale-90 group-hover:scale-100
                transition-all duration-300 ease-out
              `}>
                {certificateType === 'pdf' ? (
                  <>
                    <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-semibold">Open PDF</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="font-semibold">View Full Size</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={`relative p-4 ${isActive ? 'md:p-5 lg:p-6' : 'md:p-4'} transition-all duration-500`}>
        {/* Title & Organization */}
        <div className="mb-3">
          <h3 className={`
            font-semibold text-zinc-100 dark:text-zinc-100 
            line-clamp-2 transition-all duration-300
            ${isActive 
              ? 'text-lg md:text-xl lg:text-2xl group-hover:text-sky-400' 
              : 'text-sm md:text-base'
            }
          `}>
            {title}
          </h3>
          <p className={`
            text-zinc-400 dark:text-zinc-400 mt-1
            transition-all duration-300
            ${isActive ? 'text-sm md:text-base' : 'text-xs md:text-sm'}
          `}>
            {organization}
          </p>
        </div>

        {/* Description - only show for active */}
        {isActive && (
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-500 line-clamp-2 md:line-clamp-3 transition-all duration-500">
            {description}
          </p>
        )}

        {/* Bottom Action - Only for active card */}
        {isActive && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700/50 dark:border-zinc-700/50 transition-all duration-500">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${colors.iconBg} ${colors.text} transition-colors duration-300`}>
                {certificateType === 'pdf' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-500">
                Click to view
              </span>
            </div>
            
            <svg 
              className={`w-5 h-5 ${colors.text} transform transition-transform duration-300 group-hover:translate-x-1`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}
      </div>

      {/* Glow effect for active card */}
      {isActive && (
        <>
          <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-40 -z-10 transition-opacity duration-500`} />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </>
      )}
    </div>
  );
};

AchievementCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  hasCertificate: PropTypes.bool,
  certificateType: PropTypes.oneOf(['pdf', 'image', null]),
  thumbnailUrl: PropTypes.string,
  onViewCertificate: PropTypes.func,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

AchievementCard.defaultProps = {
  hasCertificate: false,
  certificateType: null,
  thumbnailUrl: null,
  onViewCertificate: () => {},
  isActive: false,
  onClick: null,
};

export default AchievementCard;
