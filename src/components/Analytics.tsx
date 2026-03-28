"use client";

import { Analytics } from "@vercel/analytics/next";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

function PostHogInit({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
    if (key) {
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        persistence: "localStorage",
      });

      // Allow opt-out via ?ph_optout and opt back in via ?ph_optin
      const params = new URLSearchParams(window.location.search);
      if (params.has("ph_optout")) {
        posthog.opt_out_capturing();
      } else if (params.has("ph_optin")) {
        posthog.opt_in_capturing();
      }

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
