import { useState, useEffect, useRef } from 'react';
import logger from './logger';

// Lazy-load and manage audio across all stories
class AudioManager {
  constructor() {
    this.audioCache = {};
    this.currentAudio = null;
    this.isUnlocked = false;
  }

  // Unlock iOS audio on first user interaction
  unlockAudio() {
    if (this.isUnlocked) {
      logger.info('🔓 Audio already unlocked');
      return Promise.resolve();
    }
    
    logger.info('🔓 Attempting to unlock audio...');
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhAC6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urq6urr////////////////////////////////////////////AAAAAExhdmM1OC4xMzAAAAAAAAAAAAAAAAQgJAAAAAAAAAOEP+zKjgAAAAAAAAAAAAAAAAAAAAD/+xBkAAP8AAAaQAAAAgAAA0gAAAAAQAAANIAAAACAAADSAAAABLTAwLTE5AD///////////////////////////////8=';
    
    return audio.play().then(() => {
      this.isUnlocked = true;
      audio.pause();
      audio.remove();
      logger.info('✅ Audio unlocked successfully');
    }).catch((error) => {
      this.isUnlocked = false;
      logger.warn('⚠️ Audio unlock failed (will retry on play)', error);
      // Don't reject - just log and continue
      return Promise.resolve();
    });
  }

  // Preload audio file
  preload(url) {
    if (this.audioCache[url]) {
      logger.info(`♻️ Audio already cached: ${this.getFileName(url)}`);
      return Promise.resolve(this.audioCache[url]);
    }

    logger.info(`⏬ Loading audio: ${this.getFileName(url)}`);
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'auto';
      
      // Load enough data to start playing
      audio.addEventListener('canplay', () => {
        this.audioCache[url] = audio;
        logger.info(`✅ Audio loaded: ${this.getFileName(url)}`);
        resolve(audio);
      }, { once: true });

      audio.addEventListener('error', (error) => {
        logger.error(`❌ Audio load failed: ${this.getFileName(url)}`, error);
        reject(error);
      }, { once: true });
      
      audio.src = url;
      audio.load();
    });
  }

  // Get filename from URL for logging
  getFileName(url) {
    try {
      return decodeURIComponent(url.split('/').pop());
    } catch {
      return url.split('/').pop();
    }
  }

  // Play audio with lazy loading - loads on-demand if not cached
  async play(url, options = {}) {
    const { volume = 0.5, loop = false, fadeInDuration = 1000 } = options;
    const fileName = this.getFileName(url);

    try {
      // Stop current audio first
      if (this.currentAudio && this.currentAudio !== this.audioCache[url]) {
        await this.fadeOut(this.currentAudio, 300);
        this.currentAudio.pause();
      }

      // 🆕 LAZY LOAD: If not cached, load it now
      if (!this.audioCache[url]) {
        logger.info(`🔄 Loading audio on-demand: ${fileName}`);
        await this.preload(url);
      }

      const audio = this.audioCache[url];
      if (!audio) {
        logger.error('❌ Audio not found after preload', { url: fileName });
        return null;
      }

      this.currentAudio = audio;
      audio.loop = loop;
      audio.volume = 0;
      audio.currentTime = 0;

      await audio.play();
      logger.info(`▶️ Audio playing: ${fileName}`);

      await this.fadeIn(audio, volume, fadeInDuration);
      
      return audio;
    } catch (error) {
      logger.error(`❌ Audio play failed: ${fileName}`, error);
      return null;
    }
  }

  // Fade in audio - returns a promise
  fadeIn(audio, targetVolume, duration) {
    if (!audio) return Promise.resolve();
    
    return new Promise((resolve) => {
      const steps = 20;
      const stepTime = duration / steps;
      const volumeStep = targetVolume / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          audio.volume = targetVolume;
          resolve();
          return;
        }
        audio.volume = Math.min(volumeStep * currentStep, 1);
        currentStep++;
      }, stepTime);
    });
  }

  // Fade out audio - returns a promise
  fadeOut(audio, duration) {
    if (!audio) return Promise.resolve();
    
    return new Promise((resolve) => {
      const initialVolume = audio.volume;
      const steps = 10;
      const stepTime = duration / steps;
      const volumeStep = initialVolume / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          audio.pause();
          audio.volume = initialVolume;
          resolve();
          return;
        }
        audio.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
        currentStep++;
      }, stepTime);
    });
  }

  // Stop current audio
  stop() {
    if (this.currentAudio) {
      this.fadeOut(this.currentAudio, 200);
      this.currentAudio = null;
    }
  }
}

// Singleton instance
const audioManager = new AudioManager();

// Hook for using audio in components
export const useAudio = (url, options = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const play = async () => {
    setIsLoading(true);
    setIsPlaying(true);
    audioRef.current = await audioManager.play(url, options);
    setIsLoading(false);
  };

  const stop = () => {
    setIsPlaying(false);
    audioManager.stop();
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioManager.stop();
      }
    };
  }, [url]);

  return { play, stop, isPlaying, isLoading };
};

// Unlock audio on user interaction
export const unlockAudio = () => {
  return audioManager.unlockAudio();
};

export default audioManager;
