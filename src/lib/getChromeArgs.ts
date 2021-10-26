import { getStage } from './getStage';

/**
 * getChromeArgs returns the arguments for Chrome browser in Puppeteer options.
 *
 * @category Utilities
 */
export function getChromeArgs() {
  const stage = getStage();
  if (stage !== 'local') return args;

  return args.concat([
    '–no-sandbox',
    '–disable-setuid-sandbox',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
  ]);
}

const args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--disk-cache-size=33554432',
  '--hide-scrollbars',
  '--ignore-gpu-blocklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--ignore-certificate-errors',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--start-maximized',
];
