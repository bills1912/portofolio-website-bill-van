/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import PropTypes from 'prop-types';

/**
 * Star Rating Component
 */
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-rounded text-[18px] ${
            star <= rating 
              ? 'text-amber-400' 
              : 'text-zinc-600 dark:text-zinc-600'
          }`}
          style={{ fontVariationSettings: star <= rating ? '"FILL" 1' : '"FILL" 0' }}
        >
          star
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

/**
 * Decode HTML entities
 */
const decodeHTMLEntities = (text) => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Testimonial Card Component
 */
const TestimonialCard = ({
  clientName,
  clientRole = null,
  clientCompany = null,
  clientAvatar = null,
  rating,
  title,
  content,
  projectName,
  isFeatured = false,
  createdAt,
  isActive = false,
  onClick = undefined,
}) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  // Generate initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Decode title and content
  const decodedTitle = decodeHTMLEntities(title);
  const decodedContent = decodeHTMLEntities(content);

  // Dynamic sizing based on active state
  const cardWidth = isActive 
    ? 'w-[320px] md:w-[420px] lg:w-[480px]' 
    : 'w-[260px] md:w-[300px]';

  return (
    <div 
      className={`
        group relative ${cardWidth} rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        ${isActive 
          ? 'bg-zinc-800/95 dark:bg-zinc-800/95 shadow-2xl shadow-sky-500/20 ring-1 ring-sky-500/30' 
          : 'bg-zinc-800/70 dark:bg-zinc-800/70 hover:bg-zinc-800/90'
        }
        backdrop-blur-xl border
        ${isActive ? 'border-sky-500/30' : 'border-zinc-700/30 dark:border-zinc-700/30'}
      `}
      onClick={onClick}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Animated Gradient Background for Active Card */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10 opacity-50 transition-opacity duration-500" />
      )}

      {/* Content */}
      <div className={`relative p-5 ${isActive ? 'md:p-6' : 'md:p-5'} transition-all duration-500`}>
        
        {/* Header: Avatar + Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className={`
            relative flex-shrink-0 rounded-xl overflow-hidden
            ring-2 transition-all duration-300
            ${isActive 
              ? 'w-14 h-14 ring-sky-400/50' 
              : 'w-12 h-12 ring-zinc-600/50'
            }
          `}>
            {clientAvatar ? (
              <img
                src={clientAvatar}
                alt={clientName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`
                ${clientAvatar ? 'hidden' : 'flex'} 
                absolute inset-0 items-center justify-center 
                bg-gradient-to-br from-sky-500 to-violet-600 
                text-white font-semibold
                ${isActive ? 'text-lg' : 'text-sm'}
              `}
            >
              {getInitials(clientName)}
            </div>
          </div>

          {/* Client Info */}
          <div className="flex-1 min-w-0">
            <h4 className={`
              font-semibold text-zinc-100 dark:text-zinc-100 truncate
              transition-all duration-300
              ${isActive ? 'text-base md:text-lg' : 'text-sm md:text-base'}
            `}>
              {clientName}
            </h4>
            {(clientRole || clientCompany) && (
              <p className={`
                text-zinc-400 dark:text-zinc-400 truncate
                transition-all duration-300
                ${isActive ? 'text-sm' : 'text-xs'}
              `}>
                {clientRole}{clientRole && clientCompany && ' at '}{clientCompany}
              </p>
            )}
            <div className="mt-1.5">
              <StarRating rating={rating} />
            </div>
          </div>
        </div>

        {/* Quote Icon */}
        <div className={`
          absolute top-4 right-4 text-sky-400/20 dark:text-sky-400/20
          transition-all duration-300
          ${isFeatured ? 'hidden' : ''}
        `}>
          <svg 
            className={isActive ? 'w-12 h-12' : 'w-8 h-8'} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>

        {/* Testimonial Title */}
        <h3 className={`
          font-semibold text-zinc-100 dark:text-zinc-100 mb-3
          transition-all duration-300
          ${isActive 
            ? 'text-lg md:text-xl group-hover:text-sky-400 line-clamp-2' 
            : 'text-sm md:text-base line-clamp-2'
          }
        `}>
          {decodedTitle}
        </h3>

        {/* Testimonial Content */}
        <p className={`
          text-zinc-400 dark:text-zinc-400 leading-relaxed
          transition-all duration-300
          ${isActive 
            ? 'text-sm md:text-base line-clamp-4 md:line-clamp-5' 
            : 'text-xs md:text-sm line-clamp-3'
          }
        `}>
          {decodedContent}
        </p>

        {/* Footer: Project + Date */}
        <div className={`
          flex items-center justify-between mt-4 pt-4 
          border-t border-zinc-700/50 dark:border-zinc-700/50
          transition-all duration-500
        `}>
          {/* Project Badge */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className={`
              p-1.5 rounded-lg bg-sky-500/10 text-sky-400
              transition-colors duration-300 flex-shrink-0
            `}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className={`
              text-zinc-500 dark:text-zinc-500 truncate
              ${isActive ? 'text-xs md:text-sm' : 'text-xs'}
            `}>
              {projectName}
            </span>
          </div>

          {/* Date */}
          <span className={`
            text-zinc-600 dark:text-zinc-600 flex-shrink-0
            ${isActive ? 'text-xs' : 'text-[10px]'}
          `}>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {/* Glow Effect for Active Card */}
      {isActive && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-40 -z-10 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </>
      )}
    </div>
  );
};

TestimonialCard.propTypes = {
  clientName: PropTypes.string.isRequired,
  clientRole: PropTypes.string,
  clientCompany: PropTypes.string,
  clientAvatar: PropTypes.string,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default TestimonialCard;