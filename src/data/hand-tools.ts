export interface HandTool {
  name: string;
  aka?: string;
  description: string;
  category: "forcible-entry" | "cutting" | "striking" | "prying" | "plumbing" | "gripping" | "wildland" | "specialty" | "hydrant" | "general";
  image?: string;
}

export const handToolImages: Record<string, string> = {
  "Halligan Bar": "/images/tools/halligan-bar.jpg",
  "Flat-Head Axe": "/images/tools/flat-head-axe.jpg",
  "The Irons": "/images/tools/halligan-and-axe.jpg",
  "Pike Pole": "/images/tools/pike-pole.jpg",
  "Pulaski": "/images/tools/pulaski.jpg",
  "McLeod": "/images/tools/mcleod.jpg",
  "Bolt Cutters": "/images/tools/bolt-cutters.jpg",
  "Sledge Hammer": "/images/tools/sledge-hammer.jpg",
  "Battering Ram": "/images/tools/battering-ram.jpg",
  "Crowbar": "/images/tools/crowbar.jpg",
  "Hydraulic Bottle Jack": "/images/tools/hydraulic-bottle-jack.jpg",
  "Come Along Winch": "/images/tools/come-along-winch.jpg",
  "Backpump": "/images/tools/backpump.jpg",
  "Rex Tool": "/images/tools/rex-tool.jpg",
  "Duckbill Lock Breaker": "/images/tools/duckbill-lock-breaker.jpg",
  "Glas-Master": "/images/tools/glas-master.jpg",
  "Cellar Nozzle": "/images/tools/cellar-nozzle.jpg",
  "Door Spreader": "/images/tools/door-spreader.jpg",
  "Shove Knife": "/images/tools/shove-knife.jpg",
  "Rogue Hoe": "/images/tools/rogue-hoe.jpg",
  "Pick-Head Axe": "/images/tools/pick-head-axe.jpg",
  "Roof Hook": "/images/tools/roof-hook.jpg",
  "Hayward Hook": "/images/tools/hayward-hook.jpg",
  "Pipe Wrench": "/images/tools/pipe-wrench.jpg",
  "Vise Grips": "/images/tools/vise-grips.jpg",
  "Hacksaw": "/images/tools/hacksaw.jpg",
  "Pick Mall": "/images/tools/pick-mall.jpg",
  "Pry Bar": "/images/tools/pry-bar.jpg",
  "Rubbish Hook": "/images/tools/rubbish-hook.jpg",
  "Scissor Jack": "/images/tools/scissor-jack.jpg",
  "Adjustable Pliers / Channel Locks": "/images/tools/channel-locks.jpg",
  "Adjustable / Crescent Wrench": "/images/tools/crescent-wrench.jpg",
  "Sprinkler Head Wrench": "/images/tools/sprinkler-wrench.jpg",
  "Gate Valve Shut Off": "/images/tools/gate-valve-key.jpg",
  "Wildland Round Point Shovel": "/images/tools/wildland-shovel.jpg",
  "Needle Nose Plier": "/images/tools/needle-nose-plier.jpg",
  "Lineman Plier": "/images/tools/lineman-plier.jpg",
  "Diagonal Cutter": "/images/tools/diagonal-cutter.jpg",
  "Pliers": "/images/tools/pliers.jpg",
  "Flat-Head Shovel": "/images/tools/flat-head-shovel.jpg",
  "Scoop Shovel": "/images/tools/scoop-shovel.jpg",
  "Pitch Fork": "/images/tools/pitch-fork.jpg",
  "Staple Gun": "/images/tools/staple-gun.jpg",
  "Hammer Tacker": "/images/tools/hammer-tacker.jpg",
  "Floor Squeegee": "/images/tools/floor-squeegee.jpg",
  "Johnson Bar": "/images/tools/johnson-bar.jpg",
  "Ball-Peen Hammer": "/images/tools/ball-peen-hammer.jpg",
  "Claw Hammer": "/images/tools/claw-hammer.jpg",
  "Rubber Mallet": "/images/tools/rubber-mallet.jpg",
  "Utility Knife": "/images/tools/utility-knife.jpg",
  "Combination Wrench": "/images/tools/combination-wrench.jpg",
  "Sheet Metal Cutters": "/images/tools/sheet-metal-cutters.jpg",
  "Cable Cutters": "/images/tools/cable-cutters.jpg",
  "Allen Wrench": "/images/tools/allen-wrench.jpg",
  "Monkey Wrench": "/images/tools/monkey-wrench.jpg",
  "Blacksmith Hammer": "/images/tools/blacksmith-hammer.jpg",
  "Carpet Knife": "/images/tools/carpet-knife.jpg",
  "Strap Wrench": "/images/tools/strap-wrench.jpg",
  "Gad": "/images/tools/gad.jpg",
  "Fuse Puller": "/images/tools/fuse-puller.jpg",
};

export const handTools: HandTool[] = [
  {
    name: "Allen Wrench",
    aka: "Hex key, Allen key",
    description: "A tool of hexagonal cross-section used to drive bolts and screws that have hexagonal sockets in the head.",
    category: "general",
  },
  {
    name: "Backpump",
    description: "5 gallon bladder backpack with single action trombone pump. Weighs approximately 48 lbs when filled. Used in areas remote and inaccessible to engines for fire control and during mop up.",
    category: "wildland",
  },
  {
    name: "Ball-Peen Hammer",
    aka: "Ball-pein hammer, machinist's hammer",
    description: "Used for metalworking and striking.",
    category: "striking",
  },
  {
    name: "Battering Ram",
    description: "Forcible entry breaching tool. Rounded end for ramming doors. Forked end for ramming concrete/masonry.",
    category: "forcible-entry",
  },
  {
    name: "Blacksmith Hammer",
    aka: "Bricklayer's hammer",
    description: "Used for bending and forming heated metals.",
    category: "striking",
  },
  {
    name: "Bolt Cutters",
    description: "Forcible entry cutting tool. Used for cutting locks, chain links, reinforced rods, bolts, and rivets.",
    category: "cutting",
  },
  {
    name: "Buckner Fitting",
    description: "A brass fitting fastened into a roadside irrigation valve that provides a garden hose connection for a water supply.",
    category: "hydrant",
  },
  {
    name: "Cable Cutters",
    description: "Used to cut cable wires during ceiling collapse, RIT operations entanglement, electrical emergencies, and removing power from auto battery cables.",
    category: "cutting",
  },
  {
    name: "Carpet Knife",
    aka: "Skinner's knife",
    description: "Used for cutting various materials.",
    category: "cutting",
  },
  {
    name: "Cellar Nozzle",
    aka: "Distributor nozzle",
    description: "Used to extinguish inaccessible below-grade fires (basements, cellars, vaults). Ball bearing revolving action. Variable angle orifices. 600 gpm.",
    category: "specialty",
  },
  {
    name: "Adjustable Pliers / Channel Locks",
    description: "Tongue-and-groove slip-joint pliers. Used for gripping.",
    category: "gripping",
  },
  {
    name: "Claw Hammer",
    description: "Used for pounding nails into, or extracting nails from objects.",
    category: "striking",
  },
  {
    name: "Combination Wrench",
    aka: "Spanner wrench, open-end wrench, box end wrench",
    description: "A tool used to provide grip and mechanical advantage in applying torque to turn rotary fasteners such as nuts and bolts.",
    category: "general",
  },
  {
    name: "Come Along Winch",
    description: "Portable ratcheting winch or cable puller.",
    category: "prying",
  },
  {
    name: "Adjustable / Crescent Wrench",
    aka: "Open ended adjustable wrench",
    description: "Used as an adjustable wrench.",
    category: "general",
  },
  {
    name: "Crowbar",
    aka: "Wrecking bar, pry bar, jimmy bar",
    description: "A metal bar with a single curved end and flattened points, often with a small fissure on one or both ends for removing nails. Used as a lever to force apart two objects, remove nails, pry apart boards.",
    category: "prying",
  },
  {
    name: "Diagonal Cutter",
    aka: "Wire cutters, diagonal cutting pliers",
    description: "Used for cutting wire.",
    category: "cutting",
  },
  {
    name: "Door Spreader",
    description: "Forcible entry tool. A mechanical or hydraulic device used to spread the door jamb apart enough for the door to open.",
    category: "forcible-entry",
  },
  {
    name: "Duckbill Lock Breaker",
    description: "Forcible entry padlock breaking tool. Breaks the strongest padlock when placed in the shackle and struck with a maul or flat-head axe. 18\" handle keeps hands safely away from the striking zone. Bottom of handle is for gas shut-off.",
    category: "forcible-entry",
  },
  {
    name: "Flat-Head Axe",
    description: "8 lb. forcible entry tool. A working axe designed for short striking strokes on a Halligan or padlock breaker. Larger 1.5\" x 3.5\" hitting surface. Cutting edge is annealed (hardened). Head also acts as a wedge for door control and leverage.",
    category: "forcible-entry",
  },
  {
    name: "Flat-Head Shovel",
    description: "Used for overhaul and debris removal.",
    category: "general",
  },
  {
    name: "Floor Squeegee",
    description: "Used to move high volumes of water, liquid, slush, and dry material.",
    category: "general",
  },
  {
    name: "Fuse Puller",
    description: "Used for removing or replacing cartridge-type fuses.",
    category: "specialty",
  },
  {
    name: "Gad",
    description: "A short spike or chisel-like tool. Used in the fire service to break sidewalk vault lights (deadlights).",
    category: "striking",
  },
  {
    name: "Gate Valve Shut Off",
    description: "Used to shut off water at the water main and hydrant valves.",
    category: "hydrant",
  },
  {
    name: "Glas-Master",
    description: "Extrication tool. Developed to expedite removal of all vehicular glass while reducing risk of trauma to the patient. Includes window punch for side windows and spike end to penetrate windshield for saw insertion.",
    category: "specialty",
  },
  {
    name: "Hacksaw",
    description: "A fine-tooth hand saw with blade held under tension in a frame, used for cutting metal or plastic.",
    category: "cutting",
  },
  {
    name: "Halligan Bar",
    description: "A multipurpose tool for prying, twisting, punching, or striking. Consists of a claw (fork), blade (wedge/adze), and tapered pick. Used to breach locked doors, break padlocks, provide roof footholds, shut off gas meters, and vehicle extrication.",
    category: "forcible-entry",
  },
  {
    name: "Hammer Tacker",
    description: "Strikes like a hammer, automatically driving a staple with each blow. Used commonly to fasten visqueen plastic sheeting.",
    category: "general",
  },
  {
    name: "Hayward Hook",
    aka: "Claw tool",
    description: "Used for forcible entry and prying.",
    category: "prying",
  },
  {
    name: "Hydrant Scoop",
    description: "A small metal scoop attached to a long metal pole. Used to clear debris from around the underground hydrant valve so the gate valve shut-off tool can be fastened.",
    category: "hydrant",
  },
  {
    name: "Hydrant Shield",
    description: "A rounded shield used to redirect water from a sheared hydrant to the hydrant valve cover on the ground. Used when the hydrant valve is close to the hydrant.",
    category: "hydrant",
  },
  {
    name: "Hydraulic Bottle Jack",
    description: "Portable hydraulic device used to lift very heavy objects, including buildings. Operates in vertical or horizontal position. Available in various sizes.",
    category: "prying",
  },
  {
    name: "The Irons",
    description: "The Halligan bar and flat-head axe joined together (partially interlocked, head-to-toe). Also known as a married set or set of irons.",
    category: "forcible-entry",
  },
  {
    name: "Johnson Bar",
    description: "A very large lever used to move extremely heavy objects. Used in the Oakland Key System (rail transit) to move derailed street cars.",
    category: "prying",
  },
  {
    name: "Lineman Plier",
    aka: "Combination pliers",
    description: "Used for gripping, twisting, bending and cutting wire and cable. Gripping joint at nose and cutting edge in craw.",
    category: "gripping",
  },
  {
    name: "Monkey Wrench",
    aka: "Gas grips",
    description: "An adjustable wrench with smooth jaws.",
    category: "general",
  },
  {
    name: "Needle Nose Plier",
    aka: "Long-nose pliers, pinch-nose pliers, snipe nose pliers",
    description: "Used for cutting, gripping and bending wire. Long gripping nose provides excellent control and reach for work in small areas.",
    category: "gripping",
  },
  {
    name: "Pick-Head Axe",
    description: "Forcible entry tool used for chopping and battering.",
    category: "forcible-entry",
  },
  {
    name: "Pick Mall",
    description: "Used to break asphalt away from around a hydrant valve cover or manhole cover.",
    category: "striking",
  },
  {
    name: "Pike Pole",
    description: "Long metal-topped wood or fiberglass pole used for reaching, holding, or pulling. In fire service: pull down ceiling and walls, ventilation (break windows and punch holes in roof).",
    category: "prying",
  },
  {
    name: "Pitch Fork",
    description: "An agricultural tool with a long handle and long, thin, widely separated pointed tines. Used to lift and pitch loose materials such as hay or leaves.",
    category: "general",
  },
  {
    name: "Pipe Wrench",
    aka: "Stillson wrench",
    description: "An adjustable wrench used for turning soft iron pipes and fittings with a rounded surface. Jaw rocks in frame so forward pressure pulls jaws tighter. Teeth angled in direction of turn dig into soft pipe.",
    category: "plumbing",
  },
  {
    name: "Pliers",
    description: "Used to hold objects firmly, and to bend and compress a wide range of materials.",
    category: "gripping",
  },
  {
    name: "Pry Bar",
    aka: "Spud bar",
    description: "A long straight metal bar used as a hand tool to deliver blows to a target or as a lever to move heavy objects.",
    category: "prying",
  },
  {
    name: "Rex Tool",
    description: "Forcible entry lock pulling tool. U-shaped with sharp tapered blades that bite into lock cylinders of all shapes and sizes. Opposite end is a chisel for driving rim locks. 24\" long with two lock operating key tools and handle storage.",
    category: "forcible-entry",
  },
  {
    name: "Rubber Mallet",
    description: "Used when a softer blow is needed than that delivered by a metal hammer. Typically used in fire service for forcing tight-fitting parts and checking for flat tires.",
    category: "striking",
  },
  {
    name: "Rubbish Hook",
    aka: "Trash hook",
    description: "Used to find hidden fire in deep-seated smoldering fires normally found in dumps, dumpsters, or debris piles.",
    category: "prying",
  },
  {
    name: "Scissor Jack",
    description: "Portable mechanical device using a screw thread to apply very high linear forces. Used to lift heavy loads. Available in various sizes.",
    category: "prying",
  },
  {
    name: "Scoop Shovel",
    description: "Used to scoop up fairly loose dirt or material that does not need groundbreaking force.",
    category: "general",
  },
  {
    name: "Sheet Metal Cutters",
    aka: "Aviation shears, tin snips",
    description: "Used to cut sheet metal.",
    category: "cutting",
  },
  {
    name: "Shove Knife",
    description: "Forcible entry tool. The fastest, damage-free means of opening residential/office interior doors with key-in-the-knob locks. Inward doors: shove behind molding stop to retract latch. Outward doors: slip from above latch point, jiggle and pull.",
    category: "forcible-entry",
  },
  {
    name: "Sledge Hammer",
    description: "Used to apply and distribute force. Used in forcible entry as a standalone tool and in conjunction with other tools. Also used for breaching through walls, floors, and concrete.",
    category: "striking",
  },
  {
    name: "Sprinkler Head Wrench",
    description: "Used to remove and replace damaged sprinkler heads.",
    category: "specialty",
  },
  {
    name: "Staple Gun",
    description: "Easy squeeze double leverage operation drives staples. Used commonly to fasten visqueen plastic sheeting.",
    category: "general",
  },
  {
    name: "Strap Wrench",
    description: "A type of wrench that grips an object via a strap being pulled in tension around it. Used to fasten or loosen smooth surface pipes.",
    category: "plumbing",
  },
  {
    name: "Utility Knife",
    aka: "Box cutter",
    description: "Small folding or retractable-blade knife for various cutting uses.",
    category: "cutting",
  },
  {
    name: "Vise Grips",
    aka: "Locking pliers, mole grips",
    description: "Pliers that can be locked into position using an over-center action. One handle has a bolt to adjust jaw spacing, the other has a lever to unlock. Available in many configurations and sizes.",
    category: "gripping",
  },
  {
    name: "Domestic Water Shut Off",
    description: "Used to shut off water to a property at the sidewalk.",
    category: "plumbing",
  },
  {
    name: "Roof Hook",
    aka: "Z-hook",
    description: "Used to open ceilings, walls, floors, moldings and casings for rapid removal of wood, lath and plaster, tin and sheet metal, plasterboard, fiberboard and sheetrock.",
    category: "prying",
  },
  {
    name: "Pulaski",
    description: "Wildland cutting and grubbing/trenching tool. Reinvented in 1911 by Ed Pulaski, US Forest Service. Combines axe bit with adze-shaped grub hoe on a 36\" wood or fiberglass handle. Used to grub and chop duff, loosen dirt, cut through roots, and cut brush.",
    category: "wildland",
  },
  {
    name: "McLeod",
    description: "Wildland scraping and raking tool. A combination heavy-duty rake and hoe for clearing fire lines in matted litter and duff. Teeth for raking, sharpened hoe edge for cutting branches and sod. Carried with tines toward the ground, sheath over cutting edge.",
    category: "wildland",
  },
  {
    name: "Rogue Hoe",
    description: "Built from recycled agricultural disc blades. 5.5\" head, 40\" curved hickory handle. For clearing fire lines. Sharp head cuts trees up to 1\" diameter and large weeds.",
    category: "wildland",
  },
  {
    name: "Wildland Round Point Shovel",
    description: "Specifically designed for wildland firefighting. Head has highly sharpened edges. Used as a cutting, digging, and scraping tool.",
    category: "wildland",
  },
];

export const hydrantBucket = [
  "Locking cap hydrant spanner",
  "Hydrant spanner",
  "Pipe wrench",
  "5 lb. mallet",
  '"Cheater" bar',
  '2 1/2" to 4 1/2" increaser',
  '3" to 2 1/2" reducer',
  '2 1/2" double female',
  "Canvas bucket",
];

export const highriseBag = [
  "Door chocks",
  "Pocket spanners (2)",
  "Pipe Wrench (aluminum)",
  '2 1/2" nozzle with 1 1/8" smooth bore tip',
  '2 1/2" elbow',
  '2 1/2" pressure gauge',
  '1 1/2" to 2 1/2" increaser',
  '2 1/2" to 3" increaser',
  '3" to 2 1/2" reducer',
  "Canvas bag",
];

export const sprinklerBox = [
  "Various sprinkler heads",
  "Sprinkler wrench",
  "Sprinkler tongs",
  "Wood plugs (various shapes and sizes)",
  "Crescent wrench",
];

export const wildlandFittingBag = [
  '1 1/2" nozzle',
  '1" nozzle',
  "T's",
  "Wildland hose clamp",
  '3/4" garden hose',
  '1 1/2" Y',
  "Various fittings",
];

export const tags = [
  {
    color: "Green",
    name: "Occupant Notification",
    description:
      "Tag is left when the occupants are not present and OFD has been on scene. Ex: forced entry, utilities shut off, damage to property.",
  },
  {
    color: "Red",
    name: "Gas or Electrical Shut Off Notification",
    description:
      "Tag is placed on the gas main or electrical panel when OFD performs the shut off.",
  },
];

export const toolCategories = {
  "forcible-entry": "Forcible Entry",
  cutting: "Cutting",
  striking: "Striking",
  prying: "Prying & Leverage",
  plumbing: "Plumbing & Water",
  gripping: "Gripping",
  wildland: "Wildland",
  specialty: "Specialty",
  hydrant: "Hydrant",
  general: "General",
};
