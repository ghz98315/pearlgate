import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import BYDExperienceLogos from "@/components/BYDExperienceLogos";
import WhoShouldWorkWithMe from "@/components/WhoShouldWorkWithMe";
import PainPoints from "@/components/PainPoints";
import WhyPearlGate from "@/components/WhyPearlGate";
import DatabasePreview from "@/components/DatabasePreview";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// 每次请求都重新生成页面（因为包含动态博客内容）
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <BYDExperienceLogos />
        <WhoShouldWorkWithMe />
        <PainPoints />
        <WhyPearlGate />
        <DatabasePreview />
        <Services />
        <Testimonials />
        <Process />
        <BlogPreview />
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
