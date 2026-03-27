export interface RadioChannel {
  channel: number;
  zoneA: string;
  zoneB: string;
  zoneD: string;
  zoneUU: string;
}

export const radioChannels: RadioChannel[] = [
  {
    channel: 1,
    zoneA: "OKL DSP 1",
    zoneB: "OKL DSP 1",
    zoneD: "OKL DSP 1",
    zoneUU: "OKL DSP 1",
  },
  {
    channel: 2,
    zoneA: "OKL TAC 2",
    zoneB: "XAL DSP 3",
    zoneD: "OKL TAC 2",
    zoneUU: "OKL TAC 2",
  },
  {
    channel: 3,
    zoneA: "OKL TAC 3",
    zoneB: "EMYTAC1",
    zoneD: "OKL TAC 3",
    zoneUU: "OKL TAC 3",
  },
  {
    channel: 4,
    zoneA: "OKL TAC 4",
    zoneB: "CMED",
    zoneD: "OKL TAC 4",
    zoneUU: "OKL TAC 4",
  },
  {
    channel: 5,
    zoneA: "OKL TAC 5",
    zoneB: "EMS TAC40",
    zoneD: "8CALL90D",
    zoneUU: "SCU L T6",
  },
  {
    channel: 6,
    zoneA: "OKL TAC 6",
    zoneB: "OKL FPB1",
    zoneD: "8TAC91D",
    zoneUU: "CDF C1 T1",
  },
  {
    channel: 7,
    zoneA: "OKL TAC 7",
    zoneB: "OKL FPB2",
    zoneD: "8TAC92D",
    zoneUU: "CDF TAC 2",
  },
  {
    channel: 8,
    zoneA: "OKL TAC 8",
    zoneB: "OKL HAZ1",
    zoneD: "7FIRE63D",
    zoneUU: "CDF TAC 6",
  },
  {
    channel: 9,
    zoneA: "OKL TAC 9",
    zoneB: "OKL HAZ2",
    zoneD: "7FIRE83D",
    zoneUU: "CDF TAC 9",
  },
  {
    channel: 10,
    zoneA: "OKL CMD 1",
    zoneB: "OKL TRN1",
    zoneD: "XAL DSP 1",
    zoneUU: "XALVTAC4",
  },
  {
    channel: 11,
    zoneA: "OKL CMD 2",
    zoneB: "OKL TRN2",
    zoneD: "XAL TAC 3",
    zoneUU: "VFIRE 22",
  },
  {
    channel: 12,
    zoneA: "OKL AIRPORT",
    zoneB: "OKLBATT2",
    zoneD: "XAL TAC 4",
    zoneUU: "VFIRE 23",
  },
  {
    channel: 13,
    zoneA: "OKL OPD",
    zoneB: "OKLBATT3",
    zoneD: "XAL FIR1D",
    zoneUU: "AIR TAC5",
  },
  {
    channel: 14,
    zoneA: "XAL VTAC 4",
    zoneB: "OKLBATT4",
    zoneD: "XAL FIR3D",
    zoneUU: "CALCORD",
  },
  {
    channel: 15,
    zoneA: "XALFIR3D",
    zoneB: "OKL SPT1",
    zoneD: "VFIRE 22",
    zoneUU: "CDF A/G 3",
  },
  {
    channel: 16,
    zoneA: "OKL EMRG",
    zoneB: "OKL EMRG",
    zoneD: "XAL VTAC 4",
    zoneUU: "GUARD",
  },
];

export const zoneInfo = {
  topKnob: [
    { zone: "A", label: "OKLFR1" },
    { zone: "B", label: "OKLFR2" },
    { zone: "D", label: "POSY/WEBSTR" },
    { zone: "UU", label: "WILDLAND" },
  ],
  frontKnob: [
    { zone: "A", label: "OKL 1" },
    { zone: "B", label: "OKL 2" },
    { zone: "D", label: "POSY/WEBSTR" },
    { zone: "UU", label: "WILDLAND" },
  ],
};

export const apx7000Instructions = {
  turnOnOff: [
    "Turn the radio on by rotating the On/Off/Volume Control Knob clockwise until you hear a click.",
    "Turn the radio off by rotating the On/Off/Volume Control Knob counterclockwise until you hear a click.",
  ],
  selectChannel: [
    "Rotate the 16-position Channel select knob to the desired channel. The new channel name will appear on the display.",
    'Press the PTT button to transmit. When speaking keep the microphone 1-2" directly in front of your mouth.',
    "Release PTT button to listen.",
  ],
  selectZone: [
    "Press the right side of the 4-way Navigation button until Zone displayed.",
    "Press the Menu Select button directly below Zone.",
    "Press the Up or Down Navigation button to the required Zone.",
    "Press the Menu Select button directly below SEL to confirm displayed Zone.",
  ],
  emergency: [
    "With the radio turned on, press the emergency button on either the mic or radio for 1 second.",
    'The display alternates between showing "EMERGENCY" and the current trunked zone and talkgroup/channel.',
    "Dispatch will activate alert tone for 3 seconds.",
    "Press the PTT button and announce your emergency.",
    "Release the PTT button to end the transmission and wait for a response from the dispatcher.",
  ],
  emergencyReset: [
    "Dispatch cannot clear an emergency. The radio user should NEVER clear a true emergency on their radio without being instructed to do so by dispatch.",
    'Notify dispatch that "The scene is safe". Depress and hold the EB for 5 seconds.',
  ],
};

export const bendixKingInstructions = {
  model: "Bendix King GPH CMD Portable",
  specs: "25 Groups, 20 channels per Group, 500 total channels",
  power: "HI = 5 watts, LO = 1 watt",
  changingBanks: [
    "Press # key",
    "Press desired bank through the key pad",
    "Press ENT",
  ],
  changingScanList:
    "Go to desired channel and press either ENT or CLR button to enter or clear the channel within the list. A solid SCN in the display means the channel is in SCAN.",
  commandGroup: [
    "To enter a channel: go to desired channel, press * (star) key.",
    "To remove a channel: hold * key and press # key.",
    "To delete entire Command Group: press and hold * key until display reads CMND EMPTY.",
    "After programming channels: press # key twice (display reads GRP CMND), then press ENT.",
  ],
  lockKeypad:
    "Press and hold FCN key until display reads LOCKED. To unlock, press and hold FCN key until display reads UNLOCKED.",
};
