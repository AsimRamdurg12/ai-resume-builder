import FAQ from "@/components/shared/FAQ";
import Features from "@/components/shared/Features";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import Pricing from "@/components/shared/Pricing";
import Work from "@/components/shared/Work";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center pb-20 gap-16 max-w-6xl mx-auto">
      <main className="flex flex-col gap-8 row-start-2">
        <Hero />
        <Features />
        <Work />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
