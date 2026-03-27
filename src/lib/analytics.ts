import posthog from "posthog-js";

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(event, properties);
  }
}

// Pre-defined events for consistent tracking
export const events = {
  stationViewed: (stationNum: number) =>
    trackEvent("station_viewed", { station: stationNum }),
  trackStarted: (trackSlug: string) =>
    trackEvent("learning_track_started", { track: trackSlug }),
  trackCompleted: (trackSlug: string) =>
    trackEvent("learning_track_completed", { track: trackSlug }),
  searchPerformed: (query: string, resultCount: number) =>
    trackEvent("search_performed", { query, result_count: resultCount }),
  quickRefViewed: (cardName: string) =>
    trackEvent("quick_ref_viewed", { card: cardName }),
  toolViewed: (toolName: string) =>
    trackEvent("tool_viewed", { tool: toolName }),
};
