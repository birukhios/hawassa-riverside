import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import CampaignProgress from "@/components/CampaignProgress";
import WhatWeBuild from "@/components/WhatWeBuild";
import StorySection from "@/components/StorySection";
import ImpactBreakdown from "@/components/ImpactBreakdown";
import DonationForm from "@/components/DonationForm";
import PaymentPartners from "@/components/PaymentPartners";
import RecentDonors from "@/components/RecentDonors";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full">
      <NavBar />
      <HeroSection />
      <CampaignProgress raised={1250000} goal={5000000} donors={842} />
      <WhatWeBuild />
      <StorySection />
      <ImpactBreakdown />
      <DonationForm campaignId="hawassa-riverside" />
      <PaymentPartners />
      <RecentDonors />
      <FAQSection />
      <Footer />
    </div>
  );
}
