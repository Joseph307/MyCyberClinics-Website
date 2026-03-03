import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useSiteSettings } from "@/sanity/lib/hooks";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      ready?: (callback: () => void) => void;
    };
  }
}

export function Contact() {
  const siteSettings = useSiteSettings();
  const siteKey =
    siteSettings.recaptchaSiteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const contactEmail = siteSettings.contactEmail || "support@mycyberclinics.com";
  const contactPhone = siteSettings.contactPhone || "+2348012345678";
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    if (!siteKey || typeof window === "undefined") return;
    const renderWidget = () => {
      if (!recaptchaContainerRef.current || recaptchaWidgetIdRef.current !== null) return true;
      if (!window.grecaptcha || typeof window.grecaptcha.render !== "function") return false;

      recaptchaWidgetIdRef.current = window.grecaptcha.render(recaptchaContainerRef.current, {
        sitekey: siteKey,
        callback: (token) => setRecaptchaToken(token),
        "expired-callback": () => setRecaptchaToken(""),
        "error-callback": () => setRecaptchaToken(""),
      });
      return true;
    };

    const waitForRender = () => {
      if (renderWidget()) return;
      let attempts = 0;
      const maxAttempts = 20;
      const interval = window.setInterval(() => {
        attempts += 1;
        if (renderWidget() || attempts >= maxAttempts) {
          window.clearInterval(interval);
        }
      }, 150);
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(waitForRender);
    } else {
      waitForRender();
    }

    const scriptId = "google-recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha?.ready) {
          window.grecaptcha.ready(waitForRender);
        } else {
          waitForRender();
        }
      };
      document.body.appendChild(script);
    }
  }, [siteKey]);

  const openEmailComposer = (subject: string, body: string) => {
    const to = contactEmail;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailComposeUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}` +
      `&su=${encodedSubject}&body=${encodedBody}`;
    const mailtoUrl = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;

    // Prefer Gmail web compose for reliability on machines using Gmail in browser.
    const popup = window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = mailtoUrl;
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!siteKey) {
      window.alert(
        "reCAPTCHA is not configured. Add a site key in Sanity or NEXT_PUBLIC_RECAPTCHA_SITE_KEY.",
      );
      return;
    }
    if (!recaptchaToken) {
      window.alert("Please complete the reCAPTCHA challenge before sending.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const emailSubject = `Contact Form: ${subject}`;
    const emailBody =
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`;
    openEmailComposer(emailSubject, emailBody);
    event.currentTarget.reset();
    setRecaptchaToken("");
    if (window.grecaptcha && recaptchaWidgetIdRef.current !== null) {
      window.grecaptcha.reset(recaptchaWidgetIdRef.current);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-32 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 data-reveal id="contact-heading" className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;re here to help. Reach out to our support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <h3 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#2C3E50] mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#7E5BA1]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Email Us</h4>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-gray-600 hover:text-[#14A9CC] transition-colors"
                  >
                    {contactEmail}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FFC857]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Call Us</h4>
                  <a
                    href={`tel:${contactPhone}`}
                    className="text-gray-600 hover:text-[#14A9CC] transition-colors"
                  >
                    {contactPhone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri: 8AM - 8PM, Sat-Sun: 9AM - 5PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#48C9B0]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Live Chat</h4>
                  <p className="text-gray-600">Chat with Chioma, our AI healthcare assistant</p>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7 for instant support</p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-[#ECF0F1] border-l-4 border-[#14A9CC] rounded-lg p-5" role="alert">
              <h4 className="font-semibold text-[#2C3E50] mb-2 flex items-center gap-2">
                <span className="text-[#14A9CC]" aria-hidden="true">⚠️</span>
                Emergency?
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                For medical emergencies, please call <strong>112</strong> or visit your nearest emergency room. MyCyber Clinics is not an emergency service.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#7E5BA1] text-white rounded-2xl p-8 self-start">
            <h3 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-white mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5" onSubmit={handleContactSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-white mb-2">
                  Full Name <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white text-[#2C3E50] caret-[#2C3E50] placeholder:text-gray-400"
                  placeholder="Enter your full name"
                  aria-required="true"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-white mb-2">
                  Email Address <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white text-[#2C3E50] caret-[#2C3E50] placeholder:text-gray-400"
                  placeholder="your.email@example.com"
                  aria-required="true"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white text-[#2C3E50] caret-[#2C3E50] placeholder:text-gray-400"
                  placeholder="+234 800 000 0000"
                />
                <p className="text-xs text-white/80 mt-1">Format: +234 followed by your number</p>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-white mb-2">
                  Subject <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white text-[#2C3E50] caret-[#2C3E50] placeholder:text-gray-400"
                  placeholder="How can we help?"
                  aria-required="true"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-white mb-2">
                  Message <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white resize-none text-[#2C3E50] caret-[#2C3E50] placeholder:text-gray-400"
                  placeholder="Tell us more about your inquiry..."
                  aria-required="true"
                ></textarea>
                <p className="text-xs text-white/80 mt-1">Please do not include any personal health information</p>
              </div>

              {/* Privacy Notice */}
              <div className="bg-white rounded-lg p-4 text-xs text-gray-600">
                <p className="leading-relaxed">
                  By submitting this form, you agree to our <a href="https://firebasestorage.googleapis.com/v0/b/my-cyber-clinics/o/documents%2FMyCyberClinics%20Privacy%20Policy.pdf?alt=media&token=f520b697-608d-4808-a4b5-6d02c017049c" target="_blank" rel="noopener noreferrer" className="text-[#14A9CC] hover:underline">Privacy Policy</a>. We&apos;ll only use your information to respond to your inquiry and won&apos;t share it with third parties.
                </p>
              </div>

              {/* Submit Button */}
              <div className="space-y-2">
                <div ref={recaptchaContainerRef} />
                {!siteKey && (
                  <p className="text-xs text-[#FFE8A1]">
                    reCAPTCHA not configured. Set a site key in Sanity or{" "}
                    <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code>.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={!siteKey}
                className="w-full bg-[#48C9B0] hover:bg-[#14A9CC] text-white py-4 text-lg btn-glow btn-pulse"
                aria-label="Send message"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

