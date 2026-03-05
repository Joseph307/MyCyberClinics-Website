import { logEvent, type Analytics } from "firebase/analytics";
import { initializeFirebaseAnalytics } from "./firebase";

type AnalyticsParamValue = string | number;
type AnalyticsParams = Record<string, AnalyticsParamValue>;
const TRACK_FLUSH_TIMEOUT_MS = 180;

let analyticsPromise: Promise<Analytics | null> | null = null;

const getAnalyticsInstance = () => {
  if (!analyticsPromise) {
    analyticsPromise = initializeFirebaseAnalytics(); 
  }
  return analyticsPromise;
};

export async function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined") return;

  try {
    const analytics = await getAnalyticsInstance();
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch {
    // Keep UX unaffected if analytics is unavailable.
  }
}

export async function trackEventAndNavigate(
  url: string,
  eventName: string,
  params: AnalyticsParams = {},
  target: "_self" | "_blank" = "_self",
) {
  const timeout = new Promise((resolve) => {
    window.setTimeout(resolve, TRACK_FLUSH_TIMEOUT_MS);
  });

  await Promise.race([trackAnalyticsEvent(eventName, params), timeout]);

  if (target === "_blank") {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.href = url;
}
