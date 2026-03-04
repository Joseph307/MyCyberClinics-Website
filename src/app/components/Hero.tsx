"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Shield, Clock, Stethoscope, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
// import logoImage from "../../assets/c8397ab71eb936effba7144da57bfed566604694.png";
import logoImageNew from "../../assets/log_o-removebg-cropped.webp";
import imgHero from "../../assets/618cefd477229e137057ef5ef785eb848fb5df12.png";
import type { SiteSettingsContent } from "@/sanity/lib/content";

type GsapTimelineLike = {
  from: (
    target: unknown,
    vars?: unknown,
    position?: unknown,
  ) => GsapTimelineLike;
  kill?: () => void;
};

type GsapLike = {
  timeline: (vars?: unknown) => GsapTimelineLike;
  from: (target: unknown, vars?: unknown) => unknown;
  to: (target: unknown, vars?: unknown) => unknown;
  utils: {
    toArray: (selector: string) => Element[];
  };
  registerPlugin?: (plugin: unknown) => void;
  killTweensOf?: (target: unknown) => void;
};

type ScrollTriggerInstanceLike = {
  kill: () => void;
};

type ScrollTriggerLike = {
  getAll?: () => ScrollTriggerInstanceLike[];
};

const resolveGsap = (gsapModule: unknown): GsapLike | null => {
  const moduleObj = gsapModule as { gsap?: unknown; default?: unknown };
  const candidate = moduleObj.gsap ?? moduleObj.default ?? gsapModule;

  if (!candidate || typeof candidate !== "object") return null;

  const obj = candidate as Record<string, unknown>;
  const utils = obj.utils as Record<string, unknown> | undefined;

  if (
    typeof obj.timeline !== "function" ||
    typeof obj.from !== "function" ||
    typeof obj.to !== "function" ||
    !utils ||
    typeof utils.toArray !== "function"
  ) {
    return null;
  }

  return candidate as GsapLike;
};

const resolveScrollTrigger = (stModule: unknown): ScrollTriggerLike | null => {
  const moduleObj = stModule as { ScrollTrigger?: unknown; default?: unknown };
  const candidate = moduleObj.ScrollTrigger ?? moduleObj.default ?? stModule;

  if (!candidate || typeof candidate !== "object") return null;
  return candidate as ScrollTriggerLike;
};

type HeroProps = {
  siteSettings: SiteSettingsContent;
};

export function Hero({ siteSettings }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const signUpUrl =
    siteSettings.primaryCtaLink || "https://app.mycyberclinics.com/bookAppointmentScreen";
  const primaryCtaText = siteSettings.primaryCtaText || "Book Consultation";

  // Close mobile menu with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // GSAP animations for hero and scroll-triggered reveals
  useEffect(() => {
    let heroTimeline: GsapTimelineLike | null = null;
    let scrollTriggerPlugin: ScrollTriggerLike | null = null;

    // don't run on server
    if (typeof window === "undefined") return;

    // respect reduced motion preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // dynamic import so SSR doesn't attempt to load GSAP or ScrollTrigger
    import("gsap")
      .then((gsapModule) => {
        const gsap = resolveGsap(gsapModule);
        if (!gsap) return;

        // Try to import ScrollTrigger and register it; ignore if unavailable
        import("gsap/ScrollTrigger")
          .then((stModule) => {
            scrollTriggerPlugin = resolveScrollTrigger(stModule);
            if (scrollTriggerPlugin && gsap.registerPlugin) {
              gsap.registerPlugin(scrollTriggerPlugin);
            }

            try {
              // Hero intro (runs immediately on load)
              heroTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
              });
              heroTimeline
                .from(".hero-heading", { opacity: 0, y: 36, duration: 0.9 })
                .from(
                  ".hero-sub",
                  { opacity: 0, y: 18, duration: 0.7 },
                  "-=0.5",
                )
                .from(
                  ".hero-cta",
                  { opacity: 0, scale: 0.98, duration: 0.6, stagger: 0.12 },
                  "-=0.5",
                );

              // Find all elements marked for reveal with data-reveal and animate them precisely
              const revealEls = gsap.utils.toArray("[data-reveal]");
              revealEls.forEach((el) => {
                try {
                  gsap.from(el, {
                    scrollTrigger: {
                      trigger: el,
                      start: "top 85%",
                      toggleActions: "play none none none",
                    },
                    y: 18,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.02,
                  });

                  // find CTAs inside the closest section/container for this reveal element
                  const parent =
                    el.closest('section, main, [role="region"], div') ||
                    el.parentElement;
                  const ctas = parent
                    ? parent.querySelectorAll(
                        ".btn-glow, .btn-pulse, a.btn-glow, button.btn-glow",
                      )
                    : null;
                  if (ctas && ctas.length > 0) {
                    gsap.from(ctas, {
                      scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                      },
                      opacity: 0,
                      scale: 0.98,
                      duration: 0.6,
                      stagger: 0.06,
                    });

                    gsap.to(ctas, {
                      scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play pause resume pause",
                      },
                      boxShadow:
                        "0 14px 40px rgba(0,0,0,0.10), 0 0 30px rgba(124,58,237,0.06)",
                      duration: 2.6,
                      yoyo: true,
                      repeat: -1,
                      ease: "sine.inOut",
                    });
                  }
                } catch {
                  // ignore individual element animation errors
                }
              });
            } catch {
              // swallow animation errors
            }
          })
          .catch(() => {
            // ScrollTrigger import failed; fall back to simple hero animation only
            try {
              heroTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
              });
              heroTimeline
                .from(".hero-heading", { opacity: 0, y: 36, duration: 0.9 })
                .from(
                  ".hero-sub",
                  { opacity: 0, y: 18, duration: 0.7 },
                  "-=0.5",
                )
                .from(
                  ".hero-cta",
                  { opacity: 0, scale: 0.98, duration: 0.6, stagger: 0.12 },
                  "-=0.5",
                );

              gsap.to(".btn-pulse", {
                boxShadow:
                  "0 14px 40px rgba(0,0,0,0.10), 0 0 30px rgba(124,58,237,0.06)",
                duration: 2.6,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              });
            } catch {
              // swallow
            }
          });
      })
      .catch(() => {
        // gsap failed to import; nothing to do
      });

    return () => {
      // cleanup: kill timelines and ScrollTrigger instances
      import("gsap").then((gsapModule) => {
        const g = resolveGsap(gsapModule);
        try {
          if (heroTimeline && heroTimeline.kill) heroTimeline.kill();
          if (g && g.killTweensOf) g.killTweensOf(".btn-pulse");
          if (scrollTriggerPlugin && scrollTriggerPlugin.getAll) {
            scrollTriggerPlugin.getAll().forEach((t) => t.kill());
          }
        } catch {
          // ignore
        }
      });
    };
  }, []);

  return (
    <div id="home" className="relative bg-white">
      {/* Skip link removed per request */}

      {/* Sticky Header/Navbar */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#ECF0F1] px-6 lg:px-32 py-4"
        role="banner"
      >
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link to="/#home" className="flex items-center gap-3">
            {/* old src: "../../assets/c8397ab71eb936effba7144da57bfed566604694.png" */}
            <Image
              src={logoImageNew}
              alt="MyCyber Clinics - Healthcare meets Technology"
              priority
              sizes="(min-width: 1024px) 160px, 140px"
              className="h-14 lg:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href="#about"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              Services
            </a>
            <a
              href="#plans"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              Pricing
            </a>
            <a
              href="#team"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              Doctors
            </a>
            <Link
              to="/blog"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              Health Blog
            </Link>
            <a
              href="#contact"
              className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-sm md:text-lg font-medium"
            >
              Contact
            </a>
            <Button
              asChild
              variant="brand-gold"
              className="text-sm md:text-lg px-6 py-3"
            >
              <a href="https://app.mycyberclinics.com/signIn">Log In</a>
            </Button>
            <Button
              asChild
              className="bg-[#48C9B0] hover:bg-[#FFC857] text-white text-sm md:text-lg px-6 py-3 "
            >
              <a href={signUpUrl}>{primaryCtaText}</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-[#2C3E50]" />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative px-6 lg:px-32 py-24 lg:py-32 overflow-hidden"
        id="main-content"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imgHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#48C9B0]/88 via-[#7E5BA1]/78 to-[#2C3E50]/62"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1
            style={{ fontFamily: "var(--font-display, var(--font-sans))" }}
            className="hero-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Skip the Queue. See a Doctor anytime, anywhere.
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
            Get 24/7 access to verified Nigerian doctors, instant prescriptions,
            and transparent pricing. Start with just ₦2,000.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-[#7E5BA1] hover:bg-[#FFC857] text-white text-lg px-8 py-6 btn-glow btn-pulse hero-cta"
            >
              <a href={signUpUrl}>{primaryCtaText}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#2C3E50] text-lg px-8 py-6 btn-glow hero-cta"
            >
              <a href="#plans">See Pricing</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#FFC857]" />
              </div>
              <div>
                <p className="font-semibold text-white text-base">
                  Verified Doctors
                </p>
                <p className="text-sm text-white/80">MDCN Licensed</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#FFC857]" />
              </div>
              <div>
                <p className="font-semibold text-white text-base">
                  24/7 Availability
                </p>
                <p className="text-sm text-white/80">Always online</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-5 h-5 text-[#FFC857]" />
              </div>
              <div>
                <p className="font-semibold text-white text-base">
                  Transparent Pricing
                </p>
                <p className="text-sm text-white/80">No hidden fees</p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-white/10 backdrop-blur rounded-lg border-l-4 border-[#FFC857]">
            <p className="text-sm text-white leading-relaxed">
              <span className="font-semibold">🔒 Your Privacy Protected:</span>{" "}
              We follow international healthcare privacy standards. Your health
              data is encrypted and secure. This platform is for consultations
              and health guidance - not for collecting sensitive personal
              information.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-6 py-4">
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6 text-[#2C3E50]" />
            </button>
            <nav className="flex flex-col gap-4">
              <a
                href="#about"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#services"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#plans"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#team"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Doctors
              </a>
              <Link
                to="/blog"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Health Blog
              </Link>
              <a
                href="#contact"
                className="text-[#2C3E50] hover:text-[#FFC857] transition-colors text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button asChild variant="brand-gold">
                <a href="https://app.mycyberclinics.com/signIn">Log In</a>
              </Button>
              <Button
                asChild
                className="bg-[#7E5BA1] hover:bg-[#FFC857] text-white"
              >
                <a href={signUpUrl}>{primaryCtaText}</a>
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#ECF0F1] shadow-lg z-40">
        <Button
          asChild
          className="w-full bg-[#7E5BA1] hover:bg-[#FFC857] text-white py-4"
        >
          <a href={signUpUrl}>{primaryCtaText}</a>
        </Button>
      </div>
    </div>
  );
}
