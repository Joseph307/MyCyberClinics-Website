import { logEvent, type Analytics } from "firebase/analytics";
import { initializeFirebaseAnalytics } from "./firebase";

type AnalyticsParamValue = string | number;
type AnalyticsParams = Record<string, AnalyticsParamValue>;

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
