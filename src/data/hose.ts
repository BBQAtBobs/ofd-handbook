export const preconnects = [
  {
    name: "Bumper",
    length: '100\' of 1 3/4"',
    nozzle: "150 GPM @ 50 PSI fog nozzle",
  },
  {
    name: "Cross-lay #1",
    length: '150\' of 1 3/4"',
    nozzle: "150 GPM @ 50 PSI fog nozzle",
    notes:
      "2 loops after the second fold from the bed, 1 loop at last 50'",
  },
  {
    name: "Cross-lay #2",
    length: '200\' of 1 3/4"',
    nozzle: "150 GPM @ 50 PSI fog nozzle",
    notes:
      "2 loops after the second fold from the bed, 1 loop at last 50'",
  },
  {
    name: "Red Line",
    length: '200\' of 1"',
    nozzle: "50 GPM @ 200 PSI fog nozzle",
  },
];

export const rearHoseBed = {
  attackSide: [
    {
      name: "Static Load (2 1/4\")",
      description:
        '500\' of 2 1/4" hose (three wide, bottom last female coupling exposed, left side) with a 1 1/8" smoothbore nozzle or a 250 GPM @ 50 PSI fog nozzle. Last 50\' in a horseshoe load.',
      note: "Department is transitioning from 2 1/2\" to 2 1/4\". Both are in service.",
    },
    {
      name: "Combination Load",
      description:
        '200\' of 2 1/2" hose (two wide, bottom last female coupling exposed, left side) to a 2 1/4" to 1 1/2" bell reducer to 300\' of 1 3/4" hose (three wide) with a 7/8" (160 GPM) smoothbore nozzle or a 150 GPM @ 50 PSI fog nozzle. (Combination equals 500 feet) Last 50\' in a horseshoe load.',
    },
  ],
  supplySide: [
    {
      name: "3\" Supply",
      description:
        '500\' of 3" hose, male coupling pointed out. Used as a pumped supply line for FDC, Master Streams, Ground Monitors, Stand Pipe and Ladder Pipe operations. Utilize double female to attach to 4" hose for long leads.',
    },
    {
      name: "4\" Primary Supply",
      description:
        '800\' of 4" hose with Humat Valve and Mucker Strap, four wide. This 4" hose is to be used as the primary supply line and all forward lay operations will utilize it.',
    },
  ],
};

export const standpipeBundles = [
  '(3) 50\' sections of 2 1/2" hose with a 1 1/8" smoothbore nozzle, interior threaded for 5/8" tip.',
  "(1) Standpipe equipment bag: 15 wood door chocks (min), 3\" to 2 1/2\" pyrolite reducer, 60° 2 1/2\" F to M elbow, inline pressure gauge, 1 1/2\" to 2 1/2\" pyrolite increaser, 5/8\" tip. (No gated wyes)",
  '(1) 100\' bundle of 1 3/4" hose with a 7/8" smoothbore nozzle with a 2 1/2" to 1 1/2" bell reducer attached.',
];

export const hoseTerminology: Record<string, string> = {
  "Advancing a Line": "To move a hose line forward.",
  "Booster Line":
    "Also called redline. Reinforced, rubber-covered, rubber-lined hose mounted on apparatus on a reel, used for small fires.",
  "Break a Line":
    "To disconnect hose lines for any purpose; disconnect hose coupling.",
  "Charged Line":
    "A line of hose loaded with water under pressure and prepared for use.",
  Extend: "Add additional hose to a length that has already been laid.",
  "Fire Stream":
    "A stream of water from a fire nozzle used to control and combat fires.",
  Flake: "Placing hose on the ground prior to charging, done to avoid kinks when charged.",
  "Forward Lay / Straight Lay":
    "Hose laid from the hydrant or water source towards the fire.",
  Handline: "Small hose lines which can be handled and maneuvered by firefighters.",
  "Hooking Up":
    "Connecting a fire department pumper to a hydrant and to the discharge hose.",
  Jumper: "A short length of hose.",
  Kink: "A sharp bend in fire hose that restricts flow of water.",
  "Lay / Lead":
    "To lay hose in a predetermined sequence either from a hydrant towards the fire (forward lay) or from the fire to the water source (reverse lay).",
  Line: "Usually refers to a length of hose; also used in reference to a rope or life line.",
  "Master Stream":
    "A large stream too heavy for conventional manual operation. 400-1,200 gpm or more.",
  Preconnect:
    "A procedure where hose is already connected to the outlet of the pump to expedite hose operations.",
  "Reverse Lay": "Hose laid from the fire or structure to the water source.",
  "School Yard":
    "Remove hose from bed and advance towards fire until enough hose has been obtained. Proper fittings and additional attack hose are required.",
  "Stretch Hose": "To lay out hose (stretch a line).",
  "Take a Lead":
    "The leadoff firefighter dismounts engine, removes and anchors the 4-way with sufficient hose. After the engine proceeds from the hydrant to the fire, the leadoff firefighter connects the 4-way to hydrant and charges line when directed by the engineer.",
  "Wild Line":
    "A line of fire hose which is flowing water and is not under control by firefighters.",
  "Wrap the Hydrant":
    "Leave the 4-way and a reasonable amount of hose wrapped loosely around the hydrant. The next-in company makes connection and charges the line.",
};

export const hydrantCommands = [
  "WATER! (Calling for water, in conjunction with hand signal)",
  "WATER COMING! (Receiving call for water, in conjunction with hand signal)",
];

export const buzzerCommands = [
  { beeps: 1, meaning: "STOP" },
  { beeps: 2, meaning: "GO" },
  { beeps: 3, meaning: "BACK UP" },
];

export const sendingEngine = [
  "2 BEEPS",
  'VERBAL COMMAND "LAY LINE!"',
  "HAND SIGNAL",
  "All done while in line of sight with engineer in driver side mirror",
];

export const elkhartRamXD = {
  name: "ELKHART RAM-XD",
  description: "Quick deployable master stream",
  specs: {
    Lead: 'Requires single 3"',
    Flow: "500 gpm",
    Weight: "20 lbs",
    "Tip Size": '1 3/8"',
    Inlet: '2 1/2" inlet and discharge couplings',
    "Pump At": "90 psi to the appliance",
    "Friction Loss": '20 psi per 100\' of 3" / 40 psi per 100\' of 2 1/2"',
    "Stream Reach":
      '180-200\' (twice the reach and flow of a 2 1/2" handline)',
  },
  notes: [
    "With stabilizers extended the force of the nozzle reaction will hold the monitor in place.",
    "Try to ensure 20' of straight hose feeding into the RAM XD for best stream and stability.",
    "Flow is controlled with the bale like a hose-line unlike a ground monitor where flow is controlled at the pump panel.",
    "Maintains the Deck-Gun as an option during the fire.",
  ],
};
