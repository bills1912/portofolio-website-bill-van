/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add/remove event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !certificate) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate.certificateUrl;
    link.download = `${certificate.title.replace(/[^a-z0-9]/gi, '_')}_certificate`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(certificate.certificateUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 dark:bg-zinc-900 light:bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 dark:border-zinc-800 light:border-zinc-200">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-zinc-100 dark:text-zinc-100 light:text-zinc-800 truncate">
              {certificate.title}
            </h3>
            <p className="text-sm text-zinc-400 dark:text-zinc-400 light:text-zinc-500 truncate">
              {certificate.organization} • {certificate.year}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-sky-400 hover:bg-zinc-700 dark:hover:bg-zinc-700 light:hover:bg-zinc-200 transition-colors"
              title="Download Certificate"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            {/* Open in New Tab */}
            <button
              onClick={handleOpenNewTab}
              className="p-2 rounded-lg bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-sky-400 hover:bg-zinc-700 dark:hover:bg-zinc-700 light:hover:bg-zinc-200 transition-colors"
              title="Open in New Tab"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-100 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:text-red-400 hover:bg-zinc-700 dark:hover:bg-zinc-700 light:hover:bg-zinc-200 transition-colors"
              title="Close (Esc)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Certificate Image */}
        <div className="relative overflow-auto max-h-[calc(90vh-80px)] p-4 bg-zinc-950/50 dark:bg-zinc-950/50 light:bg-zinc-100">
          <div className="flex items-center justify-center min-h-[300px]">
            <img
              src={certificate.certificateUrl}
              alt={`${certificate.title} Certificate`}
              className="max-w-full h-auto rounded-lg shadow-lg object-contain"
              style={{ maxHeight: 'calc(90vh - 120px)' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Error State */}
            <div 
              className="hidden flex-col items-center justify-center gap-4 p-8 text-center"
              style={{ display: 'none' }}
            >
              <svg className="w-16 h-16 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-zinc-400">Failed to load certificate image</p>
              <button
                onClick={handleOpenNewTab}
                className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 transition-colors"
              >
                Try Opening in New Tab
              </button>
            </div>
          </div>
        </div>

        {/* Footer with zoom hint */}
        <div className="px-4 py-2 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-200 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-zinc-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 text-zinc-400 dark:text-zinc-400 light:text-zinc-600">Esc</kbd> to close • Click outside to dismiss
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

CertificateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  certificate: PropTypes.shape({
    title: PropTypes.string,
    organization: PropTypes.string,
    year: PropTypes.string,
    certificateUrl: PropTypes.string,
    certificateType: PropTypes.string
  })
};

export default CertificateModal;