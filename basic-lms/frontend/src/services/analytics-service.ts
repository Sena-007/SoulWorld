type AnalyticsPayload = Record<string, string | number | boolean>;

export interface AnalyticsClient {
  track: (eventName: string, payload: AnalyticsPayload) => void;
}

class ConsoleAnalyticsClient implements AnalyticsClient {
  public track(eventName: string, payload: AnalyticsPayload): void {
    // Placeholder implementation for MVP instrumentation.
    // Replace with Firebase Analytics/Sentry integration in production.
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${eventName}`, payload);
  }
}

export const analyticsClient: AnalyticsClient = new ConsoleAnalyticsClient();

