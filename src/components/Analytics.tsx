"use client";

import { Analytics } from "@vercel/analytics/next";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

function PostHogInit({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (key) {
      posthog.init(key, {
        api_host: host || "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        persistence: "localStorage",
      });
      setReady(true);
    }
  }, []);

  if (!ready) return <>{children}</>;
  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export default function AnalyticsProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostHogInit>
      {children}
      <Analytics />
    </PostHogInit>
  );
}
