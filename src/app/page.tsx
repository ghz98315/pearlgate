import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhoShouldWorkWithMe from "@/components/WhoShouldWorkWithMe";
import PainPoints from "@/components/PainPoints";
import WhyChooseMe from "@/components/WhyChooseMe";
import DatabasePreview from "@/components/DatabasePreview";
import Services from "@/components/Services";
import WhyGuangdong from "@/components/WhyGuangdong";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <WhoShouldWorkWithMe />
        <PainPoints />
        <WhyChooseMe />
        <DatabasePreview />
        <Services />
        <Testimonials />
        <WhyGuangdong />
        <Process />
        <BlogPreview />
        <Trust />
        <FAQ />
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <EmailCapture
              title="Get weekly sourcing tips + new factory alerts"
              subtitle="Join buyers who source smarter from China. Free, no spam."
              source="homepage"
            />
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
