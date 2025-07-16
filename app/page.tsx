import Link from "next/link";
import {
  ArrowLeft,
  Search,
  User,
  Bell,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import PortfolioGrid from "@/components/portfolio-grid";
import TechStack3D from "@/components/tech-stack-3d";
import LandingLogo from "@/components/landing-logo";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 text-gray-900"
      style={{
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      }}
    >
      {/* <Header /> */}
      <main className="flex-1">
        <HeroSection />
        {/* Portfolio Grid Section */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-6">
            <PortfolioGrid />
          </div>
        </section>
        {/* <FeaturesSection /> */}
        {/* <CTASection /> */}

        {/* Spacer to push footer down */}
        <div className="h-16 md:h-24 lg:h-32"></div>
      </main>
      <Footer />
    </div>
  );
}
