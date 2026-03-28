import Nav from "@/components/Nav";
import StationMapLoader from "@/components/StationMapLoader";

export const metadata = {
  title: "Stations — OFD Handbook",
  description:
    "All 26 Oakland Fire Department stations with addresses, apparatus, battalion assignments, and interactive map.",
};

export default function StationsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <StationMapLoader />
      </main>
    </>
  );
}
