import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ResponseMatrixCard } from "@/components/quick-ref/ResponseMatrix";
import { DispositionCodesCard } from "@/components/quick-ref/DispositionCodes";
import { RadioChannelsCard } from "@/components/quick-ref/RadioChannels";
import { HydrantColorsCard } from "@/components/quick-ref/HydrantColors";
import { BuzzerCommandsCard } from "@/components/quick-ref/BuzzerCommands";
import { LadderCommandsCard } from "@/components/quick-ref/LadderCommands";
import { PhoneticAlphabetCard } from "@/components/quick-ref/PhoneticAlphabet";
import { ExtinguishersCard } from "@/components/quick-ref/Extinguishers";
import { TruckCompaniesCard } from "@/components/quick-ref/TruckCompanies";

export const metadata = {
  title: "Quick Reference — OFD Handbook",
  description:
    "Instant lookup for response matrix, disposition codes, radio channels, hydrant colors, and more.",
};

export default function QuickRefPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="mb-10">
            <p className="text-sm font-mono font-medium text-accent tracking-wider uppercase mb-2">
              Quick Reference
            </p>
            <h1 className="heading text-3xl sm:text-4xl text-primary mb-3">
              Instant Lookup
            </h1>
            <p className="text-secondary max-w-xl">
              The most-referenced tables and charts from the handbook, formatted
              for fast scanning. Tap any card to expand.
            </p>
          </div>

          <div className="space-y-6">
            <TruckCompaniesCard />
            <ResponseMatrixCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DispositionCodesCard />
              <RadioChannelsCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HydrantColorsCard />
              <ExtinguishersCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BuzzerCommandsCard />
              <PhoneticAlphabetCard />
            </div>
            <LadderCommandsCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
