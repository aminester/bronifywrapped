import React, { useState, useEffect, useRef, Suspense } from "react";
import audioManager from "./AudioManager";
import { CDN } from "./cdnAssets";

// ============================================================================
// BRONIFY WRAPPED 2025 - LeBron's Spotify Wrapped Parody
// ============================================================================

// Mock user data - using CDN URLs for all media assets
const userData = {
  minutesListened: 42268,
  lebronAllTimePoints: 40474,
  totalGenres: 47,
  topGenres: ["Bron&B", "LeRap", "Acoustic Dunks", "Lo-Fi Blocks", "King's Gospel"],
  lebronEra: "Miami Bron", // Cavs Premiere, Miami Bron, Back to Cavs, Lakers Bron, Bronny Era
  totalSongs: 2847,
  topSong: {
    title: "Man on the Lakers",
    artist: "Talented Blake",
    timesPlayed: 347,
    albumArt: CDN.images.manOnTheLakers,
  },
  songQuizOptions: [
    { title: "That's Bron", artist: "IlyAugust", albumArt: CDN.images.bronAlbum },
    { title: "Man on the Lakers", artist: "Talented Blake", albumArt: CDN.images.manOnTheLakers },
    { title: "LeRnB", artist: "itsokayspade", albumArt: CDN.images.leRnB },
    { title: "Lakers in 5", artist: "ramon angelo", albumArt: CDN.images.lakersIn5 },
    { title: "From LeStart", artist: "omgitsnotjane", albumArt: CDN.images.fromLeStart },
  ],
  correctSongIndex: 1,
  topSongs: [
    { title: "Man on the Lakers", artist: "Talented Blake", albumArt: CDN.images.manOnTheLakers },
    { title: "That's Bron", artist: "IlyAugust", albumArt: CDN.images.bronAlbum },
    { title: "LeRnB", artist: "itsokayspade", albumArt: CDN.images.leRnB },
    { title: "Lakers in 5", artist: "ramon angelo", albumArt: CDN.images.lakersIn5 },
    { title: "From LeStart", artist: "omgitsnotjane", albumArt: CDN.images.fromLeStart },
  ],
  totalAlbums: 21,
  lebronSeasons: 22,
  topAlbum: {
    name: "Bron and Jerry",
    artist: "LeBron",
    minutesListened: 634,
    albumArt: CDN.images.bronAndJerry,
  },
  topAlbums: [
    { name: "Bron and Jerry", artist: "LeBron", albumArt: CDN.images.bronAndJerry },
    { name: "LeBronaissance", artist: "LeBron", albumArt: CDN.images.lebronaissance },
    { name: "Bronfoolery", artist: "LeBron", albumArt: CDN.images.bronfoolery },
    { name: "ChaeBron James", artist: "LeBron", albumArt: CDN.images.chaebronJames },
    { name: "LBJ", artist: "LeBron", albumArt: CDN.images.lbj },
  ],
  totalArtists: 1046,
  topArtists: [
    { name: "ilyaugust", song: "Man on the Lakers", image: CDN.images.ilyaugust },
    { name: "Talented Blake", song: "That's Bron", image: CDN.images.talentedBlake },
    { name: "omgitsnotjane", song: "LeRnB", image: CDN.images.omgitsnotjane },
    { name: "ramon angelo", song: "Lakers in 5", image: CDN.images.ramonangelo },
    { name: "everyone", song: "From LeStart", image: CDN.images.everyoneBronify },
  ],
  lebronType: {
    name: "Playoff LeBron",
    description: "Unstoppable. Dominant. You turn up when it matters most.",
    percentage: 12,
  },
  lebronTypes: [
    { name: "Young King", description: "Raw talent, infinite potential" },
    { name: "Heatles Bron", description: "Championship mentality, South Beach vibes" },
    { name: "The Return", description: "Hometown hero, promise keeper" },
    { name: "Playoff LeBron", description: "Different beast, same animal" },
    { name: "Father Time Bron", description: "Age is just a number" },
  ],
};

// ============================================================================
// STYLES - Spotify Wrapped Design System with Cavaliers Colors
// ============================================================================
const colors = {
  wine: "#860038",
  navy: "#041E42",
  gold: "#FDBB30",
  black: "#000000",
  spotifyGreen: "#1DB954",
  spotifyBlack: "#121212",
  spotifyGray: "#535353",
  spotifyLightGray: "#B3B3B3",
  white: "#ffffff",
  // Legacy Lakers colors for Slide 1
  purple: "#552583",
  lakersGold: "#FDB927",
};

const baseStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 24px",
  boxSizing: "border-box",
  fontFamily: "'Circular', -apple-system, BlinkMacSystemFont, sans-serif",
  overflow: "hidden",
  position: "relative",
};

const gradientBg = {
  background: colors.spotifyBlack,
};

const titleStyle = {
  fontSize: "clamp(32px, 9vw, 56px)",
  fontWeight: 900,
  color: colors.white,
  textAlign: "center",
  margin: 0,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  fontFamily: "'Spotify Mix', sans-serif",
  fontStretch: "ultra-expanded",
};

const accentText = {
  color: colors.gold,
};

const subtitleStyle = {
  fontSize: "clamp(14px, 4vw, 16px)",
  color: colors.spotifyLightGray,
  textAlign: "center",
  marginTop: 12,
  fontWeight: 400,
  letterSpacing: "0.5px",
};

const bigNumberStyle = {
  fontSize: "clamp(72px, 22vw, 140px)",
  fontWeight: 900,
  color: colors.gold,
  textAlign: "center",
  margin: 0,
  lineHeight: 0.9,
  letterSpacing: "-4px",
  fontFamily: "'Spotify Mix Ultra', 'Spotify Mix', sans-serif",
  fontStretch: "ultra-condensed",
};

const listItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "16px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  width: "100%",
  transition: "transform 0.2s ease",
};

const rankStyle = {
  fontSize: 28,
  fontWeight: 900,
  color: colors.gold,
  width: 40,
  fontFamily: "'Spotify Mix', sans-serif",
};

// ============================================================================
// STORY COMPONENTS
// ============================================================================

// Story 1: Bronify Wrapped 2025 Intro - Spotify Style with Lakers Theme
const Story1_Intro = ({ action, isPaused }) => {
  const [phase, setPhase] = useState(1); // Animation phases
  const [audioLoading, setAudioLoading] = useState(true);
  
  useEffect(() => {
    action("play");
    
    // Load audio asynchronously - don't block
    audioManager.play(CDN.audio.LeRnB, { volume: 0.6, loop: true })
      .then(() => {
        setAudioLoading(false);
        console.log('✅ Story 1 audio loaded');
      })
      .catch(err => {
        console.log('❌ Story 1 audio failed', err);
        setAudioLoading(false); // Continue anyway
      });
    
    // Phase 1: Scrolling 2025 with radial checkers (0-2s)
    setTimeout(() => setPhase(2), 2000);
    
    // Phase 2: Checkers fade, 2025 moves down, side radial enters (2-3.5s)
    setTimeout(() => setPhase(3), 3500);
    
    // Phase 3: Final state with swoosh and polaroids (3.5s+)
    
    return () => {
      audioManager.stop();
    };
  }, []);

  return (
    <div style={{ 
      ...baseStyle, 
      background: colors.gold,
      padding: 0,
      overflow: "hidden",
    }}>
      
      {/* Audio loading indicator */}
      {audioLoading && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: '24px',
          zIndex: 9999,
          animation: 'pulse 1s ease-in-out infinite',
        }}>
          🎵
        </div>
      )}
      
      {/* PHASE 1 & 2: Radial Checkers (Top Half) */}
      {phase < 3 && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          overflow: "hidden",
          opacity: phase === 2 ? 0 : 1,
          transition: "opacity 0.8s ease-out",
        }}>
          <svg width="100%" height="100%" style={{ transform: "scale(1.2)" }}>
            <defs>
              <pattern id="checkerTop" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill={colors.purple} />
                <rect x="20" width="20" height="20" fill="#000" />
                <rect y="20" width="20" height="20" fill="#000" />
                <rect x="20" y="20" width="20" height="20" fill={colors.purple} />
              </pattern>
            </defs>
            <circle 
              cx="50%" 
              cy="100%" 
              r={phase === 1 ? "0%" : "150%"}
              fill="url(#checkerTop)"
              style={{
                transition: "r 2s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </svg>
        </div>
      )}
      
      {/* PHASE 1 & 2: Radial Checkers (Bottom Half) */}
      {phase < 3 && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          overflow: "hidden",
          opacity: phase === 2 ? 0 : 1,
          transition: "opacity 0.8s ease-out",
        }}>
          <svg width="100%" height="100%" style={{ transform: "scale(1.2)" }}>
            <defs>
              <pattern id="checkerBottom" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill={colors.purple} />
                <rect x="20" width="20" height="20" fill="#000" />
                <rect y="20" width="20" height="20" fill="#000" />
                <rect x="20" y="20" width="20" height="20" fill={colors.purple} />
              </pattern>
            </defs>
            <circle 
              cx="50%" 
              cy="0%" 
              r={phase === 1 ? "0%" : "150%"}
              fill="url(#checkerBottom)"
              style={{
                transition: "r 2s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </svg>
        </div>
      )}

      {/* PHASE 1: Scrolling 2025 - Ultra Condensed + Italic */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        transform: phase === 1 ? "translateY(-50%)" : "translateY(200%)",
        transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        opacity: phase < 3 ? 1 : 0,
      }}>
      <div style={{
        display: "inline-block",
        fontSize: "clamp(120px, 30vw, 200px)",
        fontWeight: 900,
        color: colors.purple,
        WebkitTextStroke: "3px white",
        paintOrder: "stroke fill",
        fontFamily: "'Spotify Mix Ultra', 'Spotify Mix', sans-serif",
        letterSpacing: "-8px",
        fontStretch: "ultra-condensed",
        fontStyle: "italic",
        animation: "scrollText 3s linear infinite",
      }}>
        2025 2025 2025 2025 2025
      </div>
      </div>

      {/* PHASE 3: Side Radial Checker (Left Quarter) */}
      {phase === 3 && (
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          overflow: "hidden",
          opacity: 1,
          animation: "slideInFromLeft 1s ease-out",
        }}>
          <svg width="200%" height="100%" style={{ transform: "translateX(-25%)" }}>
            <defs>
              <pattern id="checkerSide" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill={colors.purple} />
                <rect x="20" width="20" height="20" fill="#000" />
                <rect y="20" width="20" height="20" fill="#000" />
                <rect x="20" y="20" width="20" height="20" fill={colors.purple} />
              </pattern>
            </defs>
            <circle 
              cx="0%" 
              cy="50%" 
              r="80%"
              fill="url(#checkerSide)"
            />
          </svg>
        </div>
      )}

      {/* PHASE 3: Swoosh Calligraphy Animation */}
      {phase === 3 && (
        <svg 
          width="100%" 
          height="100%" 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 2,
          }}
          viewBox="0 0 400 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 50 350 Q 150 280, 250 320 T 400 400 Q 350 450, 380 500"
            stroke={colors.purple}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              animation: "drawSwoosh 2s ease-out forwards",
            }}
          />
          <path
            d="M 60 360 Q 155 290, 255 330 T 410 410"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="800"
            strokeDashoffset="800"
            opacity="0.6"
            style={{
              animation: "drawSwoosh 2s ease-out 0.2s forwards",
            }}
          />
        </svg>
      )}

      {/* PHASE 3: Polaroid Pictures */}
      {phase === 3 && (
        <>
          {/* Top Left Polaroid - Crooked */}
          <div style={{
            position: "absolute",
            top: 60,
            left: 30,
            width: 120,
            background: "white",
            padding: 8,
            paddingBottom: 40,
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transform: "rotate(-8deg)",
            zIndex: 3,
            animation: "dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards",
          }}>
            <img 
              src={CDN.images.bronHeadphones}
              alt="LeBron"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Top Right Polaroid */}
          <div style={{
            position: "absolute",
            top: 80,
            right: 30,
            width: 120,
            background: "white",
            padding: 8,
            paddingBottom: 40,
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transform: "rotate(5deg)",
            zIndex: 3,
            animation: "dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s backwards",
          }}>
            <img 
              src={CDN.images.bronHeadphones2}
              alt="LeBron"
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Middle Polaroid - Overlapping */}
          <div style={{
            position: "absolute",
            top: 140,
            left: "50%",
            transform: "translateX(-50%) rotate(-3deg)",
            width: 130,
            background: "white",
            padding: 8,
            paddingBottom: 40,
            boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
            zIndex: 4,
            animation: "dropIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s backwards",
          }}>
            <img 
              src={CDN.images.salsaBron}
              alt="LeBron"
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </>
      )}

      {/* PHASE 3: Main Text - Using Ultra-Expanded Font */}
      {phase === 3 && (
        <div style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          zIndex: 5,
          textAlign: "center",
        }}>
          <h1 style={{
            fontSize: "clamp(48px, 14vw, 80px)",
            fontWeight: 900,
            color: colors.purple,
            WebkitTextStroke: "2px white",
            paintOrder: "stroke fill",
            fontFamily: "'Spotify Mix', sans-serif",
            letterSpacing: "2px",
            fontStretch: "ultra-expanded",
            margin: 0,
            lineHeight: 0.9,
            animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s backwards",
          }}>
            BRONIFY
          </h1>
          <h2 style={{
            fontSize: "clamp(40px, 12vw, 68px)",
            fontWeight: 900,
            color: colors.purple,
            WebkitTextStroke: "2px white",
            paintOrder: "stroke fill",
            fontFamily: "'Spotify Mix', sans-serif",
            letterSpacing: "1px",
            fontStretch: "expanded",
            margin: "8px 0 0 0",
            lineHeight: 0.9,
            animation: "popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s backwards",
          }}>
            WRAPPED
          </h2>
          <div style={{
            width: 100,
            height: 4,
            background: colors.purple,
            margin: "20px auto 16px",
            animation: "expandWidth 0.6s ease-out 1.6s backwards",
          }} />
          <p style={{
            fontSize: "clamp(24px, 6vw, 36px)",
            fontWeight: 900,
            color: colors.gold,
            fontFamily: "'Spotify Mix', sans-serif",
            fontStyle: "italic",
            margin: 0,
            textShadow: `2px 2px 4px rgba(0,0,0,0.5)`,
            WebkitTextStroke: `1px ${colors.lakersPurple}`,
            paintOrder: "stroke fill",
            animation: "fadeIn 0.5s ease-out 1.8s backwards",
          }}>
            2025
          </p>
        </div>
      )}

      {/* Crown SVG */}
      {phase === 3 && (
        <div style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          animation: "pulse 2s ease-in-out infinite, fadeIn 0.5s ease-out 2s backwards",
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill={colors.purple}>
            <path d="M12 2L15 8L21 9L16.5 14L18 21L12 17.5L6 21L7.5 14L3 9L9 8L12 2Z" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>
      )}

      <style>{`
        @keyframes scrollText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20%); }
        }
        
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(-25%);
            opacity: 1;
          }
        }
        
        @keyframes drawSwoosh {
          to {
            strokeDashoffset: 0;
          }
        }
        
        @keyframes dropIn {
          from {
            transform: translateY(-100px) rotate(-15deg);
            opacity: 0;
          }
          to {
            transform: translateY(0) rotate(-8deg);
            opacity: 1;
          }
        }
        
        @keyframes popIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

// Bouncing Ball Component - State-Based Physics
const BouncingBall = ({ startX, startY, endY, onComplete }) => {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [trails, setTrails] = useState([]);
  const velocityRef = useRef({ x: 2, y: 0 });
  const completedRef = useRef(false);
  
  const ballSize = 20;
  const gravity = 0.6;
  const bounce = 0.65;
  const stairSteps = [
    { y: startY + 100 },
    { y: startY + 200 },
    { y: startY + 280 },
    { y: startY + 340 },
    { y: endY }
  ];
  const currentStepRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (completedRef.current) return prev;
        
        let newVx = velocityRef.current.x;
        let newVy = velocityRef.current.y + gravity;
        let newX = prev.x + newVx;
        let newY = prev.y + newVy;

        const currentStep = stairSteps[currentStepRef.current];
        
        // Check if we've reached current step
        if (currentStep && newY + ballSize >= currentStep.y) {
          newY = currentStep.y - ballSize;
          newVy = -newVy * bounce;
          
          // Add trail
          setTrails(t => [...t, { x: newX, y: newY, id: Date.now() }]);
          
          // Move to next step on bounce
          if (Math.abs(newVy) < 8) {
            currentStepRef.current++;
            if (currentStepRef.current >= stairSteps.length) {
              completedRef.current = true;
              if (onComplete) {
                setTimeout(onComplete, 200);
              }
            } else {
              newVy = -12; // Give it a push to next step
            }
          }
        }

        // Slight horizontal drift
        newVx *= 0.98;

        velocityRef.current = { x: newVx, y: newVy };
        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [startX, startY, endY, onComplete]);

  return (
    <>
      {/* Trails */}
      {trails.map((trail, i) => (
        <div
          key={trail.id}
          style={{
            position: "absolute",
            left: trail.x,
            top: trail.y,
            width: 40,
            height: 2,
            background: `linear-gradient(90deg, ${colors.gold}80, transparent)`,
            transform: "rotate(-30deg)",
            transformOrigin: "left center",
            opacity: 0.5 - (i * 0.05),
            pointerEvents: "none",
          }}
        />
      ))}
      
      {/* Ball */}
      {!completedRef.current && (
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${colors.gold}, #d99a00)`,
            boxShadow: `0 0 30px ${colors.gold}`,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};

// Story 2: You Listened, We Counted - Cleaner Spotify Design with Basketball Bounce
const Story2_WeListened = ({ action }) => {
  const [phase, setPhase] = useState(0);
  const [youListenedText, setYouListenedText] = useState("");
  const [weCountedText, setWeCountedText] = useState("");
  const [showBall, setShowBall] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);
  
  useEffect(() => { 
    action("play");
    
    // Load audio asynchronously
    audioManager.play(CDN.audio.LeChosenOne, { volume: 0.6, loop: true })
      .then(() => {
        setAudioLoading(false);
        console.log('✅ Story 2 audio loaded');
      })
      .catch(err => {
        console.log('❌ Story 2 audio failed', err);
        setAudioLoading(false);
      });
    
    // Define text and timing constants
    const youText = "You listened.";
    const weText = "We counted.";
    const typeSpeed = 80;
    
    // Calculate timing offsets
    const youTypingTime = youText.length * typeSpeed;
    const ballAnimationTime = 2500;
    
    // Phase 0: Type "You listened." letter by letter
    let youIndex = 0;
    const youTyper = setInterval(() => {
      if (youIndex < youText.length) {
        setYouListenedText(youText.substring(0, youIndex + 1));
        youIndex++;
      } else {
        clearInterval(youTyper);
        setTimeout(() => {
          setPhase(1);
          setShowBall(true);
        }, 300);
      }
    }, typeSpeed);
    
    // Phase 2: Type "We counted." after ball animation
    setTimeout(() => {
      setPhase(2);
      let weIndex = 0;
      const weTyper = setInterval(() => {
        if (weIndex < weText.length) {
          setWeCountedText(weText.substring(0, weIndex + 1));
          weIndex++;
        } else {
          clearInterval(weTyper);
          setTimeout(() => setPhase(3), 300);
        }
      }, typeSpeed);
    }, youTypingTime + 300 + ballAnimationTime + 300);
    
    // Phase 3: Show LeBron
    setTimeout(() => setPhase(4), youTypingTime + 300 + ballAnimationTime + 300 + weText.length * typeSpeed + 500);
    
    // Phase 4: Show checker
    setTimeout(() => setPhase(5), youTypingTime + 300 + ballAnimationTime + 300 + weText.length * typeSpeed + 1000);
    
    return () => {
      audioManager.stop();
    };
  }, []);

  return (
    <div style={{ 
      ...baseStyle, 
      background: phase >= 2 ? colors.gold : colors.wine,
      transition: "background 1s ease-in-out",
      justifyContent: "space-between",
      padding: 0,
    }}>
      
      {/* Audio loading indicator */}
      {audioLoading && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: '24px',
          zIndex: 9999,
          animation: 'pulse 1s ease-in-out infinite',
        }}>
          🎵
        </div>
      )}
      
      {/* Spotify logo */}
      <div style={{ 
        position: "absolute",
        top: 24,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>

      {/* Canvas for bouncing ball */}
      {phase >= 1 && phase < 2 && (
        <BouncingBall 
          startX={180} 
          startY={120} 
          endY={560}
          onComplete={() => setPhase(2)}
        />
      )}

      {/* Main content area */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        paddingLeft: 40,
        paddingTop: 80,
        position: "relative",
      }}>
        {/* "You listened." */}
        <h1 style={{
          fontSize: "clamp(56px, 14vw, 80px)",
          fontWeight: 900,
          color: phase >= 2 ? "#000000" : colors.white,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStretch: "expanded",
          margin: 0,
          lineHeight: 1.1,
          position: "relative",
          transition: "color 0.5s ease-in-out",
        }}>
          {youListenedText}
        </h1>
        
        {/* "We counted." */}
        {phase >= 2 && (
          <h1 style={{
            fontSize: "clamp(56px, 14vw, 80px)",
            fontWeight: 900,
            color: "#000000",
            fontFamily: "'Spotify Mix', sans-serif",
            fontStretch: "expanded",
            margin: 0,
            marginTop: 16,
            lineHeight: 1.1,
            animation: "fadeIn 0.5s ease-out",
          }}>
            {weCountedText}
          </h1>
        )}
      </div>

      {/* LeBron with headphones - Top Right Corner */}
      {phase >= 4 && (
        <div style={{
          position: "absolute",
          top: 100,
          right: 30,
          width: 150,
          height: 150,
          zIndex: 6,
          opacity: 0,
          animation: "fadeIn 0.8s ease-out 0.2s forwards",
        }}>
          <img 
            src={CDN.images.bronHeadphones}
            alt="LeBron"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(1.1) drop-shadow(0 4px 12px rgba(253, 187, 48, 0.3))",
            }}
          />
        </div>
      )}

      {/* Wave pattern at bottom - Cavaliers Colors */}
      {phase >= 5 && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          overflow: "hidden",
          opacity: 0,
          animation: "fadeIn 1s ease-out forwards",
        }}>
          <svg 
            viewBox="0 0 400 300" 
            preserveAspectRatio="none"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            {/* Curved wave lines */}
            {[...Array(8)].map((_, i) => {
              const offset = i * 30;
              const opacity = 0.12 - (i * 0.012);
              return (
                <path
                  key={i}
                  d={`M ${-50 + offset} 300 Q ${100 + offset} ${100 - i * 10} ${250 + offset} 150 T ${550 + offset} 200`}
                  fill="none"
                  stroke={colors.wine}
                  strokeWidth="30"
                  opacity={opacity}
                  style={{
                    animation: `slideWave ${3 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              );
            })}
            
            {/* Gold accent shape */}
            <path
              d="M 350 200 Q 380 180 400 190 L 400 300 L 350 300 Z"
              fill={colors.gold}
              opacity="0.5"
              style={{
                animation: "fadeIn 1.2s ease-out 0.5s backwards",
              }}
            />
            
            {/* Radial checker pattern overlay */}
            <defs>
              <pattern id="checkerWave" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="15" height="15" fill={colors.gold} opacity="0.2" />
                <rect x="15" width="15" height="15" fill={colors.wine} opacity="0.1" />
                <rect y="15" width="15" height="15" fill={colors.wine} opacity="0.1" />
                <rect x="15" y="15" width="15" height="15" fill={colors.gold} opacity="0.2" />
              </pattern>
            </defs>
            <circle 
              cx="50%" 
              cy="100%" 
              r="40%"
              fill="url(#checkerWave)"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      <style>{`
        @keyframes slideWave {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-20px) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

// Story 3: Minutes Listened + LeBron Points
const Story3_Minutes = ({ action }) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [logoColorIndex, setLogoColorIndex] = useState(0);
  const [audioLoading, setAudioLoading] = useState(true);
  
  useEffect(() => {
    action("play");
    
    // Load audio asynchronously
    audioManager.play(CDN.audio.LakersIn5, { volume: 0.6, loop: true })
      .then(() => {
        setAudioLoading(false);
        console.log('✅ Story 3 audio loaded');
      })
      .catch(err => {
        console.log('❌ Story 3 audio failed', err);
        setAudioLoading(false);
      });
    
    return () => {
      audioManager.stop();
    };
  }, []);
  
  // Team colors for LeBron's journey
  const teamColors = [
    { text: "#005643", outline: "#FDBB30" }, // St. Vincent-St. Mary's
    { text: "#860038", outline: "#FDBB30" }, // Cavaliers
    { text: "#98002e", outline: "#FFFFFF" }, // Miami Heat
    { text: "#552583", outline: "#FDB927" }, // Lakers
  ];
  
  // Get color based on percentage of total
  const getNumberStyle = (currentCount, targetCount) => {
    const percentage = (currentCount / targetCount) * 100;
    let colorIndex;
    
    if (percentage < 25) {
      colorIndex = 0; // High school era
    } else if (percentage < 50) {
      colorIndex = 1; // First Cavs stint
    } else if (percentage < 75) {
      colorIndex = 2; // Miami era
    } else {
      colorIndex = 3; // Lakers era
    }
    
    const colors = teamColors[colorIndex];
    
    return {
      color: colors.text,
      WebkitTextStroke: `2px ${colors.outline}`,
      textShadow: `0 0 40px ${colors.text}`,
    };
  };
  
  // Get logo color
  const getLogoColor = () => {
    if (!isComplete) {
      // Follow number's color while counting
      const percentage = (count / userData.minutesListened) * 100;
      if (percentage < 25) return teamColors[0].text;
      if (percentage < 50) return teamColors[1].text;
      if (percentage < 75) return teamColors[2].text;
      return teamColors[3].text;
    } else {
      // Cycle through all colors after complete
      return teamColors[logoColorIndex].text;
    }
  };
  
  useEffect(() => {
    const target = userData.minutesListened;
    const duration = 3000; // 3 seconds to count up
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
        setIsComplete(true);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);
  
  // Cycle logo colors after counting is complete
  useEffect(() => {
    if (!isComplete) return;
    
    const colorCycle = setInterval(() => {
      setLogoColorIndex(prev => (prev + 1) % teamColors.length);
    }, 800); // Change color every 800ms
    
    return () => clearInterval(colorCycle);
  }, [isComplete]);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#000000", // Lakers black
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Spotify Mix', sans-serif",
      padding: "40px",
    }}>
      
      {/* Audio loading indicator */}
      {audioLoading && (
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: '24px',
          zIndex: 9999,
          animation: 'pulse 1s ease-in-out infinite',
        }}>
          🎵
        </div>
      )}
      
      {/* "Minutes Listened" label - only show when complete */}
      {isComplete && (
        <p style={{ 
          fontSize: "clamp(14px, 3.5vw, 18px)",
          color: "#B3B3B3",
          textAlign: "center",
          marginBottom: 16,
          fontWeight: 900,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeIn 0.6s ease-out forwards",
        }}>
          Minutes Listened
        </p>
      )}
      
      {/* Counting number with color changes */}
      <h1 style={{ 
        fontSize: "clamp(72px, 18vw, 120px)",
        fontWeight: 900,
        fontFamily: "'Spotify Mix', sans-serif",
        fontStretch: "condensed",
        margin: 0,
        lineHeight: 0.9,
        letterSpacing: "-4px",
        animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards",
        transition: "all 0.3s ease-out",
        ...getNumberStyle(count, userData.minutesListened),
      }}>
        {count.toLocaleString()}
      </h1>
      
      {/* LeBron SVG Logo below the number */}
      <div 
        className="lebron-logo"
        style={{
          marginTop: 32,
          width: "clamp(80px, 15vw, 120px)",
          height: "clamp(80px, 15vw, 120px)",
          opacity: count > 0 ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          filter: `drop-shadow(0 0 20px ${getLogoColor()})`,
        }}
      >
        <img 
          src={CDN.images.lebronLogo}
          alt="LeBron Logo"
          style={{
            width: "100%",
            height: "100%",
            transition: "filter 0.5s ease-out",
          }}
        />
        <style>{`
          .lebron-logo img {
            filter: ${
              getLogoColor() === '#005643' 
                ? 'invert(23%) sepia(93%) saturate(2027%) hue-rotate(143deg) brightness(96%) contrast(101%)' 
              : getLogoColor() === '#860038' 
                ? 'invert(9%) sepia(98%) saturate(7426%) hue-rotate(336deg) brightness(88%) contrast(113%)'
              : getLogoColor() === '#98002e' 
                ? 'invert(9%) sepia(95%) saturate(6383%) hue-rotate(343deg) brightness(98%) contrast(114%)'
                : 'invert(19%) sepia(69%) saturate(2598%) hue-rotate(256deg) brightness(87%) contrast(105%)'
            };
          }
        `}</style>
      </div>
      
      
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Story 4: Taste Can't Be Defined
// Story 4: You Know Ball
const Story4_TasteDefined = ({ action }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showImage, setShowImage] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    action("play");
    
    // Start audio
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    // Typewriter animation
    const line1 = "You know ball.";
    const line2 = "Let's prove it.";
    const typeSpeed = 80;
    
    // Type first line
    let index1 = 0;
    const timer1 = setInterval(() => {
      if (index1 < line1.length) {
        setText1(line1.substring(0, index1 + 1));
        index1++;
      } else {
        clearInterval(timer1);
        // Start second line after brief pause
        setTimeout(() => {
          let index2 = 0;
          const timer2 = setInterval(() => {
            if (index2 < line2.length) {
              setText2(line2.substring(0, index2 + 1));
              index2++;
            } else {
              clearInterval(timer2);
              // Show image after typing completes
              setTimeout(() => setShowImage(true), 300);
            }
          }, typeSpeed);
        }, 200);
      }
    }, typeSpeed);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(180deg, ${colors.purple} 0%, #3d1d6e 50%, ${colors.purple} 100%)`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Spotify Mix', sans-serif",
      padding: "50px 30px 30px 30px",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.thatsBron} type="audio/mpeg" />
      </audio>
      
      {/* Basketball texture pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 40px,
          ${colors.gold} 40px,
          ${colors.gold} 42px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 40px,
          ${colors.gold} 40px,
          ${colors.gold} 42px
        )`,
      }} />
      
      {/* Floating basketballs */}
      {['🏀', '🏀', '🏀'].map((emoji, i) => (
        <div key={i} style={{
          position: "absolute",
          fontSize: `clamp(${25 + i * 10}px, ${6 + i * 2}vw, ${40 + i * 15}px)`,
          opacity: 0.2,
          left: i === 0 ? "8%" : i === 1 ? "85%" : "75%",
          top: i === 0 ? "20%" : i === 1 ? "15%" : "65%",
          animation: `bounce ${2 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }}>
          {emoji}
        </div>
      ))}
      
      {/* Crown accent top right */}
      <div style={{
        position: "absolute",
        top: "5%",
        right: "8%",
        width: "clamp(30px, 8vw, 50px)",
        height: "clamp(30px, 8vw, 50px)",
        animation: "float 3s ease-in-out infinite",
      }}>
        <img src={CDN.images.lebronLogo} alt="LeBron" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(200px, 60vw, 350px)",
        height: "clamp(100px, 30vw, 180px)",
        background: `radial-gradient(ellipse, ${colors.gold}20 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />
      
      {/* Main headline at top with typewriter */}
      <div style={{
        textAlign: "center",
        width: "100%",
        zIndex: 2,
      }}>
        {/* Primary text - "You know ball" */}
        <h1 style={{ 
          fontSize: "clamp(48px, 13vw, 85px)",
          fontWeight: 900,
          color: colors.gold,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStretch: "expanded",
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          textShadow: `0 4px 0 ${colors.wine}, 0 0 60px ${colors.gold}50`,
        }}>
          {text1}
        </h1>
        
        {/* Secondary text - "Let's prove it" */}
        {text2 && (
          <p style={{ 
            fontSize: "clamp(22px, 5.5vw, 36px)",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "'Spotify Mix', sans-serif",
            fontStyle: "italic",
            margin: "clamp(8px, 2vw, 16px) 0 0 0",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            opacity: 0,
            animation: "slideIn 0.6s ease-out forwards",
          }}>
            {text2}
          </p>
        )}
      </div>
      
      {/* LeBron silencer image at bottom */}
      {showImage && (
        <div style={{
          width: "100%",
          maxWidth: "clamp(260px, 75vw, 480px)",
          marginTop: "auto",
          opacity: 0,
          animation: "fadeInUp 0.8s ease-out forwards",
          position: "relative",
        }}>
          {/* Glow behind image */}
          <div style={{
            position: "absolute",
            bottom: "-10%",
            left: "10%",
            right: "10%",
            height: "50%",
            background: `radial-gradient(ellipse, ${colors.gold}40 0%, transparent 70%)`,
            filter: "blur(20px)",
          }} />
          <img 
            src={CDN.images.silencer}
            alt="LeBron silencer"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "clamp(8px, 2vw, 16px)",
              boxShadow: `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.gold}30`,
              position: "relative",
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

// Story 4.5: Genre Counter (23 genres)
const Story4_5_GenreCounter = ({ action }) => {
  const [count, setCount] = useState(0);
  const audioRef = useRef(null);
  
  useEffect(() => {
    action("play");
    
    // Continue audio from previous slide
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    // Counter animation
    const target = 23;
    const duration = 2000;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: `linear-gradient(180deg, ${colors.purple} 0%, #1a0a2e 100%)`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Spotify Mix', sans-serif",
      padding: "40px",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronnyJean} type="audio/mpeg" />
      </audio>
      
      {/* Floating music notes */}
      {['🎵', '🎶', '🎤', '🎧', '🎸'].map((emoji, i) => (
        <div key={i} style={{
          position: "absolute",
          fontSize: `clamp(${20 + i * 8}px, ${5 + i * 2}vw, ${30 + i * 10}px)`,
          opacity: 0.15 + (i * 0.05),
          left: `${10 + i * 18}%`,
          top: `${15 + (i % 3) * 25}%`,
          animation: `float${i % 2 === 0 ? 'Up' : 'Down'} ${3 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }}>
          {emoji}
        </div>
      ))}
      
      {/* Radial glow behind number */}
      <div style={{
        position: "absolute",
        width: "clamp(200px, 60vw, 400px)",
        height: "clamp(200px, 60vw, 400px)",
        background: `radial-gradient(circle, ${colors.gold}30 0%, transparent 70%)`,
        borderRadius: "50%",
        animation: "pulse 2s ease-in-out infinite",
      }} />
      
      {/* Crown at top */}
      <div style={{
        position: "absolute",
        top: "8%",
        width: "clamp(40px, 12vw, 70px)",
        height: "clamp(40px, 12vw, 70px)",
        opacity: 0,
        animation: "dropIn 0.6s ease-out 0.1s forwards",
      }}>
        <img src={CDN.images.lebronLogo} alt="LeBron" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      
      {/* Counting number */}
      <h1 style={{ 
        fontSize: "clamp(120px, 35vw, 220px)",
        fontWeight: 900,
        color: colors.gold,
        fontFamily: "'Spotify Mix', sans-serif",
        fontStretch: "condensed",
        margin: 0,
        lineHeight: 0.9,
        letterSpacing: "-0.05em",
        textShadow: `0 0 80px ${colors.gold}80, 0 4px 0 ${colors.wine}`,
        animation: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards",
        zIndex: 2,
      }}>
        {count}
      </h1>
      
      {/* "genres" label */}
      <p style={{ 
        fontSize: "clamp(28px, 7vw, 44px)",
        color: colors.gold,
        fontWeight: 700,
        margin: "clamp(10px, 3vw, 20px) 0 0 0",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        animation: "fadeIn 0.8s ease-out 0.5s backwards",
        zIndex: 2,
      }}>
        genres
      </p>
      
      {/* Decorative line */}
      <div style={{
        width: "clamp(60px, 20vw, 100px)",
        height: "4px",
        background: colors.gold,
        marginTop: "clamp(15px, 4vw, 25px)",
        borderRadius: "2px",
        opacity: 0,
        animation: "expandWidth 0.6s ease-out 0.8s forwards",
      }} />
      
      {/* Checkered pattern at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "15%",
        background: `repeating-conic-gradient(${colors.gold} 0% 25%, ${colors.purple} 0% 50%) 50% / 40px 40px`,
        opacity: 0.3,
      }} />
      
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expandWidth {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: clamp(60px, 20vw, 100px); }
        }
      `}</style>
    </div>
  );
};

// Story 5: Top Genres
// Story 5: Top Genres - Spotify Style with LeBron's Team Colors & Wave Animation
const Story5_TopGenres = ({ action }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const audioRef = useRef(null);
  
  useEffect(() => {
    action("play");
    
    // Continue audio from previous slide
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  const genres = [
    { name: "Bron&B", team: "stvm" },
    { name: "BronPop", team: "cavs" },
    { name: "LeHop", team: "heat" },
    { name: "Bronwave", team: "cavsAway" },
    { name: "LeFi", team: "lakers" },
  ];
  
  // Team colors based on LeBron's career
  const getTeamColors = (team) => {
    switch(team) {
      case "stvm": // St. Vincent-St. Mary's
        return { bg: "#005643", text: "#FFFFFF" }; // Green bg, White text
      case "cavs": // Cavaliers
        return { bg: "#860038", text: "#FFFFFF" }; // Wine bg, White text
      case "heat": // Miami Heat
        return { bg: "#98002e", text: "#FFFFFF" }; // Red bg, White text
      case "cavsAway": // Cavaliers reversed/away
        return { bg: "#FDBB30", text: "#000000" }; // Gold bg, Black text
      case "lakers": // Lakers
        return { bg: "#552583", text: "#FDB927" }; // Purple bg, Gold text
      default:
        return { bg: "#000000", text: "#FFFFFF" };
    }
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: colors.gold, // Lakers gold background
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Spotify Mix', sans-serif",
      padding: "50px 30px 30px 30px",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronThoughts} type="audio/mpeg" />
      </audio>
      
      {/* Radial Checker Pattern Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.15,
        pointerEvents: "none",
        zIndex: 0,
      }}>
        <svg width="100%" height="100%" style={{ transform: "scale(1.5)" }}>
          <defs>
            <pattern id="genreCheckers" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill={colors.purple} />
              <rect x="30" width="30" height="30" fill="transparent" />
              <rect y="30" width="30" height="30" fill="transparent" />
              <rect x="30" y="30" width="30" height="30" fill={colors.purple} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#genreCheckers)" />
        </svg>
      </div>
      
      {/* Header */}
      <p style={{ 
        fontSize: "clamp(16px, 4vw, 20px)",
        color: "#000000",
        textAlign: "center",
        margin: 0,
        fontWeight: 900,
        letterSpacing: "1px",
        fontFamily: "'Spotify Mix', sans-serif",
        animation: "fadeIn 0.6s ease-out",
        position: "relative",
        zIndex: 2,
      }}>
        Your top genres
      </p>
      
      {/* Genre Banners - Spotify Style with Wave Animation */}
      <div style={{ 
        marginTop: 40,
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        zIndex: 2,
      }}>
        {genres.map((genre, i) => {
          const colors = getTeamColors(genre.team);
          const isHovered = hoveredIndex === i;
          
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                background: colors.bg,
                padding: "20px 30px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: 0,
                animation: `slideInLeft 0.6s ease-out ${i * 0.15 + 0.5}s forwards`,
                borderBottom: i < genres.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                transform: isHovered ? "scale(1.02) translateX(10px)" : "scale(1) translateX(0)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontSize: "clamp(28px, 7vw, 40px)",
                fontWeight: 900,
                color: colors.text,
                fontFamily: "'Spotify Mix', sans-serif",
                minWidth: "50px",
                transform: isHovered ? "scale(1.2) rotate(5deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.3s ease",
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: "clamp(28px, 7vw, 42px)",
                fontWeight: 900,
                color: colors.text,
                fontFamily: "'Spotify Mix', sans-serif",
                fontStretch: "expanded",
                flex: 1,
                letterSpacing: "-1px",
                display: "inline-block",
                animation: `textWave 0.8s ease-out ${i * 0.15 + 0.7}s`,
              }}>
                {genre.name.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    style={{
                      display: "inline-block",
                      animation: `charWave 0.5s ease-out ${i * 0.15 + 0.7 + charIndex * 0.05}s`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes charWave {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.15);
          }
        }
        
        @keyframes textWave {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Story 6: Cleveland, This Is For You
const Story6_Mindset = ({ action }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    action("play");
    
    // Start audio
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    // Typewriter animation
    const line1 = "CLEVELAND. THIS IS FOR YOU.";
    const line2 = "Sorry we left.";
    const typeSpeed = 80;
    
    // Type first line
    let index1 = 0;
    const timer1 = setInterval(() => {
      if (index1 < line1.length) {
        setText1(line1.substring(0, index1 + 1));
        index1++;
      } else {
        clearInterval(timer1);
        // Start second line after brief pause
        setTimeout(() => {
          let index2 = 0;
          const timer2 = setInterval(() => {
            if (index2 < line2.length) {
              setText2(line2.substring(0, index2 + 1));
              index2++;
            } else {
              clearInterval(timer2);
              // Show button after text completes
              setTimeout(() => setShowButton(true), 600);
            }
          }, typeSpeed);
        }, 300);
      }
    }, typeSpeed);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: colors.wine, // Cavaliers Wine
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Spotify Mix', sans-serif",
      padding: "60px 40px",
    }}>
      
      {/* Background Audio - Cleveland This Is For You */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.clevelandThisIsForYou} type="audio/mpeg" />
      </audio>
      
      {/* Main Title with typewriter */}
      <h1 style={{ 
        fontSize: "clamp(36px, 9vw, 60px)",
        fontWeight: 900,
        color: colors.gold, // Cavaliers Gold
        fontFamily: "'Spotify Mix', sans-serif",
        fontStretch: "expanded",
        margin: 0,
        lineHeight: 1.2,
        letterSpacing: "-1px",
        textAlign: "center",
      }}>
        {text1}
      </h1>
      
      {/* Subtitle with staggered character animation */}
      {text2 && (
        <p style={{ 
          fontSize: "clamp(20px, 5vw, 32px)",
          fontWeight: 900,
          color: colors.gold,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStretch: "expanded",
          margin: "20px 0 0 0",
          lineHeight: 1.2,
          letterSpacing: "0px",
          textAlign: "center",
        }}>
          {text2.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: `charFadeIn 0.3s ease-out ${i * 0.08}s forwards`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      )}
      
      {/* Bronify Button */}
      {showButton && (
        <div
          style={{
            marginTop: "clamp(30px, 6vw, 50px)",
            position: "relative",
            zIndex: 9999,
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open("https://bronifymusics.vercel.app", "_blank");
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            style={{
              padding: "clamp(12px, 2.5vw, 18px) clamp(28px, 6vw, 48px)",
              background: colors.gold,
              color: colors.wine,
              fontSize: "clamp(16px, 3.5vw, 24px)",
              fontWeight: 900,
              fontFamily: "'Spotify Mix', sans-serif",
              fontStretch: "expanded",
              textDecoration: "none",
              borderRadius: "clamp(24px, 5vw, 32px)",
              border: `3px solid ${colors.wine}`,
              textAlign: "center",
              cursor: "pointer",
              opacity: 0,
              animation: "buttonFadeIn 0.6s ease-out forwards",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              letterSpacing: "-0.5px",
              display: "inline-block",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(253, 187, 48, 0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Take me to Bronify
          </button>
        </div>
      )}
      
      <style>{`
        @keyframes charFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes buttonFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Story 7: Your LeBron Era
// Story 7: Which LeBron Are You Quiz (comes after Cleveland slide)
const Story7_WhichLebronQuiz = ({ action }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonStates, setButtonStates] = useState({});
  const audioRef = useRef(null);
  const musicRef = useRef(null);
  
  // Team USA colors
  const usaColors = {
    bg: "#0A1628", // Deep navy
    red: "#B31942",
    white: "#FFFFFF", 
    blue: "#0A3161",
  };
  
  useEffect(() => { 
    action("pause"); // Pause auto-advance for user interaction
    // Play background music
    if (musicRef.current) {
      musicRef.current.volume = 0.6;
      musicRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, []);

  const options = [
    { 
      id: 1, 
      text: "Carries his team on his back", 
      result: "cavs",
      hoverBg: colors.wine, // Cavs wine
      hoverText: colors.gold, // Cavs gold
    },
    { 
      id: 2, 
      text: "Aura", 
      result: "miami",
      hoverBg: "#98002e", // Miami Heat red
      hoverText: "#FFFFFF", // Miami Heat white
    },
    { 
      id: 3, 
      text: "Longevity", 
      result: "lakers",
      hoverBg: "#552583", // Lakers purple
      hoverText: "#FDB927", // Lakers gold
    },
    { 
      id: 4, 
      text: "He's the Chosen One", 
      result: "chosen",
      hoverBg: "#005643", // STVM green
      hoverText: "#FDBB30", // STVM gold
    },
    { 
      id: 5, 
      text: "He's a bum, Jordan better", 
      result: "jordan",
      hoverBg: "#ff0000",
      hoverText: "#ffffff",
    },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    
    if (option.result === "jordan") {
      // Play LeBron sound effect and redirect out
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setTimeout(() => {
            window.location.href = "https://www.tiktok.com/@musicmediaco/video/7343777180360379690?q=lebron%20first%20day%20out&t=1766664007956";
          }, 1500);
        }).catch(() => {
          setTimeout(() => {
            window.location.href = "https://www.tiktok.com/@musicmediaco/video/7343777180360379690?q=lebron%20first%20day%20out&t=1766664007956";
          }, 500);
        });
      } else {
        setTimeout(() => {
          window.location.href = "https://www.tiktok.com/@musicmediaco/video/7343777180360379690?q=lebron%20first%20day%20out&t=1766664007956";
        }, 500);
      }
    } else {
      // Store selection and immediately advance to result slide
      sessionStorage.setItem('lebronChoice', option.result);
      // Quick visual feedback then advance
      setTimeout(() => {
        action("play"); // This advances to the next slide
      }, 300); // Reduced delay for snappier response
    }
  };

  const handleHover = (id, isHovered) => {
    setButtonStates(prev => ({ ...prev, [id]: isHovered }));
  };

  return (
    <div 
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(180deg, ${usaColors.bg} 0%, ${usaColors.blue} 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 24px",
        fontFamily: "'Spotify Mix', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      {/* Background Music */}
      <audio ref={musicRef} loop>
        <source src={CDN.audio.YoungWildAndThree} type="audio/mpeg" />
      </audio>
      
      {/* Jordan Sound Effect */}
      <audio ref={audioRef} preload="auto">
        <source src={CDN.audio.LEBRONSoundEffect} type="audio/mpeg" />
      </audio>
      
      {/* Title */}
      <h1 style={{
        fontSize: "clamp(32px, 8vw, 52px)",
        fontWeight: 900,
        color: usaColors.white,
        fontFamily: "'Spotify Mix', sans-serif",
        fontStretch: "expanded",
        textAlign: "center",
        margin: "0 0 40px 0",
        lineHeight: 1.1,
        zIndex: 2,
        textShadow: `0 4px 20px rgba(0,0,0,0.5)`,
      }}>
        WHY IS BRON THE GOAT?
      </h1>
      
      {/* Options - Using CSS for hover since React state isn't working well with story clicks */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        zIndex: 9999,
        position: "relative",
      }}>
        {options.map((option, index) => {
          const isHovered = buttonStates[option.id];
          const isSelected = selectedOption === option.id;
          
          return (
            <div
              key={option.id}
              className={`quiz-option quiz-option-${option.id}`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleHover(option.id, true)}
              onMouseLeave={() => handleHover(option.id, false)}
              style={{
                padding: "clamp(16px, 3.5vw, 22px) clamp(20px, 4vw, 28px)",
                background: isSelected ? option.hoverBg : isHovered ? option.hoverBg : "rgba(255,255,255,0.08)",
                color: isSelected ? option.hoverText : isHovered ? option.hoverText : usaColors.white,
                border: `3px solid ${isSelected ? option.hoverBg : isHovered ? option.hoverBg : "rgba(255,255,255,0.3)"}`,
                borderRadius: "16px",
                fontSize: "clamp(15px, 3.5vw, 19px)",
                fontWeight: 800,
                fontFamily: "'Spotify Mix', sans-serif",
                cursor: "pointer",
                textAlign: "center",
                opacity: 0,
                animation: `slideInLeft 0.5s ease-out ${index * 0.1}s forwards`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "scale(1.04) translateX(6px)" : "scale(1)",
                boxShadow: isHovered ? `0 8px 30px ${option.hoverBg}77` : "0 4px 15px rgba(0,0,0,0.2)",
              }}
            >
              {option.text}
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .quiz-option {
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        
        .quiz-option:active {
          transform: scale(0.97) !important;
        }
      `}</style>
    </div>
  );
};

// Story 7 Result: LeBron Result Slide (shows based on user choice from quiz)
const Story7_Result = ({ action }) => {
  const [choice] = useState(sessionStorage.getItem('lebronChoice') || 'cavs');
  const audioRef = useRef(null);
  
  // Audio tracks per result - using CDN URLs
  const audioTracks = {
    cavs: CDN.audio.IWantYouBron,
    miami: CDN.audio.EvilLeBron,
    lakers: CDN.audio.LeRansom,
    chosen: CDN.audio.LePokemon,
  };
  
  useEffect(() => { 
    action("play");
    
    // Play audio for the chosen result
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const results = {
    cavs: {
      title: "Cavs LeBron",
      colors: { bg: colors.wine, text: colors.gold, checker: colors.gold },
      image: CDN.images.lebronChalkTossCavs,
      isPolaroid: false,
    },
    miami: {
      title: "South Beach LeBron",
      colors: { bg: "#98002e", text: "#f9a01b", checker: "#f9a01b" },
      image: CDN.images.lebronDwadeLob,
      isPolaroid: true,
    },
    lakers: {
      title: "Lakers LeBron",
      colors: { bg: colors.lakersPurple, text: colors.gold, checker: colors.gold },
      image: CDN.images.lebronBronny,
      isPolaroid: true,
    },
    chosen: {
      title: "The Chosen Bron",
      colors: { bg: "#005643", text: "#FDBB30", checker: "#FFFFFF" },
      image: CDN.images.chosenBron,
      isPolaroid: true,
    },
  };

  const result = results[choice];
  const audioSrc = audioTracks[choice];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: result.colors.bg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Dynamic Background Audio */}
      <audio ref={audioRef} loop>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
      
      {/* Checkered pattern at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30%",
        opacity: 0.15,
        backgroundImage: `
          linear-gradient(45deg, ${result.colors.checker} 25%, transparent 25%),
          linear-gradient(-45deg, ${result.colors.checker} 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${result.colors.checker} 75%),
          linear-gradient(-45deg, transparent 75%, ${result.colors.checker} 75%)
        `,
        backgroundSize: "30px 30px",
        backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0px",
        pointerEvents: "none",
      }} />
      
      {/* Top Section - Text */}
      <div style={{
        textAlign: "center",
        zIndex: 2,
      }}>
        <p style={{
          fontSize: "clamp(18px, 4vw, 28px)",
          fontWeight: 600,
          color: result.colors.text,
          margin: 0,
          opacity: 0.9,
          animation: "fadeIn 0.6s ease-out",
        }}>
          You are
        </p>
        
        <h1 style={{
          fontSize: "clamp(36px, 10vw, 68px)",
          fontWeight: 900,
          color: result.colors.text,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStretch: "expanded",
          margin: "12px 0 0 0",
          lineHeight: 1.1,
          letterSpacing: "-2px",
          animation: "scaleIn 0.8s ease-out 0.2s backwards",
        }}>
          {result.title}
        </h1>
      </div>
      
      {/* Bottom Section - Image */}
      <div style={{
        zIndex: 2,
        animation: "fadeInUp 1s ease-out 0.5s backwards",
      }}>
        {result.isPolaroid ? (
          <div style={{
            padding: "10px 10px 36px 10px",
            background: "#FFFFFF",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
            transform: "rotate(-2deg)",
            width: "clamp(200px, 42vw, 300px)",
          }}>
            <img 
              src={result.image}
              alt={result.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        ) : (
          <img 
            src={result.image}
            alt={result.title}
            style={{
              width: "clamp(220px, 50vw, 340px)",
              height: "auto",
              display: "block",
              borderRadius: "8px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
            }}
          />
        )}
      </div>
      
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Story 8: Songs Listened - Guess Intro
// Story 8: Songs Intro - Spotify Style with geometric patterns
const Story8_SongsIntro = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronBelongsWithMe} type="audio/mpeg" />
      </audio>
      
      {/* Geometric pattern at bottom - stripes and curves like Spotify */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35%",
        overflow: "hidden",
      }}>
        {/* Vertical stripes */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "5%",
          width: "25%",
          height: "100%",
          background: `repeating-linear-gradient(90deg, #fff 0px, #fff 8px, transparent 8px, transparent 16px)`,
          opacity: 0.9,
        }} />
        
        {/* Purple accent stripe */}
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "22%",
          width: "12px",
          height: "60%",
          background: colors.lakersPurple,
        }} />
        
        {/* Curved white line */}
        <svg style={{ position: "absolute", right: 0, bottom: 0, width: "60%", height: "100%" }} viewBox="0 0 200 150" preserveAspectRatio="none">
          <path d="M 200 0 Q 100 50, 100 150 L 200 150 Z" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="180" cy="100" rx="60" ry="40" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
        
        {/* Half circle */}
        <div style={{
          position: "absolute",
          bottom: "-50px",
          left: "-30px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "3px solid #fff",
          background: "transparent",
        }} />
      </div>
      
      {/* Main content with animations */}
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <p style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 400,
          color: "#fff",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.3s forwards",
        }}>
          You listened to <span style={{ fontWeight: 900, color: colors.gold }}>{userData.totalSongs.toLocaleString()}</span>
        </p>
        <p style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 400,
          color: "#fff",
          margin: "4px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.5s forwards",
        }}>
          songs this year.
        </p>
        
        <p style={{
          fontSize: "clamp(16px, 4vw, 22px)",
          fontWeight: 400,
          color: "#fff",
          margin: "40px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 1s forwards",
        }}>
          But can you guess your <span style={{ fontWeight: 900, color: colors.gold }}>#1</span>?
        </p>
      </div>
      
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Story 9: Quiz - Spotify Style with album art and checkmarks
const Story9_Quiz = ({ action }) => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => { 
    action("pause"); // Pause for interaction
  }, []);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setRevealed(true);
    
    setTimeout(() => {
      action("play");
    }, 2500);
  };

  // Spotify green for correct answer
  const spotifyGreen = "#1DB954";

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "50px 20px 30px 20px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Geometric patterns - checkerboard at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "25%",
        overflow: "hidden",
      }}>
        {/* Checkerboard pattern */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(45deg, #fff 25%, transparent 25%),
            linear-gradient(-45deg, #fff 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #fff 75%),
            linear-gradient(-45deg, transparent 75%, #fff 75%)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          opacity: 0.15,
          transform: "skewY(-5deg)",
          transformOrigin: "bottom left",
        }} />
        
        {/* Purple accent blob */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "-20px",
          width: "100px",
          height: "80px",
          background: colors.lakersPurple,
          borderRadius: "50%",
          opacity: 0.6,
        }} />
      </div>
      
      {/* Header */}
      <h1 style={{
        fontSize: "clamp(28px, 7vw, 40px)",
        fontWeight: 900,
        fontStyle: "italic",
        color: "#fff",
        margin: "0 0 24px 0",
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
      }}>
        {revealed && selected === userData.correctSongIndex ? "You got it!" : "Tap your guess!"}
      </h1>
      
      {/* Song options */}
      <div style={{ 
        width: "100%", 
        maxWidth: "380px", 
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
      }}>
        {userData.songQuizOptions.map((song, i) => {
          const isCorrect = i === userData.correctSongIndex;
          const isSelected = selected === i;
          const isHovered = hoveredIndex === i;
          
          return (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSelect(i);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onMouseEnter={() => !revealed && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 14px",
                background: revealed && isCorrect 
                  ? spotifyGreen
                  : isHovered 
                    ? "rgba(255,255,255,0.15)" 
                    : "rgba(40,40,40,0.9)",
                borderRadius: "8px",
                cursor: selected === null ? "pointer" : "default",
                border: revealed && isSelected && !isCorrect 
                  ? "2px solid #ff4444"
                  : "2px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                transform: isHovered && !revealed ? "scale(1.02)" : "scale(1)",
                pointerEvents: "auto",
                opacity: 0,
                animation: `quizSlideIn 0.5s ease-out ${0.2 + i * 0.1}s forwards`,
              }}
            >
              {/* Album art */}
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "4px",
                marginRight: "14px",
                flexShrink: 0,
                overflow: "hidden",
                background: `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
              }}>
                <img 
                  src={song.albumArt}
                  alt={song.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Song info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ 
                  color: revealed && isCorrect ? "#000" : "#fff", 
                  fontSize: "clamp(14px, 3.5vw, 17px)", 
                  fontWeight: 700, 
                  margin: 0,
                  fontFamily: "'Spotify Mix', sans-serif",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {song.title}
                </p>
                <p style={{ 
                  color: revealed && isCorrect ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.6)", 
                  fontSize: "clamp(12px, 3vw, 14px)", 
                  margin: "2px 0 0 0",
                  fontFamily: "'Spotify Mix', sans-serif",
                }}>
                  {song.artist}
                </p>
              </div>
              
              {/* Checkmark for correct answer */}
              {revealed && isCorrect && (
                <div style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "10px",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#000"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <style>{`
        @keyframes quizSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

// Story 10: Top Song Reveal - Spotify Style with polaroid images and animations
const Story10_TopSong = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
        width: "100%",
        height: "100%",
        background: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "50px 24px 40px 24px",
        fontFamily: "'Spotify Mix', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.manonthelakers} type="audio/mpeg" />
      </audio>
      
      {/* Animated geometric patterns on right side */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "40%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        {/* Animated vertical stripes */}
        <div style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "30px",
          height: "50%",
          background: `repeating-linear-gradient(180deg, #fff 0px, #fff 20px, transparent 20px, transparent 40px)`,
          opacity: 0.8,
          animation: "slideDown 8s ease-in-out infinite",
        }} />
        
        {/* Curved line */}
        <svg style={{ position: "absolute", top: "20%", right: 0, width: "100%", height: "60%" }} viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M 100 0 Q 30 100, 100 200" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "drawLine 2s ease-out forwards" }} />
          <ellipse cx="80" cy="150" rx="50" ry="30" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "pulseEllipse 3s ease-in-out infinite" }} />
        </svg>
      </div>
      
      {/* Album art section - large and offset small with animations */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: "340px",
        zIndex: 2,
        animation: "floatIn 1s ease-out",
      }}>
        {/* Main large album art */}
        <div style={{
          width: "clamp(200px, 55vw, 280px)",
          height: "clamp(200px, 55vw, 280px)",
          background: "#000",
          border: "4px solid #fff",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          animation: "albumPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s backwards",
        }}>
          <img 
            src={userData.topSong.albumArt || CDN.images.manOnTheLakers}
            alt={userData.topSong.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '🎵';
              e.target.parentElement.style.fontSize = '80px';
              e.target.parentElement.style.background = `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`;
            }}
          />
        </div>
        
        {/* Smaller offset album art with bounce */}
        <div style={{
          position: "absolute",
          bottom: "-30px",
          right: "0",
          width: "clamp(100px, 28vw, 140px)",
          height: "clamp(100px, 28vw, 140px)",
          background: "#000",
          border: "3px solid #fff",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          overflow: "hidden",
          animation: "albumPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s backwards",
        }}>
          <img 
            src={userData.topSong.albumArt || CDN.images.manOnTheLakers}
            alt={userData.topSong.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '🎵';
              e.target.parentElement.style.fontSize = '40px';
            }}
          />
        </div>
      </div>
      
      {/* Song info with staggered animations */}
      <div style={{ 
        textAlign: "center", 
        zIndex: 2,
        marginTop: "40px",
      }}>
        <h2 style={{
          fontSize: "clamp(22px, 6vw, 32px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#fff",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 0.8s forwards",
        }}>
          Your top song
        </h2>
        
        <p style={{
          fontSize: "clamp(18px, 5vw, 26px)",
          fontWeight: 400,
          color: "#fff",
          margin: "12px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 1s forwards",
        }}>
          {userData.topSong.title} by {userData.topSong.artist}
        </p>
        
        <p style={{
          fontSize: "clamp(14px, 4vw, 18px)",
          fontWeight: 400,
          color: "#fff",
          margin: "20px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 1.2s forwards",
        }}>
          You listened <span style={{ fontWeight: 900, color: colors.gold }}>{userData.topSong.timesPlayed}</span> times.
        </p>
      </div>
      
      <style>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes albumPop {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }
        
        @keyframes pulseEllipse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

// Story 11: Top Songs List
// Story 11: Top Songs List - Spotify Style with stacked album art
const Story11_TopSongs = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "40px 20px 30px 20px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.manonthelakers} type="audio/mpeg" />
      </audio>
      
      {/* Geometric curves at top */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "200px",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <svg style={{ position: "absolute", width: "100%", height: "100%" }} viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M 0 100 Q 100 50, 200 80 T 400 60" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="320" cy="100" rx="80" ry="50" fill="none" stroke="#fff" strokeWidth="2" />
          <ellipse cx="350" cy="120" rx="40" ry="25" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Stripes at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: "10%",
        width: "40%",
        height: "120px",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          background: `repeating-linear-gradient(90deg, ${colors.lakersPurple}88 0px, ${colors.lakersPurple}88 12px, transparent 12px, transparent 24px)`,
          transform: "skewX(-15deg)",
        }} />
      </div>
      
      {/* Header with white background bar */}
      <div style={{
        background: "#fff",
        padding: "10px 24px",
        borderRadius: "4px",
        marginBottom: "20px",
        marginTop: "40px",
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: "clamp(22px, 6vw, 32px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#000",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
        }}>
          Your top songs
        </h1>
      </div>
      
      {/* Songs list with stacked album art */}
      <div style={{ 
        display: "flex",
        width: "100%",
        maxWidth: "380px",
        zIndex: 2,
        gap: "16px",
      }}>
        {/* Stacked album art column */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>
          {userData.topSongs.map((song, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: i < 4 ? "-2px" : "0",
            }}>
              {/* Rank number */}
              <span style={{
                fontSize: "clamp(28px, 7vw, 40px)",
                fontWeight: 900,
                color: "#fff",
                fontFamily: "'Spotify Mix', sans-serif",
                width: "40px",
                textAlign: "right",
                marginRight: "12px",
              }}>
                {i + 1}
              </span>
              
              {/* Album art */}
              <div style={{
                width: "clamp(70px, 18vw, 95px)",
                height: "clamp(70px, 18vw, 95px)",
                background: `linear-gradient(${135 + i * 30}deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
                border: "2px solid #333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(24px, 6vw, 36px)",
                flexShrink: 0,
                overflow: "hidden",
                opacity: 0,
                animation: `albumSlideIn 0.5s ease-out ${0.2 + i * 0.15}s forwards`,
              }}>
                <img 
                  src={song.albumArt}
                  alt={song.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '🎵';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Song info column */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingTop: "8px",
        }}>
          {userData.topSongs.map((song, i) => (
            <div key={i} style={{
              height: "clamp(70px, 18vw, 95px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: i < 4 ? "-2px" : "0",
            }}>
              <p style={{
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                fontFamily: "'Spotify Mix', sans-serif",
                lineHeight: 1.2,
              }}>
                {song.title}
              </p>
              <p style={{
                fontSize: "clamp(12px, 3vw, 14px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                margin: "4px 0 0 0",
                fontFamily: "'Spotify Mix', sans-serif",
              }}>
                {song.artist}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Share button */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          marginTop: "auto",
          paddingTop: "20px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            // Share functionality here
            alert("Sharing coming soon!");
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            padding: "14px 32px",
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "100px",
            fontSize: "clamp(14px, 3.5vw, 17px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Share this story
        </button>
      </div>
      
      <style>{`
        @keyframes albumSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Story 12: Albums Intro
// Story 12: Albums Intro - Spotify style with cream background and flip tickers
const Story12_AlbumsIntro = ({ action }) => {
  const [flipStates, setFlipStates] = useState([]);
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    // Animate flip tickers continuously
    const flipInterval = setInterval(() => {
      setFlipStates(prev => {
        const newStates = [...prev];
        const randomIndex = Math.floor(Math.random() * 6);
        newStates[randomIndex] = !newStates[randomIndex];
        return newStates;
      });
    }, 400);
    
    return () => {
      clearInterval(flipInterval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#F5F5F0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronsRoom} type="audio/mpeg" />
      </audio>
      
      {/* Checkered pattern at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "35%",
        backgroundImage: `
          linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
          linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
          linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
        opacity: 0,
        animation: "checkerSlideUp 1s ease-out 0.5s forwards",
        transformOrigin: "bottom",
      }} />
      
      {/* Geometric patterns - top */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%", zIndex: 1 }} viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M 0 150 Q 100 100, 200 120 T 400 80" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 2s ease-out forwards" }} />
        <path d="M 350 0 Q 300 100, 400 150" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 2s ease-out 0.3s forwards" }} />
      </svg>
      
      {/* Dots pattern - bottom left */}
      <div style={{
        position: "absolute",
        bottom: "38%",
        left: "5%",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "8px",
        zIndex: 2,
      }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            width: "clamp(12px, 3vw, 18px)",
            height: "clamp(12px, 3vw, 18px)",
            borderRadius: "50%",
            background: "#1a1a1a",
            opacity: 0,
            animation: `dotPop 0.4s ease-out ${0.5 + i * 0.05}s forwards`,
          }} />
        ))}
      </div>
      
      {/* Flip ticker coins - bottom right */}
      <div style={{
        position: "absolute",
        bottom: "38%",
        right: "8%",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        zIndex: 2,
      }}>
        {[0, 1, 2].map((row) => (
          <div key={row} style={{ display: "flex", gap: "6px" }}>
            {[0, 1].map((col) => {
              const index = row * 2 + col;
              const isFlipped = flipStates[index];
              return (
                <div 
                  key={col} 
                  style={{
                    width: "clamp(35px, 9vw, 55px)",
                    height: "clamp(18px, 5vw, 28px)",
                    borderRadius: "50%",
                    background: isFlipped 
                      ? `linear-gradient(180deg, ${colors.gold} 0%, #c9a227 100%)`
                      : "#1a1a1a",
                    border: "2px solid #1a1a1a",
                    transition: "all 0.3s ease",
                    transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
                    transformStyle: "preserve-3d",
                    boxShadow: isFlipped ? "0 4px 8px rgba(0,0,0,0.3)" : "none",
                    opacity: 0,
                    animation: `coinFlipIn 0.6s ease-out ${0.8 + index * 0.1}s forwards`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Curved line - bottom right */}
      <svg style={{ position: "absolute", bottom: "35%", right: 0, width: "50%", height: "25%", zIndex: 1 }} viewBox="0 0 200 100" preserveAspectRatio="none">
        <ellipse cx="180" cy="50" rx="80" ry="40" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      </svg>
      
      {/* Main content */}
      <div style={{ textAlign: "center", zIndex: 3 }}>
        <p style={{
          fontSize: "clamp(22px, 5.5vw, 32px)",
          fontWeight: 400,
          color: "#1a1a1a",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.2s forwards",
        }}>
          You listened to <span style={{ fontWeight: 900 }}>{userData.totalAlbums}</span>
        </p>
        <p style={{
          fontSize: "clamp(22px, 5.5vw, 32px)",
          fontWeight: 400,
          color: "#1a1a1a",
          margin: "4px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.4s forwards",
        }}>
          albums this year.
        </p>
        
        <p style={{
          fontSize: "clamp(16px, 4vw, 22px)",
          fontWeight: 400,
          color: "#1a1a1a",
          margin: "30px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.8s forwards",
        }}>
          Long live the album.
        </p>
      </div>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes checkerSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(100%);
          }
          to { 
            opacity: 0.9; 
            transform: translateY(0);
          }
        }
        
        @keyframes dotPop {
          0% { 
            opacity: 0; 
            transform: scale(0);
          }
          70% {
            transform: scale(1.2);
          }
          100% { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        
        @keyframes coinFlipIn {
          0% { 
            opacity: 0; 
            transform: rotateX(90deg) translateY(-20px);
          }
          100% { 
            opacity: 1; 
            transform: rotateX(0deg) translateY(0);
          }
        }
        
        @keyframes drawPath {
          from { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          to { stroke-dashoffset: 0; stroke-dasharray: 1000; }
        }
      `}</style>
    </div>
  );
};

// Story 13: Top Album - Spotify style with cream background
const Story13_TopAlbum = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    // Note: Don't pause on unmount - let it continue to Story14_TopAlbums
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#F5F5F0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "50px 24px 40px 24px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - Towards the Bron.mp3 */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.TowardsTheBron} type="audio/mpeg" />
      </audio>
      
      {/* Geometric patterns */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}>
        {/* Star/asterisk pattern top left */}
        <svg style={{ position: "absolute", top: "5%", left: "5%", width: "80px", height: "80px" }} viewBox="0 0 50 50">
          <path d="M 25 0 L 25 50 M 0 25 L 50 25 M 7 7 L 43 43 M 43 7 L 7 43" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        </svg>
        
        {/* Gold dots */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${15 + i * 8}%`,
            right: `${5 + (i % 2) * 5}%`,
            width: "clamp(20px, 5vw, 35px)",
            height: "clamp(20px, 5vw, 35px)",
            borderRadius: "50%",
            background: colors.gold,
            opacity: 0,
            animation: `fadeIn 0.5s ease-out ${0.3 + i * 0.1}s forwards`,
          }} />
        ))}
        
        {/* Curved lines */}
        <svg style={{ position: "absolute", top: "10%", right: 0, width: "50%", height: "50%" }} viewBox="0 0 100 200">
          <path d="M 100 0 Q 50 50, 80 100 T 100 200" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Album art with frame */}
      <div style={{
        marginTop: "40px",
        zIndex: 2,
        opacity: 0,
        animation: "albumPopIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards",
      }}>
        <div style={{
          width: "clamp(220px, 55vw, 320px)",
          height: "clamp(220px, 55vw, 320px)",
          border: "4px solid #1a1a1a",
          background: "#fff",
          padding: "8px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        }}>
          <img 
            src={userData.topAlbum.albumArt}
            alt={userData.topAlbum.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      {/* Album info */}
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <h2 style={{
          fontSize: "clamp(24px, 6vw, 36px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#1a1a1a",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 0.6s forwards",
        }}>
          Your top album
        </h2>
        
        <p style={{
          fontSize: "clamp(18px, 5vw, 26px)",
          fontWeight: 400,
          color: "#1a1a1a",
          margin: "12px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 0.8s forwards",
        }}>
          {userData.topAlbum.name} by {userData.topAlbum.artist}
        </p>
        
        <p style={{
          fontSize: "clamp(14px, 4vw, 18px)",
          fontWeight: 400,
          color: "#1a1a1a",
          margin: "16px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideUp 0.6s ease-out 1s forwards",
        }}>
          You listened to it for <span style={{ fontWeight: 900 }}>{userData.topAlbum.minutesListened}</span> minutes.
        </p>
      </div>
      
      {/* Share button */}
      <div
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{ zIndex: 9999, opacity: 0, animation: "fadeSlideUp 0.6s ease-out 1.2s forwards" }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); alert("Sharing coming soon!"); }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            padding: "14px 32px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            fontSize: "clamp(14px, 3.5vw, 17px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Share this story
        </button>
      </div>
      
      <style>{`
        @keyframes albumPopIn {
          from { opacity: 0; transform: scale(0.7) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Story 14: Top Albums List - Spotify style grid layout
const Story14_TopAlbums = ({ action }) => {
  useEffect(() => { action("play"); }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#F5F5F0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "40px 16px 30px 16px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Gold dots on sides */}
      {[...Array(8)].map((_, i) => (
        <div key={`left-${i}`} style={{
          position: "absolute",
          top: `${20 + i * 10}%`,
          left: i % 2 === 0 ? "-10px" : "5px",
          width: "clamp(25px, 6vw, 40px)",
          height: "clamp(25px, 6vw, 40px)",
          borderRadius: "50%",
          background: colors.gold,
          opacity: 0,
          animation: `fadeIn 0.4s ease-out ${0.1 * i}s forwards`,
        }} />
      ))}
      {[...Array(8)].map((_, i) => (
        <div key={`right-${i}`} style={{
          position: "absolute",
          top: `${15 + i * 10}%`,
          right: i % 2 === 0 ? "-10px" : "5px",
          width: "clamp(25px, 6vw, 40px)",
          height: "clamp(25px, 6vw, 40px)",
          borderRadius: "50%",
          background: colors.gold,
          opacity: 0,
          animation: `fadeIn 0.4s ease-out ${0.1 * i}s forwards`,
        }} />
      ))}
      
      {/* Curved line bottom */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "20%" }} viewBox="0 0 400 80" preserveAspectRatio="none">
        <path d="M 0 40 Q 100 0, 200 40 T 400 40" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
        <ellipse cx="350" cy="60" rx="60" ry="30" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
      </svg>
      
      {/* Header with yellow background */}
      <div style={{
        background: colors.gold,
        padding: "10px 24px",
        borderRadius: "4px",
        marginBottom: "16px",
        zIndex: 2,
        opacity: 0,
        animation: "fadeIn 0.5s ease-out forwards",
      }}>
        <h1 style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#1a1a1a",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
        }}>
          Your top albums
        </h1>
      </div>
      
      {/* Album grid - 2 large on top, 3 smaller below */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        zIndex: 2,
        width: "100%",
        maxWidth: "340px",
      }}>
        {/* Top 2 albums - large */}
        <div style={{ display: "flex", gap: "4px" }}>
          {userData.topAlbums.slice(0, 2).map((album, i) => (
            <div key={i} style={{
              flex: 1,
              aspectRatio: "1",
              position: "relative",
              border: "3px solid #1a1a1a",
              background: "#fff",
              opacity: 0,
              animation: `albumSlideIn 0.5s ease-out ${0.2 + i * 0.1}s forwards`,
            }}>
              <img 
                src={album.albumArt}
                alt={album.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span style={{
                position: "absolute",
                bottom: "4px",
                right: "8px",
                fontSize: "clamp(20px, 5vw, 28px)",
                fontWeight: 900,
                color: "#fff",
                fontFamily: "'Spotify Mix', sans-serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}>{i + 1}</span>
            </div>
          ))}
        </div>
        
        {/* Bottom 3 albums - smaller */}
        <div style={{ display: "flex", gap: "4px" }}>
          {userData.topAlbums.slice(2, 5).map((album, i) => (
            <div key={i} style={{
              flex: 1,
              aspectRatio: "1",
              position: "relative",
              border: "2px solid #1a1a1a",
              background: "#fff",
              opacity: 0,
              animation: `albumSlideIn 0.5s ease-out ${0.4 + i * 0.1}s forwards`,
            }}>
              <img 
                src={album.albumArt}
                alt={album.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span style={{
                position: "absolute",
                bottom: "2px",
                right: "6px",
                fontSize: "clamp(14px, 3.5vw, 20px)",
                fontWeight: 900,
                color: "#fff",
                fontFamily: "'Spotify Mix', sans-serif",
                textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
              }}>{i + 3}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Album list below */}
      <div style={{
        width: "100%",
        maxWidth: "340px",
        marginTop: "16px",
        zIndex: 2,
      }}>
        {userData.topAlbums.map((album, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.1)" : "none",
            opacity: 0,
            animation: `fadeSlideIn 0.4s ease-out ${0.6 + i * 0.1}s forwards`,
          }}>
            <span style={{
              fontSize: "clamp(18px, 4.5vw, 24px)",
              fontWeight: 900,
              color: "#1a1a1a",
              fontFamily: "'Spotify Mix', sans-serif",
              width: "30px",
            }}>{i + 1}</span>
            <div>
              <p style={{
                fontSize: "clamp(13px, 3.2vw, 16px)",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: 0,
                fontFamily: "'Spotify Mix', sans-serif",
              }}>{album.name}</p>
              <p style={{
                fontSize: "clamp(11px, 2.8vw, 13px)",
                fontWeight: 400,
                color: "#666",
                margin: "2px 0 0 0",
                fontFamily: "'Spotify Mix', sans-serif",
              }}>{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Share button */}
      <div
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{ marginTop: "auto", paddingTop: "16px", zIndex: 9999 }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); alert("Sharing coming soon!"); }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          style={{
            padding: "12px 28px",
            background: "#1a1a1a",
            color: "#fff",
            border: "none",
            borderRadius: "100px",
            fontSize: "clamp(13px, 3.2vw, 16px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            pointerEvents: "auto",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Share this story
        </button>
      </div>
      
      <style>{`
        @keyframes albumSlideIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// Story 15: Artists Intro with Reveal
// Story 15: Artists Intro - Spotify style with concentric circles
const Story15_ArtistsIntro = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.SaveYourBron} type="audio/mpeg" />
      </audio>
      
      {/* Animated gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(ellipse at 30% 20%, ${colors.gold}15 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${colors.purple}20 0%, transparent 50%)`,
        animation: "shimmer 4s ease-in-out infinite alternate",
      }} />
      
      {/* Star shape top left - larger and animated */}
      <svg style={{ 
        position: "absolute", 
        top: "8%", 
        left: "8%", 
        width: "clamp(80px, 20vw, 140px)", 
        height: "clamp(80px, 20vw, 140px)",
        animation: "rotate 20s linear infinite",
      }} viewBox="0 0 100 100">
        <path d="M 50 0 Q 55 45, 100 50 Q 55 55, 50 100 Q 45 55, 0 50 Q 45 45, 50 0" 
              fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "drawPath 2s ease-out forwards" }} />
      </svg>
      
      {/* Small stars scattered */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${15 + i * 15}%`,
          right: `${5 + i * 8}%`,
          fontSize: "clamp(12px, 3vw, 20px)",
          opacity: 0,
          animation: `twinkle 1.5s ease-in-out ${0.3 + i * 0.2}s infinite`,
        }}>
          ✦
        </div>
      ))}
      
      {/* Glowing number accent */}
      <div style={{
        position: "absolute",
        width: "clamp(150px, 40vw, 250px)",
        height: "clamp(150px, 40vw, 250px)",
        background: `radial-gradient(circle, ${colors.gold}25 0%, transparent 60%)`,
        borderRadius: "50%",
        animation: "pulse 3s ease-in-out infinite",
      }} />
      
      {/* Concentric circles at bottom - enhanced colors */}
      <div style={{
        position: "absolute",
        bottom: "-25%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(280px, 75vw, 480px)",
        height: "clamp(280px, 75vw, 480px)",
      }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${100 - i * 12}%`,
            height: `${100 - i * 12}%`,
            borderRadius: "50%",
            border: `clamp(0.5rem, 2vw, 1rem) solid ${i % 3 === 0 ? colors.gold : i % 3 === 1 ? "#fff" : "#444"}`,
            opacity: 0,
            animation: `circleGrow 0.6s ease-out ${0.1 * i}s forwards`,
          }} />
        ))}
      </div>
      
      {/* Main content - with dark background for readability */}
      <div style={{ 
        textAlign: "center", 
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.6)",
        padding: "clamp(20px, 5vw, 35px) clamp(25px, 6vw, 45px)",
        borderRadius: "clamp(12px, 3vw, 20px)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}>
        <p style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 400,
          color: "#fff",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.3s forwards",
        }}>
          You listened to
        </p>
        <p style={{
          fontSize: "clamp(60px, 18vw, 100px)",
          fontWeight: 900,
          color: colors.gold,
          margin: "clamp(5px, 2vw, 15px) 0",
          fontFamily: "'Spotify Mix', sans-serif",
          textShadow: `0 0 40px ${colors.gold}60`,
          opacity: 0,
          animation: "scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards",
        }}>
          {userData.totalArtists.toLocaleString()}
        </p>
        <p style={{
          fontSize: "clamp(20px, 5vw, 28px)",
          fontWeight: 400,
          color: "#fff",
          margin: 0,
          fontFamily: "'Spotify Mix', sans-serif",
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.7s forwards",
        }}>
          artists this year.
        </p>
      </div>
      
      {/* Crown at bottom center - above circles */}
      <div style={{
        position: "absolute",
        bottom: "22%",
        width: "clamp(30px, 8vw, 50px)",
        height: "clamp(30px, 8vw, 50px)",
        opacity: 0,
        animation: "fadeIn 0.6s ease-out 1s forwards",
        zIndex: 3,
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
      }}>
        <img src={CDN.images.lebronLogo} alt="LeBron" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes circleGrow {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; }
          to { stroke-dashoffset: 0; stroke-dasharray: 500; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Story 15.5: These 5 were extra special - Carousel with concentric circles
const Story15_5_SpecialArtists = ({ action }) => {
  const [currentArtist, setCurrentArtist] = useState(0);
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    // Auto-carousel through artists
    const interval = setInterval(() => {
      setCurrentArtist(prev => (prev + 1) % 5);
    }, 1500);
    
    return () => {
      clearInterval(interval);
      // Don't pause - continue to Story16_TopArtistTease
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#2a2a2a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "60px 30px 40px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - LeTreasure.mp3 */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.LeTreasure} type="audio/mpeg" />
      </audio>
      
      {/* Header */}
      <h1 style={{
        fontSize: "clamp(26px, 7vw, 40px)",
        fontWeight: 900,
        fontStyle: "italic",
        color: "#fff",
        margin: 0,
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out forwards",
      }}>
        And these 5 were<br/>extra special.
      </h1>
      
      {/* Concentric circles with artist in center */}
      <div style={{
        position: "relative",
        width: "clamp(280px, 70vw, 400px)",
        height: "clamp(280px, 70vw, 400px)",
        marginTop: "40px",
        zIndex: 2,
      }}>
        {/* Concentric circles */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${100 - i * 18}%`,
            height: `${100 - i * 18}%`,
            borderRadius: "50%",
            border: `${i % 2 === 0 ? "14px" : "10px"} solid ${i % 2 === 0 ? "#fff" : "#2a2a2a"}`,
          }} />
        ))}
        
        {/* Artist image in center */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "45%",
          height: "45%",
          borderRadius: "50%",
          overflow: "hidden",
          transition: "all 0.5s ease",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          border: "4px solid #fff",
        }}>
          {userData.topArtists[currentArtist]?.image ? (
            <img 
              src={userData.topArtists[currentArtist].image} 
              alt={userData.topArtists[currentArtist].name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(40px, 10vw, 60px)",
            }}>
              👤
            </div>
          )}
        </div>
      </div>
      
      {/* Artist name */}
      <p style={{
        fontSize: "clamp(20px, 5vw, 28px)",
        fontWeight: 400,
        color: "#fff",
        margin: "24px 0 0 0",
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        transition: "all 0.3s ease",
      }}>
        {userData.topArtists[currentArtist]?.name || "Artist"}
      </p>
      
      {/* Dots indicator */}
      <div style={{ display: "flex", gap: "8px", marginTop: "20px", zIndex: 2 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: i === currentArtist ? "#fff" : "rgba(255,255,255,0.3)",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Story 16: Top Artist Tease - "But who claimed the top spot?" with overlapping circles
const Story16_TopArtistTease = ({ action }) => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => { 
    action("play");
    setTimeout(() => setShowButton(true), 1200);
  }, []);

  // Different positions for overlapping circles like in the Spotify image
  const circlePositions = [
    { left: "10%", zIndex: 1 },
    { left: "25%", zIndex: 2 },
    { left: "40%", zIndex: 3 },
    { left: "55%", zIndex: 4 },
    { left: "70%", zIndex: 5 },
  ];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#2a2a2a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "80px 30px 40px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Header */}
      <h1 style={{
        fontSize: "clamp(26px, 7vw, 40px)",
        fontWeight: 900,
        fontStyle: "italic",
        color: "#fff",
        margin: 0,
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out forwards",
      }}>
        And these 5 were<br/>extra special.
      </h1>
      
      {/* Concentric circles background */}
      <div style={{
        position: "relative",
        width: "clamp(280px, 75vw, 400px)",
        height: "clamp(280px, 75vw, 400px)",
        marginTop: "30px",
        zIndex: 1,
      }}>
        {/* Concentric circles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${100 - i * 15}%`,
            height: `${100 - i * 15}%`,
            borderRadius: "50%",
            border: `${i % 2 === 0 ? "14px" : "10px"} solid ${i % 2 === 0 ? "#fff" : "#2a2a2a"}`,
          }} />
        ))}
        
        {/* Overlapping artist circles */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "clamp(80px, 20vw, 120px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          {userData.topArtists.slice(0, 5).map((artist, i) => (
            <div 
              key={i}
              style={{
                position: "absolute",
                left: circlePositions[i].left,
                width: "clamp(60px, 15vw, 90px)",
                height: "clamp(60px, 15vw, 90px)",
                borderRadius: "50%",
                zIndex: circlePositions[i].zIndex,
                border: "3px solid #2a2a2a",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                opacity: 0,
                animation: `slideInCircle 0.5s ease-out ${0.2 + i * 0.1}s forwards`,
                overflow: "hidden",
              }}
            >
              {artist.image ? (
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(24px, 6vw, 36px)",
                }}>
                  👤
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* "But who claimed the top spot?" text */}
      <p style={{
        fontSize: "clamp(18px, 4.5vw, 24px)",
        fontWeight: 400,
        color: "#fff",
        margin: "30px 0 0 0",
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out 0.8s forwards",
      }}>
        But who claimed the top spot?
      </p>
      
      {/* Start your race button */}
      <div
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 9999,
          marginTop: "24px",
          opacity: showButton ? 1 : 0,
          transform: showButton ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          style={{
            background: "#b8f169",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            padding: "14px 32px",
            fontSize: "clamp(14px, 3.5vw, 18px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          Start your race
        </button>
      </div>
      
      {/* Decorative line at bottom */}
      <svg style={{ position: "absolute", bottom: "5%", right: "-20%", width: "80%", height: "20%", zIndex: 1 }} viewBox="0 0 200 100" preserveAspectRatio="none">
        <path d="M 0 50 Q 50 20, 100 50 T 200 40" fill="none" stroke="#b8f169" strokeWidth="2" style={{ animation: "drawPath 1.5s ease-out 1s forwards" }} />
        <path d="M 10 70 Q 60 40, 110 70 T 210 60" fill="none" stroke="#fff" strokeWidth="1" style={{ animation: "drawPath 1.5s ease-out 1.2s forwards" }} />
      </svg>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInCircle {
          from { opacity: 0; transform: scale(0.5) translateX(-50px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; }
          to { stroke-dashoffset: 0; stroke-dasharray: 500; }
        }
      `}</style>
    </div>
  );
};

// Basketball game players
const gamePlayers = [
  { name: "ilyaugust", color: "#FFD700", jersey: "#FFD700", skin: "#8B5A2B" },
  { name: "Talented Blake", color: "#FF4136", jersey: "#FF4136", skin: "#D2691E" },
  { name: "omgitsnotjane", color: "#0074D9", jersey: "#0074D9", skin: "#CD853F" },
  { name: "ramon angelo", color: "#2ECC40", jersey: "#2ECC40", skin: "#A0522D" },
  { name: "everyone", color: "#B10DC9", jersey: "#B10DC9", skin: "#DEB887" }
];

const GamePlayer = ({ x, y, color, shooting }) => (
  <g transform={`translate(${x}, ${y})`}>
    <ellipse cx="0" cy="45" rx="8" ry="3" fill="rgba(0,0,0,0.3)" />
    <rect x="-6" y="15" width="12" height="20" fill={color} rx="2" />
    <circle cx="0" cy="8" r="8" fill="#8B5A2B" />
    <circle cx="-3" cy="6" r="1.5" fill="#222" />
    <circle cx="3" cy="6" r="1.5" fill="#222" />
    <path d="M-2 10 Q0 13 2 10" stroke="#222" fill="none" strokeWidth="1" />
    <rect x="-8" y="35" width="5" height="12" fill="#333" rx="1" />
    <rect x="3" y="35" width="5" height="12" fill="#333" rx="1" />
    <line x1={shooting ? 8 : 6} y1="18" x2={shooting ? 12 : 10} y2={shooting ? 5 : 25} 
          stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
    <line x1={-6} y1="18" x2={-10} y2="28" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
  </g>
);

const GameBall = ({ x, y, visible }) => visible && (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="0" cy="0" r="6" fill="#FF6B35" stroke="#222" strokeWidth="1" />
    <path d="M-5 0 Q0 -3 5 0" stroke="#222" fill="none" strokeWidth="0.5" />
    <path d="M0 -5 Q-2 0 0 5" stroke="#222" fill="none" strokeWidth="0.5" />
  </g>
);

const NBAring = () => (
  <svg width="80" height="80" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE14D" />
        <stop offset="30%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFF8DC" />
        <stop offset="70%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="innerGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B8860B" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="50" cy="55" rx="32" ry="12" fill="rgba(0,0,0,0.3)" />
    <ellipse cx="50" cy="50" rx="38" ry="38" fill="url(#goldGrad)" stroke="#8B6914" strokeWidth="2" filter="url(#glow)" />
    <ellipse cx="50" cy="50" rx="26" ry="26" fill="#1a1a2e" stroke="url(#innerGold)" strokeWidth="3" />
    <polygon points="50,32 53,44 66,44 56,52 59,64 50,56 41,64 44,52 34,44 47,44" fill="url(#goldGrad)" stroke="#B8860B" strokeWidth="1" />
    <circle cx="35" cy="35" r="4" fill="#E0115F" stroke="#8B6914" strokeWidth="1" />
    <circle cx="65" cy="35" r="4" fill="#50C878" stroke="#8B6914" strokeWidth="1" />
    <circle cx="35" cy="65" r="4" fill="#4169E1" stroke="#8B6914" strokeWidth="1" />
    <circle cx="65" cy="65" r="4" fill="#E0115F" stroke="#8B6914" strokeWidth="1" />
    <circle cx="50" cy="50" r="3" fill="#FFF8DC" opacity="0.6" />
  </svg>
);

// Story 17: Basketball Game (embedded React component)
const Story17_BasketballGame = ({ action }) => {
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [time, setTime] = useState(30);
  const [shots, setShots] = useState([null, null, null, null, null]);
  const [gameOver, setGameOver] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const audioRef = useRef(null);

  const positions = [
    { x: 50, y: 320 }, { x: 120, y: 340 }, { x: 190, y: 320 },
    { x: 85, y: 370 }, { x: 155, y: 370 }
  ];

  useEffect(() => {
    action("pause"); // Pause story while game plays
    
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
      setTimeout(() => setShowWinner(true), 500);
      setTimeout(() => action("play"), 4000); // Resume after showing winner
      return;
    }
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (gameOver) return;
    const shootInterval = setInterval(() => {
      const playerIdx = Math.floor(Math.random() * 5);
      const made = playerIdx === 0 ? Math.random() > 0.35 : Math.random() > 0.55;
      setShots(prev => {
        const next = [...prev];
        next[playerIdx] = { progress: 0, made };
        return next;
      });
      if (made) {
        setTimeout(() => {
          setScores(prev => {
            const next = [...prev];
            next[playerIdx] += playerIdx === 0 ? 3 : (Math.random() > 0.5 ? 2 : 3);
            return next;
          });
        }, 600);
      }
    }, 400);
    return () => clearInterval(shootInterval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const animInterval = setInterval(() => {
      setShots(prev => prev.map(shot => {
        if (!shot) return null;
        if (shot.progress >= 1) return null;
        return { ...shot, progress: shot.progress + 0.08 };
      }));
    }, 30);
    return () => clearInterval(animInterval);
  }, [gameOver]);

  const getBallPosition = (idx, shot) => {
    if (!shot) return { x: positions[idx].x + 12, y: positions[idx].y + 5, visible: false };
    const t = shot.progress;
    const startX = positions[idx].x + 12;
    const startY = positions[idx].y + 5;
    const x = startX + (120 - startX) * t;
    const y = startY + (95 - startY) * t + -80 * Math.sin(Math.PI * t);
    return { x, y, visible: true };
  };

  // Ensure ilyaugust wins at the end
  useEffect(() => {
    if (time === 1 && scores[0] <= Math.max(...scores.slice(1))) {
      setScores(prev => {
        const next = [...prev];
        next[0] = Math.max(...prev.slice(1)) + 5;
        return next;
      });
    }
  }, [time, scores]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Spotify Mix', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Background Audio - LeWork */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.lework} type="audio/mpeg" />
      </audio>
      
      {/* Timer */}
      <div style={{ padding: '15px 10px 8px', textAlign: 'center' }}>
        <div style={{ 
          color: time <= 5 ? '#FF4136' : '#fff', 
          fontSize: 'clamp(28px, 8vw, 40px)', 
          fontWeight: 900,
          fontFamily: "'Spotify Mix', sans-serif",
          textShadow: time <= 5 ? '0 0 10px #FF4136' : 'none',
          letterSpacing: 2
        }}>
          {gameOver ? "FINAL" : `0:${time.toString().padStart(2, '0')}`}
        </div>
      </div>

      {/* Scoreboard */}
      <div style={{ 
        background: 'linear-gradient(180deg, #111 0%, #222 100%)',
        margin: '0 12px',
        borderRadius: 8,
        padding: '10px 8px',
        border: '2px solid #444',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
        width: 'calc(100% - 24px)',
        maxWidth: '320px',
      }}>
        {gamePlayers.map((p, i) => (
          <div key={p.name} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 8px',
            borderBottom: i < 4 ? '1px solid #333' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 6,
                height: 22,
                background: p.color,
                borderRadius: 2,
                boxShadow: `0 0 6px ${p.color}66`
              }} />
              <span style={{ 
                color: '#fff', 
                fontSize: 'clamp(10px, 2.8vw, 13px)', 
                fontWeight: 600,
                fontFamily: "'Spotify Mix', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                {i === 4 ? "everyone (bronify)" : p.name}
              </span>
            </div>
            <div style={{
              background: '#000',
              padding: '3px 12px',
              borderRadius: 4,
              minWidth: 40,
              textAlign: 'center',
              border: '1px solid #333'
            }}>
              <span style={{ 
                color: '#FF3B30', 
                fontSize: 'clamp(16px, 4vw, 20px)', 
                fontWeight: 900,
                fontFamily: "'Spotify Mix', sans-serif",
                textShadow: '0 0 8px rgba(255,59,48,0.5)'
              }}>
                {scores[i]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Court */}
      <svg viewBox="0 0 240 280" style={{ width: '100%', maxWidth: '340px', flex: 1, marginTop: 8 }}>
        <rect x="10" y="60" width="220" height="210" fill="#C4A484" stroke="#fff" strokeWidth="2" rx="4" />
        <rect x="60" y="60" width="120" height="100" fill="none" stroke="#fff" strokeWidth="1.5" />
        <circle cx="120" cy="160" r="30" fill="none" stroke="#fff" strokeWidth="1.5" />
        <rect x="95" y="65" width="50" height="5" fill="#fff" />
        <rect x="105" y="70" width="30" height="25" fill="rgba(255,255,255,0.3)" stroke="#fff" strokeWidth="2" />
        <ellipse cx="120" cy="95" rx="12" ry="4" fill="none" stroke="#FF6B35" strokeWidth="3" />
        <path d="M108 95 L112 115 M120 99 L120 118 M132 95 L128 115" stroke="#ddd" strokeWidth="1" />
        {gamePlayers.map((p, i) => (
          <GamePlayer key={p.name} x={positions[i].x} y={positions[i].y} color={p.jersey} shooting={shots[i] !== null} />
        ))}
        {shots.map((shot, i) => {
          const pos = getBallPosition(i, shot);
          return <GameBall key={i} x={pos.x} y={pos.y} visible={pos.visible} />;
        })}
        {shots.map((shot, i) => shot && shot.progress > 0.7 && shot.made && (
          <text key={`score-${i}`} x="120" y="130" textAnchor="middle" fill="#2ECC40" fontSize="16" fontWeight="900"
                style={{ opacity: 1 - (shot.progress - 0.7) * 3 }}>+{i === 0 ? '3' : '2'}!</text>
        ))}
      </svg>

      {/* Winner overlay */}
      {showWinner && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.5s ease'
        }}>
          <NBAring />
          <div style={{ 
            color: '#aaa', 
            fontSize: 'clamp(12px, 3.5vw, 16px)', 
            fontWeight: 500,
            fontFamily: "'Spotify Mix', sans-serif",
            marginTop: 20,
            letterSpacing: 2,
            textTransform: 'uppercase'
          }}>
            Winner
          </div>
          <div style={{ 
            color: '#FFD700', 
            fontSize: 'clamp(28px, 8vw, 40px)', 
            fontWeight: 900, 
            marginTop: 10,
            fontFamily: "'Spotify Mix', sans-serif",
            textShadow: '0 0 30px rgba(255,215,0,0.6)',
            letterSpacing: 1
          }}>
            ilyaugust
          </div>
          <p style={{
            color: '#fff',
            fontSize: 'clamp(14px, 4vw, 18px)',
            marginTop: 20,
            fontFamily: "'Spotify Mix', sans-serif",
            opacity: 0.8,
          }}>
            is your top artist
          </p>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
};

// Story 18: Top Artists List - Spotify style with stacked images
const Story18_TopArtists = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#2a2a2a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "60px 20px 40px 20px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - Bron to the Moon */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronToTheMoon} type="audio/mpeg" />
      </audio>
      
      {/* Diagonal stripes top left */}
      <div style={{
        position: "absolute",
        top: "5%",
        left: "-5%",
        width: "60%",
        height: "15%",
        transform: "rotate(-25deg)",
        display: "flex",
        gap: "8px",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: "clamp(12px, 4vw, 20px)",
            height: "100%",
            background: i === 1 ? colors.gold : "#fff",
            opacity: 0,
            animation: `slideInStripe 0.5s ease-out ${0.2 + i * 0.1}s forwards`,
          }} />
        ))}
      </div>
      
      {/* Header with box */}
      <div style={{
        background: "#fff",
        color: "#000",
        padding: "8px 20px",
        marginBottom: "16px",
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out forwards",
      }}>
        <h1 style={{
          fontSize: "clamp(20px, 5.5vw, 28px)",
          fontWeight: 900,
          fontFamily: "'Spotify Mix', sans-serif",
          margin: 0,
        }}>
          Your top artists
        </h1>
      </div>
      
      {/* Artists list */}
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "340px",
        gap: "12px",
        zIndex: 2,
      }}>
        {/* Rank numbers */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingRight: "8px",
        }}>
          {[1, 2, 3, 4, 5].map((num, i) => (
            <span key={num} style={{
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: 900,
              color: "#fff",
              fontFamily: "'Spotify Mix', sans-serif",
              opacity: 0,
              animation: `fadeSlideIn 0.5s ease-out ${0.3 + i * 0.1}s forwards`,
            }}>
              {num}
            </span>
          ))}
        </div>
        
        {/* Stacked images */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          border: "3px solid #fff",
        }}>
          {userData.topArtists.slice(0, 5).map((artist, i) => (
            <div key={i} style={{
              width: "clamp(70px, 18vw, 100px)",
              height: "clamp(70px, 18vw, 100px)",
              borderBottom: i < 4 ? "2px solid #fff" : "none",
              opacity: 0,
              animation: `slideInArtist 0.5s ease-out ${0.4 + i * 0.1}s forwards`,
              overflow: "hidden",
            }}>
              {artist.image ? (
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(28px, 7vw, 40px)",
                }}>
                  👤
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Name badges */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: "12px",
        }}>
          {userData.topArtists.slice(0, 5).map((artist, i) => (
            <div key={i} style={{
              background: "#fff",
              color: "#000",
              padding: "6px 14px",
              fontWeight: 700,
              fontSize: "clamp(11px, 3vw, 15px)",
              fontFamily: "'Spotify Mix', sans-serif",
              opacity: 0,
              animation: `slideInBadge 0.5s ease-out ${0.5 + i * 0.1}s forwards`,
            }}>
              {artist.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative curves right */}
      <svg style={{ position: "absolute", right: "-10%", top: "30%", width: "50%", height: "60%", zIndex: 1 }} viewBox="0 0 200 300" preserveAspectRatio="none">
        <path d="M 100 0 Q 200 100, 150 150 T 100 300" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M 120 0 Q 220 100, 170 150 T 120 300" fill="none" stroke="#fff" strokeWidth="1.5" />
        <ellipse cx="180" cy="250" rx="80" ry="40" fill="none" stroke={colors.gold} strokeWidth="2" />
      </svg>
      
      {/* Share button */}
      <div
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "8%",
          zIndex: 9999,
          opacity: 0,
          animation: "fadeSlideIn 0.6s ease-out 1.2s forwards",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          style={{
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            padding: "12px 28px",
            fontSize: "clamp(12px, 3.5vw, 16px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          Share this story
        </button>
      </div>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInStripe {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInArtist {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInBadge {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// Story 18.5: Top Artist Reveal - Like Playboi Carti screenshot with red ellipse decorations
const Story18_5_TopArtistReveal = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#2a2a2a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "60px 30px 40px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - LeNade */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.LeNade} type="audio/mpeg" />
      </audio>
      
      {/* Red ellipse decorations */}
      <svg style={{ position: "absolute", top: "5%", left: "-10%", width: "100%", height: "70%", zIndex: 1 }} viewBox="0 0 300 400" preserveAspectRatio="none">
        <ellipse cx="150" cy="180" rx="180" ry="120" fill="none" stroke="#FF4136" strokeWidth="3" style={{ animation: "drawEllipse 1s ease-out forwards" }} />
        <ellipse cx="150" cy="180" rx="140" ry="90" fill="none" stroke="#FF4136" strokeWidth="2" style={{ animation: "drawEllipse 1s ease-out 0.2s forwards" }} />
        <path d="M 50 50 Q 100 20, 150 60 T 250 30" fill="none" stroke="#FF4136" strokeWidth="2" style={{ animation: "drawPath 1s ease-out 0.4s forwards" }} />
      </svg>
      
      {/* Vertical lines on left */}
      <div style={{
        position: "absolute",
        left: "5%",
        top: "55%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        height: "30%",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: "2px",
            height: "40px",
            background: "#fff",
            opacity: 0,
            animation: `fadeSlideIn 0.5s ease-out ${0.8 + i * 0.15}s forwards`,
          }} />
        ))}
      </div>
      
      {/* Artist image in circle */}
      <div style={{
        width: "clamp(180px, 50vw, 280px)",
        height: "clamp(180px, 50vw, 280px)",
        borderRadius: "50%",
        marginTop: "40px",
        zIndex: 2,
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        opacity: 0,
        animation: "artistPop 0.8s ease-out 0.3s forwards",
        border: "4px solid rgba(255,65,54,0.5)",
        overflow: "hidden",
      }}>
        {userData.topArtists[0]?.image ? (
          <img 
            src={userData.topArtists[0].image} 
            alt={userData.topArtists[0].name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${colors.lakersPurple} 0%, ${colors.gold} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(80px, 20vw, 120px)",
          }}>
            👤
          </div>
        )}
      </div>
      
      {/* Artist name */}
      <h1 style={{
        fontSize: "clamp(28px, 7vw, 42px)",
        fontWeight: 900,
        fontStyle: "italic",
        color: "#fff",
        margin: "30px 0 0 0",
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out 0.6s forwards",
      }}>
        ilyaugust is<br/>your top artist.
      </h1>
      
      {/* Stats */}
      <p style={{
        fontSize: "clamp(14px, 3.5vw, 18px)",
        fontWeight: 400,
        color: "#ccc",
        margin: "16px 0 0 0",
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        zIndex: 2,
        opacity: 0,
        animation: "fadeSlideIn 0.6s ease-out 0.9s forwards",
      }}>
        You spent <span style={{ fontWeight: 700, color: "#fff" }}>1,523</span> minutes with them, which<br/>
        makes you a top <span style={{ fontWeight: 700, color: "#fff" }}>0.9%</span> global fan.
      </p>
      
      {/* Share button */}
      <div
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          marginTop: "24px",
          zIndex: 9999,
          opacity: 0,
          animation: "fadeSlideIn 0.6s ease-out 1.1s forwards",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          style={{
            background: "#fff",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            padding: "12px 28px",
            fontSize: "clamp(12px, 3.5vw, 16px)",
            fontWeight: 700,
            fontFamily: "'Spotify Mix', sans-serif",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          Share this story
        </button>
      </div>
      
      {/* Bottom scribble decorations */}
      <svg style={{ position: "absolute", bottom: "5%", left: "5%", width: "90%", height: "15%", zIndex: 1 }} viewBox="0 0 300 60" preserveAspectRatio="none">
        <path d="M 0 30 Q 30 10, 60 30 T 120 30 T 180 30 T 240 30 T 300 30" fill="none" stroke="#fff" strokeWidth="2" style={{ animation: "drawPath 1.5s ease-out 1.3s forwards" }} />
        <path d="M 0 45 Q 40 20, 80 45 T 160 45 T 240 45 T 320 45" fill="none" stroke="#fff" strokeWidth="1.5" style={{ animation: "drawPath 1.5s ease-out 1.5s forwards" }} />
      </svg>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes artistPop {
          0% { opacity: 0; transform: scale(0.3); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes drawEllipse {
          from { stroke-dashoffset: 1000; stroke-dasharray: 1000; }
          to { stroke-dashoffset: 0; stroke-dasharray: 1000; }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; }
          to { stroke-dashoffset: 0; stroke-dasharray: 500; }
        }
      `}</style>
    </div>
  );
};

// Story 19: Word from Favorites Intro - Concentric circles like Spotify
const Story19_WordIntro = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - BronKIA */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.BronKIA} type="audio/mpeg" />
      </audio>
      
      {/* Concentric circles background - optimized for mobile */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "180%",
        height: "180%",
      }}>
        {[...Array(10)].map((_, i) => {
          // Gold rings at specific positions
          const isGoldRing = i === 2 || i === 7;
          return (
            <div key={i} style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${100 - i * 9}%`,
              height: `${100 - i * 9}%`,
              borderRadius: "50%",
              border: `clamp(1rem, 4vw, 2rem) solid ${isGoldRing ? colors.gold : "#F5F5DC"}`,
              opacity: 0,
              animation: `circleExpand 0.5s ease-out ${i * 0.06}s forwards`,
            }} />
          );
        })}
      </div>
      
      {/* Decorative curved lines at top corners */}
      <svg style={{ position: "absolute", top: "5%", left: "8%", width: "35%", height: "12%", zIndex: 2 }} viewBox="0 0 200 80" preserveAspectRatio="none">
        <path d="M 0 40 Q 50 15, 100 40 T 200 40" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "drawPath 1.2s ease-out 0.6s forwards" }} />
      </svg>
      
      <svg style={{ position: "absolute", top: "5%", right: "8%", width: "35%", height: "12%", zIndex: 2 }} viewBox="0 0 200 80" preserveAspectRatio="none">
        <path d="M 0 10 Q 50 35, 100 10" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "drawPath 1.2s ease-out 0.7s forwards" }} />
        <path d="M 120 25 L 180 25" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "drawPath 1s ease-out 0.9s forwards" }} />
      </svg>
      
      {/* Text box - centered */}
      <div style={{
        background: "#F5F5DC",
        color: "#000",
        padding: "clamp(22px, 6vw, 38px) clamp(28px, 8vw, 55px)",
        textAlign: "center",
        zIndex: 3,
        maxWidth: "85%",
        opacity: 0,
        animation: "fadeScaleIn 0.8s ease-out 0.9s forwards",
      }}>
        <h1 style={{
          fontSize: "clamp(22px, 5.5vw, 36px)",
          fontWeight: 900,
          fontFamily: "'Spotify Mix', sans-serif",
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}>
          And now, a word<br/>from one of your<br/>favorites.
        </h1>
        
        {/* Smile decoration inside text box */}
        <svg style={{ marginTop: "clamp(16px, 4vw, 24px)", width: "clamp(60px, 15vw, 100px)", height: "clamp(20px, 5vw, 35px)" }} viewBox="0 0 100 30">
          <path d="M 10 5 Q 50 25, 90 5" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>
      
      <style>{`
        @keyframes circleExpand {
          from { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5);
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes fadeScaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.85);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; opacity: 0; }
          to { stroke-dashoffset: 0; stroke-dasharray: 500; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// Story 20: Video (LaVar Ball)
const Story20_Video = ({ action }) => {
  const videoRef = useRef(null);
  
  useEffect(() => { 
    action("pause"); // Pause story while video plays
    
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  
  const handleVideoEnd = () => {
    action("play"); // Resume story after video
  };

  return (
    <div style={{ 
      ...baseStyle, 
      padding: 0,
      background: "#000",
    }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        onEnded={handleVideoEnd}
        playsInline
        controls={false}
      >
        <source src={CDN.videos.lavar} type="video/mp4" />
      </video>
    </div>
  );
};

// Story 21: Part of Something Bigger
// Story21: Something Bigger - Like Story 2 with background color transition
const Story21_Bigger = ({ action }) => {
  const [backgroundPhase, setBackgroundPhase] = useState(1); // 1 = Cavs Wine, 2 = STVM Green
  const typewriterText1 = "Your listening made you a part of something.";
  const typewriterText2 = "Something jolly.";
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const audioRef = useRef(null);

  useEffect(() => {
    action("play");
    
    // Typewriter for first text
    let index1 = 0;
    const timer1 = setInterval(() => {
      if (index1 < typewriterText1.length) {
        setDisplayText1(typewriterText1.substring(0, index1 + 1));
        index1++;
      } else {
        clearInterval(timer1);
        // Transition background and start second text
        setTimeout(() => {
          setBackgroundPhase(2);
          let index2 = 0;
          const timer2 = setInterval(() => {
            if (index2 < typewriterText2.length) {
              setDisplayText2(typewriterText2.substring(0, index2 + 1));
              index2++;
            } else {
              clearInterval(timer2);
            }
          }, 50);
        }, 500);
      }
    }, 50);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: backgroundPhase === 1 ? "#860038" : "#005643",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
      transition: "background 0.8s ease-out",
    }}>
      
      {/* First text */}
      <p style={{
        fontSize: "clamp(28px, 7vw, 48px)",
        fontWeight: 900,
        color: "#fff",
        margin: 0,
        fontFamily: "'Spotify Mix', sans-serif",
        textAlign: "center",
        lineHeight: 1.2,
      }}>
        {displayText1}
      </p>
      
      {/* Second text - staggered animation */}
      {displayText2 && (
        <p style={{
          fontSize: "clamp(32px, 8vw, 56px)",
          fontWeight: 900,
          color: "#fff",
          margin: "24px 0 0 0",
          fontFamily: "'Spotify Mix', sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
          opacity: 0,
          animation: "fadeSlideIn 0.6s ease-out forwards",
        }}>
          {displayText2}
        </p>
      )}
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Story21.5: Merry Bronmas Video
const Story21_5_MerryBronmas = ({ action }) => {
  const videoRef = useRef(null);
  
  useEffect(() => { 
    action("pause"); // Pause story while video plays
    
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  
  const handleVideoEnd = () => {
    action("play"); // Resume story after video
  };

  return (
    <div style={{ 
      width: "100%",
      height: "100%",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        playsInline
      >
        <source src={CDN.videos.merryBronmas} type="video/mp4" />
      </video>
    </div>
  );
};

// Story 21.6: Birthday Tease - Staggered text like Story 21
const Story21_6_BirthdayTease = ({ action }) => {
  const [backgroundPhase, setBackgroundPhase] = useState(1);
  const typewriterText1 = "Forgetting something...";
  const typewriterText2 = "Someone's big day?...";
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [showText2, setShowText2] = useState(false);
  
  useEffect(() => {
    action("play");
    
    // Play Bron Ballad
    audioManager.play(CDN.audio.BronBallad, { volume: 0.6, loop: true });
    
    // Background color transition
    setTimeout(() => setBackgroundPhase(2), 3000);
    
    // Start second line after first completes
    setTimeout(() => setShowText2(true), 2500);
    
    return () => audioManager.stop();
  }, []);
  
  // Typewriter for first line
  useEffect(() => {
    if (displayText1.length < typewriterText1.length) {
      const timeout = setTimeout(() => {
        setDisplayText1(typewriterText1.slice(0, displayText1.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [displayText1]);
  
  // Typewriter for second line
  useEffect(() => {
    if (showText2 && displayText2.length < typewriterText2.length) {
      const timeout = setTimeout(() => {
        setDisplayText2(typewriterText2.slice(0, displayText2.length + 1));
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [showText2, displayText2]);
  
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: backgroundPhase === 1 
        ? `linear-gradient(135deg, ${colors.wine} 0%, ${colors.navy} 100%)`
        : `linear-gradient(135deg, ${colors.gold} 0%, #E5A800 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
      transition: "background 1.5s ease-in-out",
    }}>
      {/* Floating confetti elements */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${8 + Math.random() * 12}px`,
          height: `${8 + Math.random() * 12}px`,
          background: i % 3 === 0 ? colors.gold : (i % 3 === 1 ? colors.wine : colors.white),
          borderRadius: "50%",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.4,
          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <h1 style={{
          fontSize: "clamp(28px, 8vw, 48px)",
          fontWeight: 900,
          color: backgroundPhase === 1 ? colors.white : colors.navy,
          lineHeight: 1.3,
          margin: 0,
          minHeight: "1.5em",
          transition: "color 1.5s ease-in-out",
        }}>
          {displayText1}
          {displayText1.length < typewriterText1.length && (
            <span style={{ animation: "blink 0.8s infinite" }}>|</span>
          )}
        </h1>
        
        {showText2 && (
          <h1 style={{
            fontSize: "clamp(28px, 8vw, 48px)",
            fontWeight: 900,
            color: backgroundPhase === 1 ? colors.gold : colors.wine,
            lineHeight: 1.3,
            marginTop: "20px",
            minHeight: "1.5em",
            transition: "color 1.5s ease-in-out",
          }}>
            {displayText2}
            {displayText2.length < typewriterText2.length && (
              <span style={{ animation: "blink 0.8s infinite" }}>|</span>
            )}
          </h1>
        )}
      </div>
      
      {/* Birthday cake emoji */}
      <div style={{
        position: "absolute",
        bottom: "15%",
        fontSize: "clamp(60px, 18vw, 100px)",
        opacity: showText2 ? 1 : 0,
        transform: showText2 ? "scale(1)" : "scale(0)",
        transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        🎂
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

// Story 21.7: GOAT Day Birthday Video
const Story21_7_GoatDayVideo = ({ action }) => {
  const videoRef = useRef(null);
  
  useEffect(() => { 
    action("pause"); // Pause story while video plays
    
    // Stop any playing audio
    audioManager.stop();
    
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, []);

  const handleVideoEnd = () => {
    action("play"); // Resume story progression
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted={false}
        controls={false}
        onEnded={handleVideoEnd}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        playsInline
      >
        <source src={CDN.videos.goatDay} type="video/mp4" />
      </video>
    </div>
  );
};

// Story 22: Which LeBron Quiz
const Story22_WhichLebron = ({ action }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("pause"); // Pause auto-advance for user interaction
  }, []);

  const options = [
    { id: 1, text: "Carries his team on his back", result: "cavs" },
    { id: 2, text: "Aura", result: "miami" },
    { id: 3, text: "Longevity", result: "lakers" },
    { id: 4, text: "He's the Chosen One", result: "chosen" },
    { id: 5, text: "He's a bum, Jordan better", result: "jordan" },
  ];

  const handleOptionClick = (option, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    setSelectedOption(option.id);
    
    if (option.result === "jordan") {
      // Play LeBron sound effect and redirect out
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setTimeout(() => {
            window.location.href = "https://www.tiktok.com/@musicmediaco/video/7343777180360379690?q=lebron%20first%20day%20out&t=1766664007956";
          }, 1500); // Give time for sound to play
        });
      }
    } else {
      // Store selection and continue to next slide
      sessionStorage.setItem('lebronChoice', option.result);
      setTimeout(() => {
        action("play");
      }, 800);
    }
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: colors.lakersBlack,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
    }}>
      
      {/* Jordan Sound Effect */}
      <audio ref={audioRef}>
        <source src={CDN.audio.LEBRONSoundEffect} type="audio/mpeg" />
      </audio>
      
      {/* Title */}
      <h1 style={{
        fontSize: "clamp(32px, 8vw, 52px)",
        fontWeight: 900,
        color: colors.gold,
        fontFamily: "'Spotify Mix', sans-serif",
        fontStretch: "expanded",
        textAlign: "center",
        margin: "0 0 40px 0",
        lineHeight: 1.1,
      }}>
        WHICH LEBRON ARE YOU?
      </h1>
      
      {/* Options */}
      <div style={{
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={(e) => handleOptionClick(option, e)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              padding: "clamp(14px, 3vw, 20px) clamp(20px, 4vw, 28px)",
              background: selectedOption === option.id ? colors.gold : "transparent",
              color: selectedOption === option.id ? colors.lakersBlack : colors.gold,
              border: `2px solid ${colors.gold}`,
              borderRadius: "12px",
              fontSize: "clamp(14px, 3vw, 18px)",
              fontWeight: 700,
              fontFamily: "'Spotify Mix', sans-serif",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "center",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => {
              if (selectedOption !== option.id) {
                e.currentTarget.style.background = colors.gold;
                e.currentTarget.style.color = colors.lakersBlack;
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== option.id) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = colors.gold;
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// Story 23: LeBron Result Slide (shows based on user choice)
const Story23_LebronResult = ({ action }) => {
  const [choice] = useState(sessionStorage.getItem('lebronChoice') || 'cavs');
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    
    // Play audio for chosen one option
    if (choice === 'chosen' && audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const results = {
    cavs: {
      title: "Cavs LeBron",
      colors: { bg: colors.wine, text: colors.gold },
      image: CDN.images.lebronChalkTossCavs,
      isPolaroid: false,
    },
    miami: {
      title: "South Beach LeBron",
      colors: { bg: "#98002e", text: "#f9a01b" }, // Miami Heat colors
      image: CDN.images.lebronDwadeLob,
      isPolaroid: true,
    },
    lakers: {
      title: "Lakers LeBron",
      colors: { bg: colors.lakersPurple, text: colors.gold },
      image: CDN.images.lebronBronny,
      isPolaroid: true,
    },
    chosen: {
      title: "The Chosen Bron",
      colors: { bg: "#005643", text: "#FDBB30" }, // STVM green and gold
      image: CDN.images.chosenBron,
      isPolaroid: true,
    },
  };

  const result = results[choice];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: result.colors.bg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "60px 30px 40px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
    }}>
      
      {/* Audio for Chosen One */}
      {choice === 'chosen' && (
        <audio ref={audioRef} loop>
          <source src={CDN.audio.lework} type="audio/mpeg" />
        </audio>
      )}
      
      {/* Top Section - Text */}
      <div style={{
        textAlign: "center",
        animation: "fadeIn 0.8s ease-out",
      }}>
        <p style={{
          fontSize: "clamp(18px, 4vw, 28px)",
          fontWeight: 600,
          color: result.colors.text,
          margin: 0,
          opacity: 0.9,
        }}>
          You are
        </p>
        
        <h1 style={{
          fontSize: "clamp(36px, 9vw, 64px)",
          fontWeight: 900,
          color: result.colors.text,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStretch: "expanded",
          margin: "12px 0 0 0",
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}>
          {result.title}
        </h1>
      </div>
      
      {/* Bottom Section - Image */}
      <div style={{
        animation: "fadeInUp 1s ease-out 0.4s backwards",
      }}>
        {result.isPolaroid ? (
          <div style={{
            padding: "12px 12px 40px 12px",
            background: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            transform: "rotate(-2deg)",
            width: "clamp(220px, 45vw, 320px)",
          }}>
            <img 
              src={result.image}
              alt={result.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        ) : (
          <img 
            src={result.image}
            alt={result.title}
            style={{
              width: "clamp(240px, 50vw, 360px)",
              height: "auto",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
};

// Story 24: Your LeBron Type Result
const Story24_LebronResult = ({ action }) => {
  useEffect(() => { action("play"); }, []);

  return (
    <div style={{ ...baseStyle, ...gradientBg }}>
      <p style={subtitleStyle}>You are...</p>
      
      <div style={{
        marginTop: 24,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.purple} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 100,
        boxShadow: "0 20px 60px rgba(253, 185, 39, 0.4)",
      }}>
        💪
      </div>
      
      <h1 style={{ ...titleStyle, ...accentText, marginTop: 24 }}>
        {userData.lebronType.name.toUpperCase()}
      </h1>
      <p style={{ 
        color: colors.white, 
        fontSize: 16,
        marginTop: 12,
        textAlign: "center",
        maxWidth: 280,
      }}>
        {userData.lebronType.description}
      </p>
    </div>
  );
};

// Story 25: Great Company
const Story25_GreatCompany = ({ action }) => {
  useEffect(() => { action("play"); }, []);

  return (
    <div style={{ ...baseStyle, ...gradientBg }}>
      <h1 style={{ ...titleStyle, fontSize: 28 }}>
        YOU'RE IN
      </h1>
      <h1 style={{ ...titleStyle, ...accentText, fontSize: 36, marginTop: 8 }}>
        GREAT COMPANY
      </h1>
      
      <div style={{ marginTop: 40 }}>
        <h1 style={{ ...bigNumberStyle, fontSize: 80 }}>
          {userData.lebronType.percentage}%
        </h1>
        <p style={{ color: colors.white, fontSize: 16, marginTop: 8 }}>
          of global listeners
        </p>
        <p style={{ color: colors.gray, fontSize: 14, marginTop: 4 }}>
          are in your club
        </p>
      </div>
      
      <div style={{
        marginTop: 32,
        display: "flex",
        gap: 4,
      }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: i < Math.round(userData.lebronType.percentage / 10) 
                ? colors.gold 
                : "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
            }}
          >
            👤
          </div>
        ))}
      </div>
    </div>
  );
};

// Story 26: Victory Lap
// Story26: Victory Lap - Spotify Wrapped style with cream bg, curves, and checkered 2025
const Story26_VictoryLap = ({ action }) => {
  const [phase, setPhase] = useState(1);
  
  useEffect(() => { 
    action("play");
    
    // Play Like LeBron song
    audioManager.play(CDN.audio.LikeLeBron, { volume: 0.6, loop: true });
    
    // Animate in phases
    setTimeout(() => setPhase(2), 1500);
    setTimeout(() => setPhase(3), 3000);
    
    return () => audioManager.stop();
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#F5F5F0", // Cream/beige like Spotify
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px 30px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Curved decorative lines at top */}
      <svg style={{ position: "absolute", top: "5%", left: "0", width: "100%", height: "25%", zIndex: 1 }} viewBox="0 0 400 150" preserveAspectRatio="none">
        <path d="M 0 100 Q 100 50, 200 80 T 400 60" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 1.5s ease-out forwards" }} />
        <path d="M 0 120 Q 150 70, 300 100 T 400 80" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 1.5s ease-out 0.2s forwards" }} />
        <ellipse cx="350" cy="40" rx="60" ry="30" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 1s ease-out 0.4s forwards" }} />
      </svg>
      
      {/* Main text */}
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <h1 style={{
          fontSize: "clamp(32px, 8vw, 52px)",
          fontWeight: 900,
          color: "#1a1a1a",
          fontFamily: "'Spotify Mix', sans-serif",
          margin: 0,
          lineHeight: 1.1,
          opacity: 0,
          animation: "fadeSlideIn 0.8s ease-out 0.3s forwards",
        }}>
          Time for your<br/>victory lap.
        </h1>
        
        <p style={{
          fontSize: "clamp(16px, 4vw, 22px)",
          fontWeight: 400,
          color: "#1a1a1a",
          fontFamily: "'Spotify Mix', sans-serif",
          margin: "24px 0 0 0",
          lineHeight: 1.4,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease-out",
        }}>
          And if you're not ready for<br/>Wrapped to be over, well...
        </p>
      </div>
      
      {/* Bottom: Checkered pattern with 2025 */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40%",
        overflow: "hidden",
        opacity: phase >= 3 ? 1 : 0,
        transform: phase >= 3 ? "translateY(0)" : "translateY(100px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Checkered pattern */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "-20%",
          right: "-20%",
          height: "100%",
          background: `
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
            linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          transform: "perspective(500px) rotateX(30deg)",
          transformOrigin: "bottom center",
        }} />
        
        {/* Big "2025" text */}
        <div style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(120px, 35vw, 220px)",
          fontWeight: 900,
          fontFamily: "'Spotify Mix', sans-serif",
          fontStyle: "italic",
          color: "#FF4136", // Red like in Spotify image
          WebkitTextStroke: "3px #1a1a1a",
          paintOrder: "stroke fill",
          lineHeight: 0.8,
          letterSpacing: "-8px",
          textShadow: "8px 8px 0px #1a1a1a",
          animation: "bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 3s backwards",
        }}>
          2025
        </div>
      </div>
      
      {/* Curved line accent */}
      <svg style={{ position: "absolute", bottom: "35%", left: "5%", width: "40%", height: "10%", zIndex: 2 }} viewBox="0 0 200 50" preserveAspectRatio="none">
        <path d="M 0 30 Q 50 10, 100 25 T 200 20" fill="none" stroke="#1a1a1a" strokeWidth="1.5" style={{ animation: "drawPath 1s ease-out 2.5s forwards" }} />
      </svg>
      
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; }
          to { stroke-dashoffset: 0; stroke-dasharray: 500; }
        }
        @keyframes bounceIn {
          0% { transform: translateX(-50%) scale(0); }
          60% { transform: translateX(-50%) scale(1.1); }
          100% { transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

// Story 27: Final Share Card - Spotify Wrapped style exportable card
const Story27_ShareCard = ({ action }) => {
  const audioRef = useRef(null);
  
  useEffect(() => { 
    action("play");
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#F5F5F0", // Cream background like Spotify
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px 20px",
      fontFamily: "'Spotify Mix', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      
      {/* Background Audio - I Believe in LeBron */}
      <audio ref={audioRef} loop>
        <source src={CDN.audio.IBelieveInLeBron} type="audio/mpeg" />
      </audio>
      
      {/* Main Share Card */}
      <div style={{
        width: "clamp(300px, 85vw, 380px)",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        animation: "cardPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}>
        {/* Top section - Image with checkered border */}
        <div style={{ position: "relative" }}>
          {/* Checkered border frame */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              repeating-conic-gradient(#1a1a1a 0% 25%, #fff 0% 50%) 
              50% / 16px 16px
            `,
            zIndex: 1,
          }} />
          
          {/* Inner content area */}
          <div style={{
            margin: "10px",
            position: "relative",
            zIndex: 2,
            background: "#fff",
          }}>
            {/* 2025 decoration on left side */}
            <div style={{
              position: "absolute",
              left: "-5px",
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              fontSize: "clamp(50px, 14vw, 70px)",
              fontWeight: 900,
              fontStyle: "italic",
              fontFamily: "'Spotify Mix', sans-serif",
              color: colors.gold,
              WebkitTextStroke: "2px #1a1a1a",
              paintOrder: "stroke fill",
              zIndex: 3,
              letterSpacing: "-4px",
              textShadow: "3px 3px 0px #1a1a1a",
            }}>
              2025
            </div>
            
            {/* Top Artist Image */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              background: `linear-gradient(135deg, ${colors.gold} 0%, #B8860B 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Scribble decoration */}
              <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.3 }} viewBox="0 0 200 200">
                <path d="M 20 30 Q 60 10, 100 40 T 180 50" fill="none" stroke="#fff" strokeWidth="2" />
                <path d="M 10 150 Q 50 180, 100 160 T 190 170" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>
              
              <img 
                src={userData.topArtists[0]?.image || CDN.images.ilyaugust}
                alt={userData.topArtists[0]?.name || "Top Artist"}
                style={{
                  width: "65%",
                  height: "65%",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "5px solid #fff",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Bottom section - Stats */}
        <div style={{
          background: "#1a1a1a",
          padding: "24px",
          color: "#fff",
        }}>
          {/* Two columns */}
          <div style={{ display: "flex", gap: "28px" }}>
            {/* Top Artists */}
            <div style={{ flex: 1 }}>
              <p style={{ 
                color: "#888", 
                fontSize: "12px", 
                margin: "0 0 12px 0",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>Top Artists</p>
              {userData.topArtists.slice(0, 5).map((artist, i) => (
                <p key={i} style={{ 
                  color: "#fff", 
                  fontSize: "14px", 
                  fontWeight: 700,
                  margin: "6px 0",
                  fontFamily: "'Spotify Mix', sans-serif",
                }}>
                  <span style={{ color: "#666", marginRight: "8px", fontWeight: 400 }}>{i + 1}</span>
                  {artist.name}
                </p>
              ))}
            </div>
            
            {/* Top Songs */}
            <div style={{ flex: 1 }}>
              <p style={{ 
                color: "#888", 
                fontSize: "12px", 
                margin: "0 0 12px 0",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>Top Songs</p>
              {userData.topSongs.slice(0, 5).map((song, i) => (
                <p key={i} style={{ 
                  color: "#fff", 
                  fontSize: "14px", 
                  fontWeight: 700,
                  margin: "6px 0",
                  fontFamily: "'Spotify Mix', sans-serif",
                }}>
                  <span style={{ color: "#666", marginRight: "8px", fontWeight: 400 }}>{i + 1}</span>
                  {song.title}
                </p>
              ))}
            </div>
          </div>
          
          {/* Stats row */}
          <div style={{
            display: "flex",
            gap: "40px",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #333",
          }}>
            <div>
              <p style={{ color: "#888", fontSize: "11px", margin: "0 0 4px 0", textTransform: "uppercase" }}>Minutes Listened</p>
              <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: 0, fontFamily: "'Spotify Mix', sans-serif" }}>
                {userData.minutesListened.toLocaleString()}
              </p>
            </div>
            <div>
              <p style={{ color: "#888", fontSize: "11px", margin: "0 0 4px 0", textTransform: "uppercase" }}>Top Genre</p>
              <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: 0, fontFamily: "'Spotify Mix', sans-serif" }}>
                {userData.topGenres[0]}
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid #333",
          }}>
            {/* LeBron logo for Bronify */}
            <img src={CDN.images.lebronLogo} alt="LeBron" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
            <p style={{ color: "#666", fontSize: "12px", margin: 0, letterSpacing: "1px", fontWeight: 600 }}>
              BRONIFY.COM/WRAPPED
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes cardPopIn {
          0% { transform: scale(0.8) translateY(30px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// STORIES ARRAY
// ============================================================================
export const bronifyStories = [
  { content: Story1_Intro, duration: 30000 },
  { content: Story2_WeListened, duration: 30000 },
  { content: Story3_Minutes, duration: 30000 },
  { content: Story4_TasteDefined, duration: 30000 },
  { content: Story4_5_GenreCounter, duration: 30000 }, // Bronny Jean.mp3
  { content: Story5_TopGenres, duration: 30000 }, // Bron Thoughts.mp3
  { content: Story6_Mindset, duration: 30000 },
  { content: Story7_WhichLebronQuiz, duration: 30000 }, // Young Wild and Three.mp3
  { content: Story7_Result, duration: 30000 }, // Dynamic audio per result
  { content: Story8_SongsIntro, duration: 30000 }, // Bron Belongs with Me.mp3
  { content: Story9_Quiz, duration: 30000 },
  { content: Story10_TopSong, duration: 30000 },
  { content: Story11_TopSongs, duration: 30000 }, // manonthelakers.mp3
  { content: Story12_AlbumsIntro, duration: 30000 }, // Bron's Room.mp3
  { content: Story13_TopAlbum, duration: 30000 }, // Superteams.mp3
  { content: Story14_TopAlbums, duration: 30000 }, // Continue Superteams.mp3
  { content: Story15_ArtistsIntro, duration: 30000 }, // Save Your Bron.mp3
  { content: Story15_5_SpecialArtists, duration: 30000 }, // LeTreasure.mp3
  { content: Story16_TopArtistTease, duration: 30000 }, // Continue LeTreasure.mp3
  { content: Story17_BasketballGame, duration: 35000 }, // lework_yUIpF84P.mp3
  { content: Story18_5_TopArtistReveal, duration: 30000 }, // LeNade.mp3
  { content: Story18_TopArtists, duration: 30000 }, // Bron to the Moon.mp3
  { content: Story19_WordIntro, duration: 30000 }, // BronKIA.mp3
  { content: Story20_Video, duration: 30000 },
  { content: Story21_Bigger, duration: 30000 },
  { content: Story21_5_MerryBronmas, duration: 30000 },
  { content: Story21_6_BirthdayTease, duration: 30000 }, // Bron Ballad.mp3
  { content: Story21_7_GoatDayVideo, duration: 60000 }, // Birthday video
  { content: Story26_VictoryLap, duration: 30000 }, // Like LeBron.mp3
  { content: Story27_ShareCard, duration: 30000 }, // I Believe in LeBron.mp3
];

export default bronifyStories;



