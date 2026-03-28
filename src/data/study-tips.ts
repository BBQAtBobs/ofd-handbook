/**
 * Memory tips for study flashcards.
 *
 * Keyed by question ID. Only questions with a tip here will show one.
 * Keep tips concise, genuinely useful, and non-gimmicky.
 */
export const studyTips: Record<string, string> = {
  // ─── Stations: Addresses (confusable or hard to recall) ──────────

  "stations-addr-20":
    "Two stations on 98th Ave: Stn 20 is 1401 (lower number, lower address) and Stn 26 is 2611.",
  "stations-addr-26":
    "Two stations on 98th Ave: Stn 26 is 2611 (higher number, higher address) and Stn 20 is 1401.",
  "stations-addr-1":
    "Station 1 is on MLK — the department's first station sits on one of Oakland's main corridors.",
  "stations-addr-22":
    "Station 22 has the simplest address in OFD: 1 Airport Dr. Airport station, airport address.",
  "stations-addr-21":
    "Station 21 is the highest elevation: 13150 Skyline Blvd — the address number is the biggest in OFD.",
  "stations-addr-15":
    "Stations 8 and 15 both have addresses in the 400s on numbered streets (463 51st St vs 455 27th St).",
  "stations-addr-8":
    "Stations 8 and 15 both have addresses in the 400s on numbered streets (463 51st St vs 455 27th St).",

  // ─── Stations: Battalions (area patterns) ────────────────────────

  "stations-bn-1":
    "Bn 2 covers downtown and north Oakland — stations 1, 2, 3, 5, 7, 10, 12, 15.",
  "stations-bn-18":
    "Bn 3 covers deep East Oakland and the southern hills — stations 18, 20–29.",
  "stations-bn-4":
    "Bn 4 covers central-east Oakland and the northern hills — stations 4, 6, 8, 13, 16, 17, 19, 24, 25.",
  "stations-bn-22":
    "Station 22 is at the airport but belongs to Bn 3, not Bn 4 — the airport is in deep East Oakland.",
  "stations-bn-7":
    "Station 7 is in the Berkeley hills (Amito Ave) but belongs to Bn 2, not Bn 4.",

  // ─── Stations: Double houses (chunking) ──────────────────────────

  "stations-double-1":
    "The 7 double houses: 1, 3, 4, 8, 15, 18, 20. Three in Bn 2 (1, 3, 15), two in Bn 4 (4, 8), two in Bn 3 (18, 20).",
  "stations-double-3":
    "The 7 double houses: 1, 3, 4, 8, 15, 18, 20. Three in Bn 2 (1, 3, 15), two in Bn 4 (4, 8), two in Bn 3 (18, 20).",

  // ─── Stations: Specials ──────────────────────────────────────────

  "stations-special-2":
    "Water Rescue is at Station 2 — Clay St, near Jack London Square and the waterfront.",
  "stations-special-3":
    "HazMat is at Station 3 — the biggest specialty assignment is at one of the lowest station numbers.",
  "stations-special-29":
    "ARFF at Station 29 — the highest-numbered active station handles airport rescue.",

  // ─── Trucks: ALS/BLS (pattern) ──────────────────────────────────

  "trucks-als-composite":
    "Only two ALS trucks: T4 and T6. Both even-numbered, both at double houses (Stn 15 and Stn 18).",
  "trucks-medical-t4":
    "T4 and T6 are the only ALS trucks. T4 is at Station 15 (Bn 2), T6 is at Station 18 (Bn 3).",
  "trucks-medical-t6":
    "T4 and T6 are the only ALS trucks. T6 is at Station 18 (Bn 3 HQ), T4 is at Station 15 (Bn 2).",

  // ─── Trucks: Crew sizes (pattern) ───────────────────────────────

  "trucks-five-member":
    "The 5-member trucks are T1, T2, T4 — the first two trucks plus the first ALS truck.",
  "trucks-crew-t3":
    "T3 through T7 are all 4-member except T4 (5-member, ALS). T1 and T2 are both 5-member.",

  // ─── Trucks: Tool colors (associations) ─────────────────────────

  "trucks-color-t1":
    "T1 = Green. Station 1 is HQ — green means go, first in line.",
  "trucks-color-t3":
    "T3 = Black and White. Station 3 is HazMat — the distinctive two-tone stands out.",
  "trucks-color-t7":
    "T7 = Red. The last truck gets the most fire-engine color.",

  // ─── Trucks: Station assignments ────────────────────────────────

  "trucks-station-t1":
    "T1 at Station 1, T2 at Station 4, T3 at Station 3 — T1 and T3 match their station numbers, T2 doesn't.",
  "trucks-station-t2":
    "T2 is at Station 4, not Station 2. T1 and T3 match their station numbers, but T2 breaks the pattern.",
};
