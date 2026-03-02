import { useEffect, useRef, useState } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import AnimatedSection from "../components/AnimatedSection";
import { TrustSection } from "../components/TrustSection";
import { HowItWorks } from "../components/HowItWorks";
import { Services } from "../components/Services";
import { CredentialVerification } from "../components/CredentialVerification";
import { ChiomaSection } from "../components/ChiomaSection";
import { Pricing } from "../components/Pricing";
import { Team } from "../components/Team";
import { BlogPreview } from "../components/BlogPreview";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ArrowUp, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const lastScrollYRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hideScrollTopControl = () => {
      setShowScrollTop(false);
    };

    const resetHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        hideScrollTopControl();
      }, 2500);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollYRef.current;

      if (currentScrollY < 120) {
        hideScrollTopControl();
      } else if (isScrollingUp && currentScrollY > 300) {
        setShowScrollTop(true);
        resetHideTimer();
      } else if (!isScrollingUp) {
        hideScrollTopControl();
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappLink =
    "https://wa.me/2348012345678?text=Hello%20MyCyber%20Clinics%2C%20I%20need%20help%20with%20a%20consultation.";

  return (
    <div className="min-h-screen bg-white font-['Karla']" lang="en">
      <Hero />
      <main>
        <AnimatedSection>
          <About />
        </AnimatedSection>

        <AnimatedSection>
          <TrustSection />
        </AnimatedSection>

        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>

        <AnimatedSection>
          <Services />
        </AnimatedSection>

        <AnimatedSection>
          <CredentialVerification />
        </AnimatedSection>

        <AnimatedSection>
          <ChiomaSection />
        </AnimatedSection>

        <AnimatedSection>
          <Pricing />
        </AnimatedSection>

        <AnimatedSection>
          <Team />
        </AnimatedSection>

        <AnimatedSection>
          <BlogPreview />
        </AnimatedSection>

        <AnimatedSection>
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />

      {chatMinimized ? (
        <button
          type="button"
          onClick={() => setChatMinimized(false)}
          className="fixed bottom-28 sm:bottom-6 right-0 z-50 inline-flex items-center gap-2 rounded-l-full bg-[#7E5BA1] hover:bg-[#14A9CC] text-white px-3 py-3 shadow-lg transition-colors"
          aria-label="Open chat assistant"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
        </button>
      ) : (
        <div className="fixed bottom-28 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
          {showChatOptions && (
            <div className="mb-3 w-72 rounded-xl bg-white border border-[#ECF0F1] shadow-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#2C3E50]">Start a chat</p>
                <button
                  type="button"
                  onClick={() => setShowChatOptions(false)}
                  className="p-1 rounded-md hover:bg-[#ECF0F1] transition-colors"
                  aria-label="Close chat options"
                >
                  <X className="w-4 h-4 text-[#2C3E50]" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#1DA851] text-white px-3 py-2.5 text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp Business Chat
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowChatOptions(false);
                setChatMinimized(true);
              }}
              className="w-10 h-10 rounded-full bg-white border border-[#ECF0F1] text-[#2C3E50] hover:bg-[#ECF0F1] shadow-md inline-flex items-center justify-center transition-colors"
              aria-label="Minimize chat bubble"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setShowChatOptions((prev) => !prev)}
              className="w-14 h-14 rounded-full bg-[#7E5BA1] hover:bg-[#14A9CC] text-white shadow-lg inline-flex items-center justify-center transition-colors"
              aria-label="Open chat options"
              aria-expanded={showChatOptions}
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {showScrollTop && (
        <>
          <button
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-24 sm:bottom-24 left-4 sm:left-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#14A9CC] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#FFC857] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            Scroll to top
          </button>
        </>
      )}
    </div>
  );
}
