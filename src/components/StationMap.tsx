"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stations, battalionInfo, type Station } from "@/data/stations";
import { events } from "@/lib/analytics";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const OAKLAND_CENTER: [number, number] = [-122.2211, 37.7949];
const INITIAL_ZOOM = 11.5;

type BnFilter = 2 | 3 | 4 | "all";

function StationCard({
  station,
  onClose,
}: {
  station: Station;
  onClose: () => void;
}) {
  const bn = battalionInfo[station.bn];
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5 shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-white text-sm"
            style={{ backgroundColor: bn.color }}
          >
            {station.num}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-primary leading-tight">
              Station {station.num}
            </h3>
            <p className="text-xs text-muted">{bn.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-primary transition-colors p-1"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
            Address
          </div>
          <div className="text-primary">
            {station.addr}, Oakland CA {station.zip}
          </div>
        </div>

        <div className="flex gap-4">
          <div>
            <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
              Type
            </div>
            <div className="text-primary">{station.type} House</div>
          </div>
          {station.engines.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Engines
              </div>
              <div className="text-primary">
                {station.engines.join(", ")}
              </div>
            </div>
          )}
          {station.trucks.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Trucks
              </div>
              <div className="text-primary">
                {station.trucks.join(", ")}
              </div>
            </div>
          )}
        </div>

        {station.rescue.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
              Rescue / Specialty
            </div>
            <div className="flex flex-wrap gap-1.5">
              {station.rescue.map((r) => (
                <span
                  key={r}
                  className="px-2 py-0.5 rounded-md bg-blue-soft text-blue text-xs font-medium"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        {station.special.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
              Special Assignments
            </div>
            <div className="flex flex-wrap gap-1.5">
              {station.special.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-md bg-amber-soft text-amber text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
            Notes
          </div>
          <div className="text-secondary text-xs leading-relaxed">
            {station.notes}
          </div>
        </div>
      </div>
    </div>
  );
}

function StationListItem({
  station,
  isSelected,
  onClick,
}: {
  station: Station;
  isSelected: boolean;
  onClick: () => void;
}) {
  const bn = battalionInfo[station.bn];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        isSelected
          ? "bg-bg-white border-border shadow-sm"
          : "bg-transparent border-transparent hover:bg-bg-subtle hover:border-border-light"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center font-heading font-bold text-white text-xs shrink-0"
          style={{ backgroundColor: bn.color }}
        >
          {station.num}
        </div>
        <div className="min-w-0">
          <div className="font-heading font-bold text-sm text-primary truncate">
            Station {station.num}
          </div>
          <div className="text-xs text-muted truncate">{station.addr}</div>
        </div>
        <div className="ml-auto flex flex-wrap gap-1 shrink-0">
          {station.engines.map((e) => (
            <span key={e} className="text-[10px] font-mono font-medium text-secondary">
              {e}
            </span>
          ))}
          {station.trucks.map((t) => (
            <span key={t} className="text-[10px] font-mono font-medium text-accent">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function StationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selected, setSelected] = useState<Station | null>(null);
  const [bnFilter, setBnFilter] = useState<BnFilter>("all");

  const filteredStations =
    bnFilter === "all" ? stations : stations.filter((s) => s.bn === bnFilter);

  const selectStation = useCallback((station: Station | null) => {
    setSelected(station);
    if (station) {
      events.stationViewed(station.num);
      map.current?.flyTo({
        center: [station.lng, station.lat],
        zoom: 14,
        duration: 800,
      });
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;
    if (map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: OAKLAND_CENTER,
      zoom: INITIAL_ZOOM,
      attributionControl: false,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredStations.forEach((station) => {
      const bn = battalionInfo[station.bn];

      const el = document.createElement("div");
      el.className = "station-marker";
      el.style.cssText = `
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background: ${bn.color};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-heading), system-ui;
        font-weight: 700;
        font-size: 11px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        transition: transform 0.15s ease;
      `;
      el.textContent = String(station.num);
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.2)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([station.lng, station.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => selectStation(station));
      markersRef.current.push(marker);
    });
  }, [filteredStations, selectStation]);

  const bnButtons: { value: BnFilter; label: string; color: string }[] = [
    { value: "all", label: "All", color: "#1a1714" },
    { value: 2, label: "Bn 2", color: battalionInfo[2].color },
    { value: 3, label: "Bn 3", color: battalionInfo[3].color },
    { value: 4, label: "Bn 4", color: battalionInfo[4].color },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-border-light bg-bg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border-light">
          <h1 className="heading text-2xl text-primary mb-3">Stations</h1>
          {/* Battalion filter */}
          <div className="flex gap-2">
            {bnButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => {
                  setBnFilter(btn.value);
                  setSelected(null);
                  if (btn.value === "all") {
                    map.current?.flyTo({
                      center: OAKLAND_CENTER,
                      zoom: INITIAL_ZOOM,
                      duration: 600,
                    });
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  bnFilter === btn.value
                    ? "text-white shadow-sm"
                    : "text-secondary bg-bg-subtle hover:bg-bg-warm"
                }`}
                style={
                  bnFilter === btn.value
                    ? { backgroundColor: btn.color }
                    : undefined
                }
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Station detail or list */}
        <div className="flex-1 overflow-y-auto p-3">
          {selected ? (
            <StationCard
              station={selected}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="space-y-1">
              {filteredStations.map((station) => (
                <StationListItem
                  key={station.num}
                  station={station}
                  isSelected={false}
                  onClick={() => selectStation(station)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative min-h-[300px]">
        {!MAPBOX_TOKEN ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-warm">
            <div className="text-center p-8">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="font-heading font-bold text-lg text-primary mb-2">
                Map requires Mapbox token
              </p>
              <p className="text-sm text-secondary">
                Set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file.
              </p>
            </div>
          </div>
        ) : null}
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
    </div>
  );
}
