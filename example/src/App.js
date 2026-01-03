import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import { bronifyStories } from "./BronifyWrapped";
import audioManager from "./AudioManager";
import logger from "./logger";

const StoriesLazy = React.lazy(() => import("react-insta-stories"));

function App() {
  const [startStories, setStartStories] = useState(false);

  useEffect(() => {
    // NO preloading at all - audio loads per-story now
    logger.info('🎬 Bronify Wrapped initialized (no preload)');
  }, []);

  return (
    <div className="bronify-app">
      {/* Background Effects */}
      <div className="bg-gradient" />
      <div className="bg-pattern" />
      
      {/* Main Stories Container */}
      <div className="stories-container">
        {!startStories ? (
          <StartScreen onStart={() => {
            logger.event('🎯 Start Experience button clicked');
            
            // Fire unlock attempt but DON'T WAIT for it
            audioManager.unlockAudio().catch(err => {
              logger.warn('Audio unlock failed (will retry on first story)', err);
            });
            
            // Start stories immediately
            setStartStories(true);
            logger.info('▶️ Stories starting');
          }} />
        ) : (
          <Suspense fallback={<LoadingScreen />}>
            <StoriesLazy
              stories={bronifyStories}
              defaultInterval={25000}
              width="100%"
              height="100%"
              keyboardNavigation
              storyContainerStyles={{
                borderRadius: 0,
                overflow: "hidden",
                background: "transparent",
              }}
              progressContainerStyles={{
                padding: "12px 16px",
                paddingTop: 16,
              }}
              progressStyles={{
                background: "#FDB927",
              }}
              progressWrapperStyles={{
                background: "rgba(255,255,255,0.3)",
              }}
              onStoryStart={(index, story) => {
                logger.event(`📖 Story ${index + 1} started`, { storyIndex: index });
              }}
              onStoryEnd={(index, story) => {
                logger.event(`✔️ Story ${index + 1} ended`, { storyIndex: index });
              }}
              onAllStoriesEnd={() => {
                logger.event('🎉 All stories completed!');
              }}
            />
          </Suspense>
        )}
      </div>

      {/* Optional: Side panel for desktop */}
      <div className="side-panel">
        <div className="brand">
          <img src="https://g2k6o9ji0vmnkflo.public.blob.vercel-storage.com/lebron-james-seeklogo.svg" alt="LeBron" className="brand-icon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <h1>BRONIFY</h1>
          <p>WRAPPED 2025</p>
        </div>
        <div className="instructions">
          <p><span>◀</span> Tap left for previous</p>
          <p><span>▶</span> Tap right for next</p>
          <p><span>◉</span> Hold to pause</p>
          <p><span>⌨</span> Arrow keys work too</p>
        </div>
      </div>
    </div>
  );
}

// Start Screen Component - for iOS audio unlock with better touch handling
const StartScreen = ({ onStart }) => {
  useEffect(() => {
    logger.info('👋 Start screen displayed');
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logger.info('🖱️ Start button clicked', { isTrusted: e.isTrusted });
    onStart();
  };

  const handleTouch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logger.info('👆 Start button touched', { isTrusted: e.isTrusted });
    onStart();
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #552583 0%, #2d1548 100%)',
    }}>
      <img src="https://g2k6o9ji0vmnkflo.public.blob.vercel-storage.com/lebron-james-seeklogo.svg" alt="LeBron" style={{ width: 'clamp(50px, 20vw, 80px)', height: 'clamp(50px, 20vw, 80px)', marginBottom: '20px', objectFit: 'contain' }} />
      <h1 style={{ 
        color: '#FDB927', 
        fontSize: 'clamp(32px, 10vw, 48px)', 
        fontWeight: '900',
        margin: '0 0 16px 0',
        textAlign: 'center',
        fontFamily: "'Spotify Mix', sans-serif",
        letterSpacing: '4px',
      }}>
        BRONIFY
      </h1>
      <p style={{
        color: '#ccc',
        fontSize: 'clamp(14px, 4vw, 18px)',
        margin: '0 0 40px 0',
        fontFamily: "'Spotify Mix', sans-serif",
        letterSpacing: '2px',
      }}>
        WRAPPED 2025
      </p>
      
      <button
        onClick={handleClick}
        onTouchEnd={handleTouch}
        style={{
          padding: '18px 48px',
          fontSize: 'clamp(16px, 4vw, 20px)',
          fontWeight: '700',
          background: '#FDB927',
          color: '#552583',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontFamily: "'Spotify Mix', sans-serif",
          boxShadow: '0 8px 32px rgba(253, 185, 39, 0.4)',
          transition: 'transform 0.2s',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          WebkitAppearance: 'none',
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
      >
        Start Experience
      </button>

      <p style={{ 
        fontSize: 'clamp(11px, 3vw, 13px)', 
        marginTop: '24px', 
        color: '#888', 
        maxWidth: '300px',
        textAlign: 'center',
      }}>
        🎵 Turn on sound for the best experience
      </p>
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  useEffect(() => {
    logger.info('⏳ Loading screen displayed');
  }, []);
  
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #1a0a2e 0%, #0a0a0a 100%)",
      color: "#FDB927",
      fontFamily: "'Montserrat', sans-serif",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <img src="https://g2k6o9ji0vmnkflo.public.blob.vercel-storage.com/lebron-james-seeklogo.svg" alt="LeBron" style={{ width: "clamp(40px, 15vw, 60px)", height: "clamp(40px, 15vw, 60px)", marginBottom: 20, objectFit: "contain" }} />
      <div style={{ fontSize: "clamp(18px, 6vw, 24px)", fontWeight: 700 }}>BRONIFY</div>
      <div style={{ 
        marginTop: 20,
        width: "clamp(30px, 10vw, 40px)",
        height: "clamp(30px, 10vw, 40px)",
        border: "3px solid rgba(253, 185, 39, 0.3)",
        borderTopColor: "#FDB927",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
