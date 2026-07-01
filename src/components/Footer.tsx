import { Mail, Phone, MapPin } from "lucide-react";
import LogoImg from "./LogoImg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mist text-ink-2 pt-20 pb-10 border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* CTA band */}
        <div className="text-center mb-20">
          <h3 className="text-3xl sm:text-5xl font-semibold text-ink text-balance mb-6">
            Build the Hawassa Lakeside.
          </h3>
          <a
            href="#donate"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-lake text-white text-[17px] font-medium hover:bg-lake-deep transition-all hover:scale-[1.02]"
          >
            Donate with AfroPay
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-black/8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <LogoImg
                src="/logos/hawassa-city.jpg"
                alt="Hawassa City Administration"
                className="h-9 w-auto"
              />
              <p className="text-[15px] font-semibold text-ink">
                Hawassa Lakeside
              </p>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              An official project of the Hawassa City Administration — building a
              lakefront park for every family on the shores of Lake Hawassa.
            </p>
          </div>

          <div>
            <h4 className="text-ink font-medium mb-4 text-sm">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#impact" className="hover:text-ink transition-colors">
                  Why It Matters
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-ink transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-ink transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-ink transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-medium mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:support@hawassafund.org"
                  className="hover:text-ink transition-colors"
                >
                  support@hawassafund.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+251967123456"
                  className="hover:text-ink transition-colors"
                >
                  +251 96 712 3456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Hawassa City, Ethiopia
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-medium mb-4 text-sm">Follow</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-ink transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[13px]">
          <p>&copy; {year} Hawassa Lakeside Project. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms
            </a>
            <span className="inline-flex items-center gap-1.5 text-ink-2/70">
              Powered by
              <LogoImg
                src="/logos/afropay.png"
                alt="AfroPay"
                className="h-4 w-auto"
                fallback={
                  <span className="font-bold text-blue-600">afropay</span>
                }
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
