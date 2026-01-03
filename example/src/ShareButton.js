import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import logger from './logger';

const ShareButton = ({ slideRef, slideName = 'Bronify-Wrapped' }) => {
  const [isSharing, setIsSharing] = useState(false);

  const captureAndShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!slideRef?.current) {
      logger.error('No slide ref provided');
      return;
    }

    setIsSharing(true);
    logger.info('📸 Starting capture', { slideName });

    try {
      // Hide share button during capture
      const shareButtons = document.querySelectorAll('.share-button');
      shareButtons.forEach(btn => btn.style.visibility = 'hidden');
      
      // Hide progress bars
      const progressBars = document.querySelectorAll('[class*="progress"]');
      progressBars.forEach(el => el.style.visibility = 'hidden');

      // Get actual slide dimensions
      const rect = slideRef.current.getBoundingClientRect();
      
      // Capture the slide at high resolution
      const canvas = await html2canvas(slideRef.current, {
        scale: 2, // 2x resolution for quality
        backgroundColor: '#000000',
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: rect.width,
        height: rect.height,
      });

      // Show elements again
      shareButtons.forEach(btn => btn.style.visibility = 'visible');
      progressBars.forEach(el => el.style.visibility = 'visible');

      // Create story-sized canvas (1080x1920)
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 1080;
      finalCanvas.height = 1920;
      const ctx = finalCanvas.getContext('2d');
      
      // Fill with dark background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 1080, 1920);
      
      // Calculate scale to fit while maintaining aspect ratio
      const scale = Math.min(1080 / canvas.width, 1920 / canvas.height);
      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;
      
      // Center the image
      const offsetX = (1080 - scaledWidth) / 2;
      const offsetY = (1920 - scaledHeight) / 2;
      
      ctx.drawImage(canvas, offsetX, offsetY, scaledWidth, scaledHeight);

      // Convert to blob
      const blob = await new Promise((resolve) => {
        finalCanvas.toBlob(resolve, 'image/png', 1.0);
      });

      const file = new File([blob], `${slideName}.png`, { type: 'image/png' });

      // Try Web Share API (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        logger.info('✅ Using Web Share API');
        
        await navigator.share({
          files: [file],
          title: 'Bronify Wrapped 2025',
          text: 'Check out my Bronify Wrapped! 🏀',
        });
        
        logger.event('share_success', { method: 'web_share', slideName });
      } else {
        // Fallback: Download image
        logger.info('📥 Falling back to download');
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${slideName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        logger.event('share_success', { method: 'download', slideName });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        logger.error('❌ Share failed', error, { slideName });
      }
    } finally {
      // Make sure elements are visible
      const shareButtons = document.querySelectorAll('.share-button');
      shareButtons.forEach(btn => btn.style.visibility = 'visible');
      const progressBars = document.querySelectorAll('[class*="progress"]');
      progressBars.forEach(el => el.style.visibility = 'visible');
      
      setIsSharing(false);
    }
  };

  return (
    <button
      className="share-button"
      onClick={captureAndShare}
      onTouchEnd={captureAndShare}
      disabled={isSharing}
      style={{
        position: 'absolute',
        bottom: 'clamp(30px, 8vw, 50px)',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 'clamp(12px, 3vw, 18px) clamp(30px, 8vw, 50px)',
        fontSize: 'clamp(14px, 4vw, 18px)',
        fontWeight: '700',
        background: isSharing ? '#666' : '#FDB927',
        color: '#552583',
        border: 'none',
        borderRadius: '50px',
        cursor: isSharing ? 'wait' : 'pointer',
        fontFamily: "'Spotify Mix', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(6px, 2vw, 10px)',
        transition: 'all 0.3s',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 1000,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        WebkitAppearance: 'none',
        minWidth: 'clamp(120px, 35vw, 180px)',
      }}
      onMouseDown={(e) => !isSharing && (e.currentTarget.style.transform = 'translateX(-50%) scale(0.95)')}
      onMouseUp={(e) => !isSharing && (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')}
      onTouchStart={(e) => !isSharing && (e.currentTarget.style.transform = 'translateX(-50%) scale(0.95)')}
    >
      {isSharing ? (
        <>
          <span style={{ fontSize: 'clamp(16px, 4vw, 22px)' }}>⏳</span>
          <span>Preparing...</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: 'clamp(16px, 4vw, 22px)' }}>📤</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;

