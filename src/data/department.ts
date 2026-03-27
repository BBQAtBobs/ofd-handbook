export const history = {
  founded: "March 13, 1869",
  firstHouse: "Phoenix Engine Company No.1, Fifth and Washington Streets",
  milestones: [
    { year: 1908, event: "Purchased first car (Chief's vehicle)" },
    { year: 1920, event: "Complete change from horse-drawn to motor vehicles" },
    {
      year: 1920,
      event:
        "One of the first departments in the nation to hire African American firefighters",
    },
    { year: 1955, event: "Desegregated" },
    { year: 1972, event: "Hired first Asian American firefighter" },
    { year: 1980, event: "Hired first woman firefighter" },
    { year: 1982, event: "Caldecott Tunnel Fire" },
    { year: 1989, event: "Loma Prieta Earthquake" },
    { year: 1991, event: "Oakland Hills Tunnel Fire" },
  ],
  source: '"Oakland Fire Department" by BC Geoffrey Hunter (retired)',
};

export const missionStatements = {
  city: "The City of Oakland is committed to the delivery of effective, courteous, and responsive services. Citizens and employees are treated with fairness, dignity and respect. Civic and employee pride are accomplished through constant pursuit of excellence by a work force that values and reflects the diversity of the Oakland community.",
  department:
    "The proud members of the Oakland Fire Department are committed to providing the highest quality and highest level of courteous and responsive services to the residents, businesses, and visitors of Oakland. This is accomplished by implementing comprehensive strategies and training in fire prevention, fire suppression, emergency medical services, and all risk mitigation, including: human-caused and natural disasters, emergency preparedness, 9-1-1 services and community-based fire services.",
};

export const chainOfCommand = [
  "Fire Chief",
  "DC Support Services",
  "Director of Training",
  "Academy Director",
  "Cadre Member",
  "Squad Leader",
  "Recruit Firefighter",
];

export const behavioralGuidelines = [
  "When someone else is talking — you don't.",
  "Pay close attention at all times.",
  "Ask questions if you do not understand.",
  "Take every opportunity to help one another develop into a team.",
  "Tardiness or unexplained absenteeism will not be tolerated, period.",
  "Arrive for duty prepared everyday — early.",
  "Show aggressiveness in all manipulative work.",
  "Have a regard for safety at all times.",
  "Do not use excessive profanity.",
  "If it doesn't move, clean it. If it's open, close it. If it's out of place, put it back.",
  "If one of your team is having difficulties, take the initiative to help them.",
  "Demonstrate respect for others at all times.",
  "Take responsibility for deficiencies and mistakes and learn from them.",
  "Be humble and respectful at all times, display confidence and competence.",
  "Hustle, Hustle, Hustle — Move with a Purpose.",
  "If you don't know, say so and find out.",
  "If you mess up, own it.",
  "Tell the truth, Take responsibility for your actions, Do the right thing!",
];

export const insignia = {
  description:
    'In the early days of North American fire departments, orders were given to the troops by officers using a large brass device resembling a megaphone, called "bugles" or speaking trumpets. The person with the bugle hanging from their neck or shoulder was easily identified as the person in charge. Officers became identified with these objects so a small pin in the shape of a bugle became a type of rank insignia. The more "bugles on one\'s collar" the higher the rank.',
  ranks: [
    { rank: "Lieutenant", bugles: 1 },
    { rank: "Captain", bugles: 2 },
    { rank: "Battalion Chief", bugles: 3 },
    { rank: "Assistant Chief", bugles: 4 },
    { rank: "Deputy Chief", bugles: 4 },
    { rank: "Fire Chief", bugles: 5 },
  ],
};

export const phoneNumbers = {
  department: [
    { name: "Administration", number: "510-238-3856" },
    { name: "Apparatus Shop", number: "510-238-5646" },
    { name: "Dispatch", number: "510-238-4030" },
    { name: "Fire Prevention", number: "510-238-3851" },
    { name: "Fire Station", number: "510-238-40##" },
    { name: "Medical Services", number: "510-238-6957" },
    { name: "Oakland Emergency Services", number: "510-238-3938" },
    { name: "Public Education (Karen Cox)", number: "510-238-7255" },
    { name: "Services", number: "510-238-4046" },
    { name: "Training", number: "510-238-4040" },
    { name: "US&R Task Force 4", number: "510-615-5872" },
  ],
  alamedaCounty: [
    { name: "Social Services General Info", number: "888-999-4772" },
    { name: "Child Abuse Hotline (CPS)", number: "510-259-1800" },
    { name: "Adult Protective Services", number: "510-577-3500" },
    { name: "A Safe Place, Oakland", number: "510-536-7233" },
    { name: "Bay Area Women Against Rape (24hr)", number: "510-845-7273" },
    { name: "Drug & Alcohol Treatment Access (24hr)", number: "800-491-9099" },
  ],
};

export const transportation = {
  freeways: ["I-580", "I-880", "I-980", "I-80", "Hwy 13", "Hwy 24"],
  tunnels: [
    "Posey Tube",
    "Caldecott Tunnel",
    "Transbay Tube (BART)",
    "Oakland Berkeley Hills Tunnel",
    "Webster Street Tube",
  ],
  bridges: [
    "Park Street Bridge",
    "Fruitvale Bridge",
    "High Street Bridge",
    "Bay Bridge",
  ],
  majorHubs: [
    "Oakland International Airport",
    "Port of Oakland",
    "AC Transit",
    "Bay Area Rapid Transit (BART)",
    "Amtrak",
    "Union Pacific Railroad",
    "Alameda/Oakland Ferry",
  ],
};

export const facilities = [
  {
    name: "Administration",
    addr: "150 Frank H Ogawa Plaza, Suite 3354, 94612",
  },
  {
    name: "Fire Prevention",
    addr: "250 Frank H Ogawa Plaza, Suite 3341, 94612",
  },
  { name: "Apparatus Shop", addr: "5050 Coliseum Way, 94601" },
  { name: "Services and Radio Shop", addr: "7107 Edgewater, 94621" },
  { name: "Training Division", addr: "250 Victory Court, 94607" },
];
