# Bronify Wrapped 2025

A year-end wrapped experience for Bronify, the LeBron James music streaming platform.

Live at [bronifywrapped.vercel.app](https://bronifywrapped.vercel.app)

## About

Bronify Wrapped is a Spotify Wrapped-style experience built for Bronify, a music streaming platform centered around LeBron James-themed music. The original Bronify app started from a TikTok slideshow concept about a world where you could only consume LeBron products. The idea of "Bronify" (Bron + Spotify) emerged as the music platform in this universe.

After launching a simple vanilla JavaScript version and gaining traction, the community began contributing LeBron-themed parody songs, growing the library significantly. This wrapped experience celebrates that community and showcases the year's top songs, albums, and artists from the Bronify platform.

Released in celebration of LeBron's 41st birthday and 23rd NBA season, the wrapped features 27 interactive story slides with animations, quizzes, a playable basketball game, and video content, all themed around LeBron's career and the Bronify music library.

## Technical Overview

Built with React 18.2.0 and a custom stories component. The app includes:

- 27 story slides with unique animations
- 24 LeBron-themed parody songs (lazy-loaded from CDN)
- Interactive quizzes and a playable basketball mini-game
- Video content and dynamic visualizations
- Responsive design optimized for mobile and desktop
- Custom audio management system with iOS Safari compatibility

## Local Development

### Prerequisites

- Node.js 14 or higher
- npm

### Installation

```bash
git clone https://github.com/aminester/bronifywrapped.git
cd bronifywrapped
npm install
cd example && npm install && cd ..
```

### Running the App

```bash
# Terminal 1: Watch library for changes
npm start

# Terminal 2: Run the app
npm run example
```

The app will open at http://localhost:8080

### Building for Production

```bash
# Build everything
npm run buildall

# Or build just the app
cd example && npm run build
```

## Project Structure

```
bronify-wrapped/
├── example/                  # Main application
│   ├── src/
│   │   ├── App.js           # Main container
│   │   ├── BronifyWrapped.js # All 27 story slides
│   │   ├── AudioManager.js  # Audio system
│   │   └── logger.js        # Logging utility
│   └── public/
│       ├── music/           # Audio files
│       ├── images/          # Images and album art
│       └── font/            # Spotify Mix font
├── src/                     # Stories component library
└── dist/                    # Compiled output
```

## Deployment

The app automatically deploys to Vercel on push to main branch.

Build command: `cd example && npm install && npm run build`

Output directory: `example/dist`

## Documentation

See [TECHNICAL_DEEP_DIVE.md](TECHNICAL_DEEP_DIVE.md) for detailed technical documentation.

## License

MIT
