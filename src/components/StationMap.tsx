"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stations, battalionInfo, truckCompanies, type Station } from "@/data/stations";
import { events } from "@/lib/analytics";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const OAKLAND_CENTER: [number, number] = [-122.2211, 37.7949];
const INITIAL_ZOOM = 11.5;

// Mobile bottom sheet snap points (fraction of viewport height minus header)
const SNAP_COLLAPSED = 0.18;
const SNAP_HALF = 0.45;
const SNAP_EXPANDED = 0.75;

type FilterMode =
  | "all"
  | "bn2"
  | "bn3"
  | "bn4"
  | "double"
  | "specialty"
  | "trucks"
  | "wildland";

const MAP_STYLES = [
  { id: "streets", label: "Streets", url: "mapbox://styles/mapbox/streets-v12" },
  { id: "light", label: "Light", url: "mapbox://styles/mapbox/light-v11" },
  { id: "satellite", label: "Satellite", url: "mapbox://styles/mapbox/satellite-streets-v12" },
  { id: "dark", label: "Dark", url: "mapbox://styles/mapbox/dark-v11" },
  { id: "outdoors", label: "Terrain", url: "mapbox://styles/mapbox/outdoors-v12" },
] as const;

const FILTERS: { id: FilterMode; label: string; color?: string }[] = [
  { id: "all", label: "All Stations" },
  { id: "bn2", label: "Bn 2", color: battalionInfo[2].color },
  { id: "bn3", label: "Bn 3", color: battalionInfo[3].color },
  { id: "bn4", label: "Bn 4", color: battalionInfo[4].color },
  { id: "double", label: "Double Houses" },
  { id: "trucks", label: "Truck Co." },
  { id: "specialty", label: "Specialty" },
  { id: "wildland", label: "Wildland" },
];

function getFilteredStations(mode: FilterMode): Station[] {
  switch (mode) {
    case "bn2":
      return stations.filter((s) => s.bn === 2);
    case "bn3":
      return stations.filter((s) => s.bn === 3);
    case "bn4":
      return stations.filter((s) => s.bn === 4);
    case "double":
      return stations.filter((s) => s.type === "Double");
    case "trucks":
      return stations.filter((s) => s.trucks.length > 0);
    case "specialty":
      return stations.filter(
        (s) =>
          s.special.length > 0 &&
          !s.special.every((sp) => sp === "Currently Closed" || sp === "Staffed with Stn 10 crew")
      );
    case "wildland":
      return stations.filter((s) =>
        s.special.some((sp) => sp.toLowerCase().includes("wildland"))
      );
    default:
      return stations;
  }
}

/** Short label for specialty stations shown on map markers */
function getSpecialtyLabel(station: Station): string {
  const specials = station.special.join(" ").toLowerCase();
  const rescue = station.rescue.join(" ").toLowerCase();
  if (specials.includes("hazmat")) return "HazMat";
  if (specials.includes("water") || rescue.includes("boat") || rescue.includes("zodiac"))
    return "Water Rescue";
  if (specials.includes("arff")) return "ARFF";
  if (specials.includes("type vi wildland")) return "Wildland VI";
  if (specials.includes("type iii wildland")) return "Wildland III";
  if (specials.includes("bn 2 hq") || specials.includes("bn 3 hq") || specials.includes("bn 4 hq"))
    return "Bn HQ";
  if (specials.includes("ready reserve")) return "Reserve";
  if (specials.includes("chain saw")) return "Repair";
  if (rescue.includes("rescue")) return "Rescue";
  return "";
}

/** Color for specialty label badges */
function getSpecialtyColor(label: string): string {
  switch (label) {
    case "HazMat": return "#d97706";
    case "Water Rescue": return "#2563eb";
    case "ARFF": return "#7c3aed";
    case "Wildland VI":
    case "Wildland III": return "#16a34a";
    case "Bn HQ": return "#dc2626";
    case "Reserve": return "#6b7280";
    case "Repair": return "#6b7280";
    case "Rescue": return "#0891b2";
    default: return "#6b7280";
  }
}

/** Info for truck company markers */
function getTruckLabel(station: Station): { truck: string; crew: number; isALS: boolean } | null {
  const tc = truckCompanies.find((t) => t.station === station.num);
  if (!tc) return null;
  return { truck: tc.truck, crew: tc.crew, isALS: tc.medical === "ALS" };
}

function streetViewUrl(station: Station, width = 400, height = 200) {
  if (!GOOGLE_MAPS_KEY) return "";
  const addr = encodeURIComponent(`${station.addr}, Oakland CA ${station.zip}`);
  return `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${addr}&key=${GOOGLE_MAPS_KEY}`;
}

function StationCard({
  station,
  onClose,
}: {
  station: Station;
  onClose: () => void;
}) {
  const bn = battalionInfo[station.bn];
  const imgUrl = streetViewUrl(station);
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden shadow-lg">
      {imgUrl && (
        <div className="relative h-36 bg-bg-subtle">
          <img
            src={imgUrl}
            alt={`Station ${station.num} exterior`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-white text-xs"
              style={{ backgroundColor: bn.color }}
            >
              {station.num}
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white leading-tight drop-shadow-sm">
                Station {station.num}
              </h3>
              <p className="text-[10px] text-white/80 drop-shadow-sm">{bn.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors p-1 bg-black/20 rounded-md"
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
      )}
      {!imgUrl && (
        <div className="flex items-start justify-between p-5 pb-3">
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
      )}

      <div className="space-y-3 text-sm p-5 pt-3">
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
            Address
          </div>
          <div className="text-primary font-medium">
            {station.addr}, Oakland CA {station.zip}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="px-2 py-0.5 rounded-md text-xs font-bold text-white"
            style={{ backgroundColor: battalionInfo[station.bn].color }}
          >
            Bn {station.bn}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-xs font-bold text-white ${
            station.type === "Double" ? "bg-violet-600" : "bg-slate-500"
          }`}>
            {station.type} House
          </span>
          {station.engines.map((e) => (
            <span
              key={e}
              className="px-2 py-0.5 rounded-md text-xs font-bold text-white bg-emerald-600"
            >
              {e}
            </span>
          ))}
          {station.trucks.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-xs font-bold text-white bg-sky-600"
            >
              {t}
            </span>
          ))}
        </div>

        {(() => {
          const tc = getTruckLabel(station);
          if (!tc) return null;
          return (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs font-medium text-muted uppercase tracking-wider">
                Truck Co.
              </div>
              <span className="px-2 py-0.5 rounded-md bg-accent text-white text-xs font-bold">
                {tc.truck}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-bold text-white ${
                tc.crew === 5 ? "bg-blue-600" : "bg-gray-500"
              }`}>
                {tc.crew}-person crew
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-bold text-white ${
                tc.isALS ? "bg-red-600" : "bg-gray-400"
              }`}>
                {tc.isALS ? "ALS" : "BLS"}
              </span>
            </div>
          );
        })()}

        {station.rescue.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
              Rescue / Watercraft
            </div>
            <div className="flex flex-wrap gap-1.5">
              {station.rescue.map((r) => (
                <span
                  key={r}
                  className="px-2 py-0.5 rounded-md bg-blue text-white text-xs font-bold"
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
                  className="px-2 py-0.5 rounded-md bg-amber text-white text-xs font-bold"
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
  showSpecialty,
  showTrucks,
}: {
  station: Station;
  isSelected: boolean;
  onClick: () => void;
  showSpecialty?: boolean;
  showTrucks?: boolean;
}) {
  const bn = battalionInfo[station.bn];
  const specLabel = showSpecialty ? getSpecialtyLabel(station) : "";
  const specColor = specLabel ? getSpecialtyColor(specLabel) : "";
  const tc = showTrucks ? getTruckLabel(station) : null;
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
        <div className="min-w-0 flex-1">
          <div className="font-heading font-bold text-sm text-primary truncate">
            {tc ? `${tc.truck} — Station ${station.num}` : `Station ${station.num}`}
          </div>
          <div className="text-xs text-muted truncate">{station.addr}</div>
        </div>
        <div className="ml-auto flex flex-wrap gap-1 shrink-0 items-center">
          {specLabel ? (
            <span
              className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
              style={{ backgroundColor: specColor }}
            >
              {specLabel}
            </span>
          ) : tc ? (
            <div className="flex gap-1 items-center">
              <span
                className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${
                  tc.crew === 5 ? "bg-blue-700" : "bg-gray-500"
                }`}
              >
                {tc.crew}
              </span>
              <span
                className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${
                  tc.isALS ? "bg-red-600" : "bg-gray-400"
                }`}
              >
                {tc.isALS ? "ALS" : "BLS"}
              </span>
            </div>
          ) : (
            <>
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
            </>
          )}
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
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [mapStyle, setMapStyle] = useState<string>("streets");

  // Mobile bottom sheet state
  const [sheetHeight, setSheetHeight] = useState<number | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const isDragging = useRef(false);

  // Initialize sheet height on mount (mobile only)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) {
      const available = window.innerHeight - 56; // 3.5rem header
      setSheetHeight(available * SNAP_COLLAPSED);
    }
    const handler = (e: MediaQueryListEvent) => {
      setSheetHeight(e.matches ? null : (window.innerHeight - 56) * SNAP_COLLAPSED);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const snapTo = useCallback((fraction: number) => {
    const available = window.innerHeight - 56;
    setIsSnapping(true);
    setSheetHeight(available * fraction);
    setTimeout(() => setIsSnapping(false), 250);
  }, []);

  const nearestSnap = useCallback((h: number) => {
    const available = window.innerHeight - 56;
    const frac = h / available;
    const snaps = [SNAP_COLLAPSED, SNAP_HALF, SNAP_EXPANDED];
    let closest = snaps[0];
    let minDist = Math.abs(frac - snaps[0]);
    for (const s of snaps) {
      const d = Math.abs(frac - s);
      if (d < minDist) { minDist = d; closest = s; }
    }
    return closest;
  }, []);

  const onDragStart = useCallback((clientY: number) => {
    isDragging.current = true;
    dragStartY.current = clientY;
    dragStartHeight.current = sheetHeight ?? 0;
  }, [sheetHeight]);

  const onDragMove = useCallback((clientY: number) => {
    if (!isDragging.current) return;
    const available = window.innerHeight - 56;
    const delta = dragStartY.current - clientY; // dragging up = positive
    const newH = Math.max(
      available * SNAP_COLLAPSED * 0.8,
      Math.min(available * SNAP_EXPANDED, dragStartHeight.current + delta)
    );
    setSheetHeight(newH);
  }, []);

  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const h = sheetHeight ?? 0;
    snapTo(nearestSnap(h));
  }, [sheetHeight, snapTo, nearestSnap]);

  const filteredStations = useMemo(
    () => getFilteredStations(filterMode),
    [filterMode]
  );

  const changeStyle = useCallback((styleId: string) => {
    setMapStyle(styleId);
    const style = MAP_STYLES.find((s) => s.id === styleId);
    if (!style || !map.current) return;
    map.current.setStyle(style.url);
  }, []);

  const fitToStations = useCallback((stns: Station[]) => {
    if (!map.current || stns.length === 0) return;
    if (stns.length === 1) {
      map.current.flyTo({
        center: [stns[0].lng, stns[0].lat],
        zoom: 14,
        duration: 800,
      });
      return;
    }
    const bounds = new mapboxgl.LngLatBounds();
    stns.forEach((s) => bounds.extend([s.lng, s.lat]));
    map.current.fitBounds(bounds, { padding: 80, duration: 800 });
  }, []);

  const resetView = useCallback(() => {
    setFilterMode("all");
    setSelected(null);
    map.current?.flyTo({
      center: OAKLAND_CENTER,
      zoom: INITIAL_ZOOM,
      duration: 600,
    });
  }, []);

  const applyFilter = useCallback(
    (mode: FilterMode) => {
      setFilterMode(mode);
      setSelected(null);
      if (mode === "all") {
        map.current?.flyTo({
          center: OAKLAND_CENTER,
          zoom: INITIAL_ZOOM,
          duration: 600,
        });
      } else {
        fitToStations(getFilteredStations(mode));
      }
    },
    [fitToStations]
  );

  const selectStation = useCallback((station: Station | null) => {
    setSelected(station);
    if (station) {
      events.stationViewed(station.num);
      map.current?.flyTo({
        center: [station.lng, station.lat],
        zoom: 14,
        duration: 800,
      });
      // Auto-expand sheet on mobile so detail card is visible
      if (sheetHeight != null) {
        const available = window.innerHeight - 56;
        if (sheetHeight < available * SNAP_HALF) {
          snapTo(SNAP_HALF);
        }
      }
    }
  }, [sheetHeight, snapTo]);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;
    if (map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
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

  const addMarkers = useCallback(() => {
    if (!map.current) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const stationsToShow = getFilteredStations(filterMode);

    const showSpecialty = filterMode === "specialty" || filterMode === "wildland";
    const showTrucks = filterMode === "trucks";

    stationsToShow.forEach((station) => {
      const bn = battalionInfo[station.bn];

      const el = document.createElement("div");
      el.className = "station-marker";

      if (showSpecialty) {
        // Specialty label marker
        const label = getSpecialtyLabel(station);
        const labelColor = label ? getSpecialtyColor(label) : "";
        el.style.cssText = `
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        `;
        const numBadge = document.createElement("div");
        numBadge.style.cssText = `
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: ${bn.color};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading), system-ui;
          font-weight: 700;
          font-size: 10px;
          flex-shrink: 0;
        `;
        numBadge.textContent = String(station.num);

        const labelBadge = document.createElement("div");
        labelBadge.style.cssText = `
          background: ${labelColor};
          color: white;
          padding: 3px 7px;
          border-radius: 6px;
          font-family: var(--font-heading), system-ui;
          font-weight: 700;
          font-size: 9px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        `;
        labelBadge.textContent = label;

        el.appendChild(numBadge);
        if (label) el.appendChild(labelBadge);
      } else if (showTrucks) {
        // Truck company marker — single pill: "Stn 1 · T1 · 5-crew" with ALS highlight
        const tc = getTruckLabel(station);
        const isALS = tc?.isALS ?? false;

        el.style.cssText = `
          display: flex;
          align-items: center;
          cursor: pointer;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          background: ${isALS ? "#dc2626" : bn.color};
          border-radius: 8px;
          overflow: hidden;
          font-family: var(--font-heading), system-ui;
        `;

        // Station number segment
        const stnSeg = document.createElement("div");
        stnSeg.style.cssText = `
          background: rgba(0,0,0,0.2);
          color: white;
          padding: 5px 7px;
          font-weight: 700;
          font-size: 10px;
          white-space: nowrap;
        `;
        stnSeg.textContent = String(station.num);

        // Info segment: "T1 · 5-crew" or "T6 · 4-crew · ALS"
        const infoSeg = document.createElement("div");
        infoSeg.style.cssText = `
          color: white;
          padding: 5px 8px 5px 6px;
          font-weight: 700;
          font-size: 10px;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 4px;
        `;
        if (tc) {
          const parts = [`${tc.truck}`, `${tc.crew}-crew`];
          if (isALS) parts.push("ALS");
          infoSeg.textContent = parts.join(" · ");
        } else {
          infoSeg.textContent = station.trucks.join(", ") || "—";
        }

        el.appendChild(stnSeg);
        el.appendChild(infoSeg);
      } else {
        // Standard number-only marker
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
        `;
        el.textContent = String(station.num);
      }

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([station.lng, station.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => selectStation(station));
      markersRef.current.push(marker);
    });
  }, [filterMode, selectStation]);

  // Re-add markers when filter changes
  useEffect(() => {
    addMarkers();
  }, [addMarkers]);

  // Re-add markers after style switch
  useEffect(() => {
    if (!map.current) return;
    const handler = () => addMarkers();
    map.current.on("style.load", handler);
    return () => {
      map.current?.off("style.load", handler);
    };
  }, [addMarkers]);

  const panelContent = (
    <>
      <div className="p-4 border-b border-border-light flex items-center justify-between shrink-0">
        <h1 className="heading text-2xl text-primary">Stations</h1>
        <span className="text-xs text-muted font-mono">
          {filteredStations.length} of {stations.length}
        </span>
      </div>
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
                showSpecialty={filterMode === "specialty" || filterMode === "wildland"}
                showTrucks={filterMode === "trucks"}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="relative lg:flex lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* Desktop sidebar — unchanged */}
      <div className="hidden lg:flex w-80 border-r border-border-light bg-bg flex-col overflow-hidden">
        {panelContent}
      </div>

      {/* Map — full height, desktop gets flex-1 */}
      <div className="h-full lg:flex-1 lg:h-auto relative">
        {!MAPBOX_TOKEN ? (
          <div className="h-full flex items-center justify-center bg-bg-warm">
            <div className="text-center p-8">
              <p className="font-heading font-bold text-lg text-primary mb-2">
                Map requires Mapbox token
              </p>
              <p className="text-sm text-secondary">
                Set NEXT_PUBLIC_MAPBOX_TOKEN in your .env.local file.
              </p>
            </div>
          </div>
        ) : null}
        <div ref={mapContainer} className="w-full h-full" />

        {/* Filter chips — top left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[calc(100%-80px)]">
          {FILTERS.map((f) => {
            const active = filterMode === f.id;
            return (
              <button
                key={f.id}
                onClick={() => applyFilter(f.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm border transition-colors ${
                  active
                    ? "text-white border-transparent"
                    : "bg-white/90 backdrop-blur-sm text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300"
                }`}
                style={
                  active
                    ? { backgroundColor: f.color || "#1a1714" }
                    : undefined
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Reset view button — below zoom controls */}
        <div className="absolute top-[100px] right-[10px] flex flex-col gap-1.5">
          <button
            onClick={resetView}
            className="w-[29px] h-[29px] bg-white rounded-md border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            title="Reset view"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
              />
            </svg>
          </button>
        </div>

        {/* Map style switcher — bottom left, raised above sheet on mobile */}
        <div
          className="absolute left-3 flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-1 shadow-md"
          style={{
            bottom: sheetHeight != null ? sheetHeight + 12 : 16,
            transition: isSnapping ? "bottom 200ms ease-out" : "none",
          }}
        >
          {MAP_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => changeStyle(s.id)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mapStyle === s.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {sheetHeight != null && (
        <div
          ref={sheetRef}
          className="lg:hidden absolute bottom-0 left-0 right-0 bg-bg rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden z-20 pb-[env(safe-area-inset-bottom)]"
          style={{
            height: sheetHeight,
            transition: isSnapping ? "height 200ms ease-out" : "none",
          }}
        >
          {/* Drag handle */}
          <div
            className="flex items-center justify-center py-2.5 cursor-grab active:cursor-grabbing shrink-0 touch-none"
            onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
            onTouchEnd={onDragEnd}
            onMouseDown={(e) => {
              onDragStart(e.clientY);
              const moveHandler = (ev: MouseEvent) => onDragMove(ev.clientY);
              const upHandler = () => {
                onDragEnd();
                window.removeEventListener("mousemove", moveHandler);
                window.removeEventListener("mouseup", upHandler);
              };
              window.addEventListener("mousemove", moveHandler);
              window.addEventListener("mouseup", upHandler);
            }}
          >
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>
          {panelContent}
        </div>
      )}
    </div>
  );
}
