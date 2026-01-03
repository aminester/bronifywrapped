// Logger utility with device tagging for Vercel logs

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let device = 'Desktop';
  let os = 'Unknown';
  let browser = 'Unknown';

  // Detect OS
  if (/iPhone|iPad|iPod/.test(ua)) {
    device = 'iOS';
    os = 'iOS';
  } else if (/Android/.test(ua)) {
    device = 'Android';
    os = 'Android';
  } else if (/Mac/.test(ua)) {
    device = 'Desktop';
    os = 'macOS';
  } else if (/Win/.test(ua)) {
    device = 'Desktop';
    os = 'Windows';
  } else if (/Linux/.test(ua)) {
    device = 'Desktop';
    os = 'Linux';
  }

  // Detect Browser
  if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
    browser = 'Safari';
  } else if (/Chrome/.test(ua)) {
    browser = 'Chrome';
  } else if (/Firefox/.test(ua)) {
    browser = 'Firefox';
  }

  const viewport = `${window.innerWidth}x${window.innerHeight}`;
  
  return {
    device,
    os,
    browser,
    viewport,
    userAgent: ua,
    timestamp: new Date().toISOString(),
  };
};

const formatLog = (level, message, data = {}) => {
  const deviceInfo = getDeviceInfo();
  const logData = {
    level,
    message,
    ...deviceInfo,
    ...data,
  };
  
  const prefix = `[BRONIFY] [${deviceInfo.device}/${deviceInfo.os}/${deviceInfo.browser}]`;
  return { prefix, logData };
};

export const logger = {
  info: (message, data = {}) => {
    const { prefix, logData } = formatLog('INFO', message, data);
    console.log(`${prefix} ${message}`, logData);
  },
  
  warn: (message, data = {}) => {
    const { prefix, logData } = formatLog('WARN', message, data);
    console.warn(`${prefix} ${message}`, logData);
  },
  
  error: (message, error = null, data = {}) => {
    const { prefix, logData } = formatLog('ERROR', message, {
      ...data,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : null,
    });
    console.error(`${prefix} ${message}`, logData);
  },
  
  event: (eventName, data = {}) => {
    const { prefix, logData } = formatLog('EVENT', eventName, data);
    console.log(`${prefix} EVENT: ${eventName}`, logData);
  },
};

export default logger;

