export const ladderTypes = [
  "Extension",
  "Straight",
  "Attic (Collapsible/Folding)",
  "Combination",
  "Scaler / Roof",
];

export const ladderSizes = [
  { size: "40' extension", location: "Truck" },
  { size: "35' extension", location: "Truck" },
  { size: "30' extension (Fiber)*", location: "Engine" },
  { size: "28' extension", location: "Truck" },
  { size: "24' straight", location: "Truck" },
  { size: "24' extension (Fiber)*", location: "Engine" },
  { size: "22' straight", location: "Truck" },
  { size: "20' scaler", location: "Truck" },
  { size: "16' scaler", location: "Truck" },
  { size: '14" straight (Aluminum)*', location: "Engine" },
  { size: "12' scaler", location: "Truck" },
  { size: "12' combination", location: "Truck" },
  { size: "10' or 12' folding attic", location: "Both" },
];

export const ladderFacts = [
  "OFD uses 100ft Aerial ladders.",
  "Older Engines use Fiberglass Ladders on top-mounted ladder rack.",
  "Newer Engines use Aluminum ladders in rear compartment.",
  "Truck 5 carries a 14' Baby Bangor.",
  "Beams of ground ladders are made of Douglas Fir.",
  "Rungs of ground ladders are made of Hickory.",
  "Tip: Top 20 inches of wooden ladder, painted white.",
  "Foot: Bottom 20 inches of wooden ladder, painted black.",
  "Training ladders are painted orange/pink at both ends — not to be climbed.",
  "Ideal climbing angle: 70° (1/5 length of ladder plus 2).",
];

export const truckToolColors: Record<string, string> = {
  "Truck 1": "GREEN",
  "Truck 2": "YELLOW",
  "Truck 3": "BLACK AND WHITE",
  "Truck 4": "BLUE",
  "Truck 5": "TAN",
  "Truck 6": "GREY",
  "Truck 7": "RED",
};

export const truckCrewSizes = {
  fiveMembers: ["T1", "T2", "T4"],
  fourMembers: ["T3", "T5", "T6", "T7"],
};

export const truckTypes = ["American LaFrance", "Pierce"];

export const ladderTerminology: Record<string, string> = {
  Aerial:
    'An aerial truck where the aerial ladder is mounted on a trailer pulled by a tractor joined by a "fifth wheel." The trailer section is steered by a tiller wheel.',
  Beam: "The solid or trussed main structural side member of a ladder supporting the rungs.",
  "Beam Raise":
    "A method of throwing a ladder by resting it on one beam and raising it sideways.",
  "Bed Section":
    "The lower section of an extension ladder into which the upper sections retract.",
  Bridging:
    "Using a fire ladder to span a gap between structures.",
  "Climbing Angle":
    "70° ideal angle (1/5 length of ladder plus 2).",
  "Collapsible Ladder":
    "Ladder with rungs that collapse, making beams fold together. Also called a folding or attic ladder.",
  "Extension Ladder":
    "A ladder consisting of two or more sections that can be nested for ease of handling and extend to provide needed height.",
  "Flat Raise":
    "A common method of raising a ladder where one or more persons secure the foot and others lift the other end and walk toward the heel.",
  Fly: "The upper sections of an extension or aerial ladder.",
  Foot: "The base of the ladder.",
  "Footing the Ladder":
    "A method used to secure ground ladders for raising, lowering, or climbing.",
  "Ground Ladder":
    "Portable ladder, usually 10 to 40 feet in length.",
  Guides:
    "Strips of wood or metal that guide a fly section while it is being extended.",
  Halyard:
    "A rope or cable used to elevate the fly sections of an extension ladder.",
  Hardware:
    "Bolts on either side of truss block, runs through truss, truss block and beam.",
  Head: "Top of the ladder.",
  Hooks:
    "Swivel hooks mounted on the beams at the tops of roof ladders for hooking over peaks of gabled roofs or window sills.",
  "Ladder Bed":
    "A rack installed on ladder trucks for carrying ladders.",
  "Ladder Lock":
    "A locking device for securing ladders in a bedded position for travel.",
  "Ladder Pipe":
    "A master stream nozzle pre-plumbed under the rungs of the aerial ladder.",
  "Leg Lock":
    "A method of securing oneself to a ladder by placing one leg between rungs and hooking the foot around the beam to free both hands.",
  "Lift Ladder":
    "Method used to get the ladder from the ground to shoulder level.",
  "Lower Ladder":
    "Method used to get the ladder from vertical to horizontal.",
  "Pawls (Dogs)":
    "A part of the locking mechanism that secures the fly section to a rung of the bed section.",
  "Pivot Ladder":
    "Method used to turn ladder while in the vertical position by footing one beam and rotating the non-footed beam.",
  Pulley:
    "A small grooved wheel for guiding the halyard to raise and lower the fly.",
};

export const ladderCommands = [
  "PREPARE TO BEAM.... BEAM! (Lifting from ground)",
  "PREPARE TO SHOULDER.... SHOULDER!",
  "PREPARE TO FENDER.... FENDER! (Side mounted)",
  "PREPARE TO FORWARD.... FORWARD!",
  "LADDER COMING THROUGH",
  "CHECKING FOR WIRES OR OVERHEAD OBSTRUCTIONS",
  "PREPARE TO STOP... STOP! (Command by foot when desired position reached, raised fist)",
  "PREPARE TO REVERSE... REVERSE!",
  "PREPARE TO LOWER, LOWER",
  "FINGERS AND TOES ALL CLEAR... EXTENDING THE FLY!",
  "FINGERS AND TOES ALL CLEAR... RETRACTING THE FLY!",
  "LOCK DOGS!... DOGS ARE LOCKED!",
  "LADDER INTO THE BUILDING! / LADDER AWAY FROM THE BUILDING!",
  "PIVOT THE LADDER ON THIS BEAM, THIS BEAM TOWARDS YOU/ME... PIVOT!",
  "SECURE THE HALYARD",
  "LADDER COMING DOWN THIS WAY, CHECKING FOR OVERHEAD WIRES AND OBSTRUCTIONS. ALL CLEAR",
  "PREPARE TO BED LADDER, BED LADDER",
  "LADDER COMING OUT (Ladder Nest)",
  "LADDER LOCKED / LADDER UNLOCKED",
  "GIVE ME LADDER... TAKE SOME LADDER... I GOT THE WEIGHT... TAKE SOME WEIGHT",
  "I GOT YOUR FOOT, THIS BEAM (Tap beam being footed)",
  "HALFWAY (Lets head know they are halfway)",
  "3-2-1 STEP OUT (Near end of ladder while lowering)",
  "FOOTING LADDER / ON LADDER / STEPPING OFF / OFF LADDER",
  "SOUNDING ROOF",
  "LOCKING IN — LOCKED IN / UNLOCKING — UNLOCKED",
  "TYING OFF / LADDER TIED OFF",
  "DOGS LOCKED",
  "3-2-1 GROUND (Person descending ladder)",
  "3-2-1 CONTACT (Ladder lowered into building)",
  "PREPARE TO FLAT — FLAT / PREPARE TO BEAM — BEAM",
];
