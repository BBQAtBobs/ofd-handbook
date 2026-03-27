import { truckCompanies, doubleHouses } from "@/data/stations";

export function TruckCompaniesCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-light p-5 sm:p-6">
      <h2 className="font-heading font-bold text-lg text-primary mb-1">
        Truck Companies
      </h2>
      <p className="text-xs text-muted mb-4">
        Crew size, medical level, and truck type
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light">
              <th className="text-left py-2 pr-3 text-xs font-medium text-muted uppercase tracking-wider">
                Truck
              </th>
              <th className="text-left py-2 pr-3 text-xs font-medium text-muted uppercase tracking-wider">
                Station
              </th>
              <th className="text-left py-2 pr-3 text-xs font-medium text-muted uppercase tracking-wider">
                Crew
              </th>
              <th className="text-left py-2 pr-3 text-xs font-medium text-muted uppercase tracking-wider">
                Medical
              </th>
              <th className="text-left py-2 text-xs font-medium text-muted uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {truckCompanies.map((tc) => (
              <tr
                key={tc.truck}
                className="border-b border-border-light/50"
              >
                <td className="py-2.5 pr-3 font-mono font-semibold text-accent">
                  {tc.truck}
                </td>
                <td className="py-2.5 pr-3 text-primary">
                  Stn {tc.station}
                </td>
                <td className="py-2.5 pr-3 text-primary">{tc.crew}</td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      tc.medical === "ALS"
                        ? "bg-accent-soft text-accent"
                        : "bg-bg-subtle text-secondary"
                    }`}
                  >
                    {tc.medical}
                  </span>
                </td>
                <td className="py-2.5 text-secondary text-xs">
                  {tc.truckType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4 border-t border-border-light">
        <h3 className="font-heading font-bold text-base text-primary mb-3">
          Double Houses
        </h3>
        <div className="space-y-2">
          {doubleHouses.map((dh) => (
            <div
              key={dh.station}
              className="flex items-center gap-3 py-2 px-3 rounded-lg bg-bg-subtle"
            >
              <span className="font-heading font-bold text-sm text-primary w-16 shrink-0">
                Stn {dh.station}
              </span>
              <span className="text-xs text-secondary flex-1">
                {dh.addr}
              </span>
              <div className="flex gap-1.5">
                {dh.engines.map((e) => (
                  <span
                    key={e}
                    className="text-[10px] font-mono font-semibold text-secondary bg-bg-warm px-1.5 py-0.5 rounded"
                  >
                    {e}
                  </span>
                ))}
                {dh.trucks.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono font-semibold text-accent bg-accent-soft px-1.5 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
