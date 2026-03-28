"use client";

import { Analytics } from "@vercel/analytics/next";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

function PostHogInit({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    if (!key) return;

    // Check opt-out/opt-in query params BEFORE init
    const params = new URLSearchParams(window.location.search);
    if (params.has("ph_optout")) {
      // Set the opt-out flag in localStorage so init() respects it
      try { localStorage.setItem("ph_optout", "1"); } catch {}
    } else if (params.has("ph_optin")) {
      try { localStorage.removeItem("ph_optout"); } catch {}
    }

    // Check if user has opted out
    const isOptedOut = (() => {
      try { return localStorage.getItem("ph_optout") === "1"; } catch { return false; }
    })();

    posthog.init(key, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: !isOptedOut,
      capture_pageleave: !isOptedOut,
      persistence: "localStorage",
      person_profiles: "always",
      opt_out_capturing_by_default: isOptedOut,
    });

    // Also call the PostHog opt-out API to be thorough
    if (isOptedOut) {
      posthog.opt_out_capturing();
    }

    setReady(true);
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
