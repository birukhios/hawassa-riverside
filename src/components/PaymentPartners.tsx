import { Lock } from "lucide-react";
import { VisaLogo, MastercardLogo, AmexLogo } from "./BrandLogos";
import { WALLETS } from "@/lib/payment-options";
import WalletLogo from "./WalletLogo";
import LogoImg from "./LogoImg";

export default function PaymentPartners() {
  return (
    <section className="py-16 bg-white border-t border-black/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="inline-flex items-center gap-1.5 text-sm text-ink-2 mb-8">
          <Lock className="w-4 h-4 text-lake" />
          Secure payments powered by
          <LogoImg
            src="/logos/afropay.png"
            alt="AfroPay"
            className="h-4 w-auto"
            fallback={<span className="font-bold text-blue-600">afropay</span>}
          />
        </p>

        {/* Local wallets */}
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-2/70 mb-4">
          Local wallets &amp; banks
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10">
          {WALLETS.map((w) => (
            <div key={w.id} className="h-8 flex items-center">
              <WalletLogo brand={w} className="!text-base max-h-8" />
            </div>
          ))}
          <span className="text-base font-semibold text-ink-2">
            + all Ethiopian banks
          </span>
        </div>

        {/* International cards */}
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-2/70 mb-4">
          International cards · any currency
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <VisaLogo className="text-2xl" />
          <MastercardLogo size={40} />
          <AmexLogo className="text-sm" />
          <span className="text-sm text-ink-2">USD · EUR · GBP · AED · KES…</span>
        </div>
      </div>
    </section>
  );
}
