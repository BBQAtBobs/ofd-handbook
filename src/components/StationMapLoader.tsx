"use client";

import dynamic from "next/dynamic";

const StationMap = dynamic(() => import("@/components/StationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-bg-warm h-[calc(100vh-3.5rem)]">
      <div className="text-center p-8">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-secondary">Loading map…</p>
      </div>
    </div>
  ),
});

export default function StationMapLoader() {
  return <StationMap />;
}
