import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import CinematicHero from "./components/CinematicHero";
import BannerShowcase from "./components/BannerShowcase";
import TrustMarquee from "./components/TrustMarquee";
import HorizontalServices from "./components/HorizontalServices";
import ImpactStats from "./components/ImpactStats";
import StackedBenefits from "./components/StackedBenefits";
import Footer from "./components/Footer";
import NoiseOverlay from "./components/NoiseOverlay";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    <SmoothScroll>
        <Preloader />
        <CustomCursor />
        <NoiseOverlay />
        <main className="min-h-screen bg-white">
            <Navbar />
            <CinematicHero />
            <TrustMarquee />
            <BannerShowcase />
            <HorizontalServices />
            <ImpactStats />
            <StackedBenefits />
            <Footer />
        </main>
    </SmoothScroll>
  );
}
