import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useSiteSettings } from "@/sanity/lib/hooks";

const plans = [
  {
    name: "Pay As You Go",
    price: "From ₦6,000",
    period: "per consultation + ₦2,000 one-time activation",
    description: "Flexible care for occasional medical needs",
    features: [
      "One-time ₦2,000 account activation",
      "GP consultations: ₦6,000 each",
      "Consultant visits: ₦8,000 each",
      "Specialist appointments: ₦10,000 each",
      "Activation credited toward first consultation within 30 days",
      "24/7 platform access",
      "Digital prescriptions",
      "CHIOMA chat: 10 messages/month after activation, up to 30/month with active pay-as-you-go use",
      "72-hour follow-up window with up to 3 patient messages per consultation; further questions require a new consultation or concierge upgrade"
    ],
    highlighted: false
  },
  {
    name: "Gold Plan",
    price: "₦40,000",
    period: "per month",
    description: "Premium monthly care with direct doctor access",
    features: [
      "Activation fee waived",
      "Unlimited telehealth visits",
      "Direct access to assigned doctor",
      "Emergency medical referrals",
      "Care coordination",
      "7-day structured post-consult follow-up",
      "Up to 10 patient messages per consultation",
      "CHIOMA chat: unlimited (fair use)"
    ],
    highlighted: true
  },
  {
    name: "Platinum Plan",
    price: "₦60,000",
    period: "per month",
    description: "Priority concierge care with enhanced support",
    features: [
      "Activation fee waived",
      "Everything in Gold",
      "Priority response handling",
      "Enhanced care coordination",
      "14-day structured post-consult follow-up",
      "Up to 20 patient messages per consultation",
      "CHIOMA chat: unlimited + priority routing (fair use)"
    ],
    highlighted: false
  }
];

export function Pricing() {
  const siteSettings = useSiteSettings();
  const whatsappLink =
    siteSettings.socialWhatsApp ||
    "https://wa.me/2348012345678?text=Hello%20MyCyber%20Clinics%2C%20I%20need%20help%20with%20a%20consultation.";

  return (
    <section id="plans" className="py-20 px-6 lg:px-32 bg-[#ECF0F1]">
      <div className="text-center mb-16">
        <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
          Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          No hidden fees. No surprises. Pay per consultation or choose concierge care for unlimited, priority access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto" role="list" aria-label="Pricing plans">
        {plans.map((plan, index) => (
          <article
            key={index}
            role="listitem"
            aria-labelledby={`plan-title-${index}`}
            className={`relative bg-white rounded-2xl p-8 flex flex-col h-full ${
              plan.highlighted
                ? "border-4 border-[#14A9CC] shadow-2xl scale-105"
                : "border border-[#ECF0F1] shadow-sm"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FFC857] text-[#2C3E50] px-6 py-2 rounded-full text-sm font-semibold" aria-label="Recommended plan">
                Most Popular
              </div>
            )}

            <div className="text-center mb-8">
              <h3 id={`plan-title-${index}`} className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#2C3E50] mb-2">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-2">
                <span className="font-['Univa_Nova',sans-serif] font-bold text-4xl text-[#2C3E50]">
                  {plan.price}
                </span>
              </div>
              <p className="text-sm text-gray-600">{plan.period}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1" aria-label={`${plan.name} features`}>
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFC857] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          asChild
          variant="brand-aqua"
          className="btn-glow px-10 py-6 text-base"
          aria-label="Get started with MyCyber Clinics"
        >
          <a href="https://app.mycyberclinics.com/signUp">Get Started</a>
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center bg-white rounded-xl p-8 max-w-4xl mx-auto border border-[#ECF0F1]">
        <h3 className="font-semibold text-xl text-[#2C3E50] mb-4">
          One-Time Account Activation (₦2,000)
        </h3>
        <p className="text-gray-600 mb-6">
          Activates secure access to doctors, consultation booking, CHIOMA, and health education resources. The ₦2,000 is credited toward your first consultation within 30 days and waived for new Gold or Platinum sign-ups.
        </p>
        <Button asChild variant="brand-aqua" className="btn-glow">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to Our Team
          </a>
        </Button>
      </div>

      <div className="mt-8 bg-white rounded-xl p-8 max-w-4xl mx-auto border border-[#ECF0F1]">
        <h3 className="font-semibold text-xl text-[#2C3E50] mb-4">
          CHIOMA Chat Access
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>Activated users (no plan): up to 10 messages/month</li>
          <li>Pay-as-you-go users (consultation in last 30 days): up to 30 messages/month</li>
          <li>Gold plan: unlimited messages (fair use)</li>
          <li>Platinum plan: unlimited messages + priority routing (fair use)</li>
        </ul>
      </div>
    </section>
  );
}
