import { Stethoscope, Video, FileText, Clock, Shield, Smartphone, Pill, Users } from "lucide-react";
import { trackEventAndNavigate } from "@/lib/analytics";

const services = [
  {
    icon: Video,
    title: "24/7 Video Consultations",
    description: "Connect with licensed doctors anytime, anywhere. Get medical advice through secure video calls from the comfort of your home."
  },
  {
    icon: FileText,
    title: "Digital Prescriptions",
    description: "Receive instant electronic prescriptions that you can fill at any pharmacy or through our partner network for home delivery."
  },
  {
    icon: Pill,
    title: "Medication Management",
    description: "Track your medications, set reminders, and get refill notifications. Never miss a dose with our smart medication assistant."
  },
  {
    icon: Clock,
    title: "Instant Access",
    description: "No long wait times. Book appointments in seconds and see a doctor within minutes. Your time is valuable."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption protects your medical records. We follow international healthcare privacy standards and HIPAA guidelines."
  },
  {
    icon: Users,
    title: "Family Healthcare",
    description: "Manage healthcare for your entire family under one account. Book appointments for children, parents, and loved ones."
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Access",
    description: "Access your health records and consult doctors from any device - smartphone, tablet, or computer. Healthcare on your terms."
  },
  {
    icon: Stethoscope,
    title: "Specialist Referrals",
    description: "Need a specialist? Our GPs can refer you to consultants and specialists for advanced care and follow-up treatment."
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 px-6 lg:px-32 bg-[#ECF0F1]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
              <h2 data-reveal id="services-heading" className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need for modern healthcare - all in one platform
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <article
              key={index}
              className="bg-white rounded-xl p-6 hover:shadow-xl hover:border-[#FFC857] border-2 border-transparent transition-all"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  index % 3 === 0
                    ? "bg-[#14A9CC]"
                    : index % 3 === 1
                      ? "bg-[#7E5BA1]"
                      : "bg-[#FFC857]"
                }`}
              >
                <service.icon
                  className={`w-7 h-7 ${index % 3 === 2 ? "text-[#2C3E50]" : "text-white"}`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#48C9B0] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="font-['Univa_Nova',sans-serif] font-bold text-3xl mb-4">
            Ready to Experience Better Healthcare?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Nigerians who have taken control of their health with MyCyber Clinics
          </p>
          <a
            href="https://app.mycyberclinics.com/"
            className="inline-flex bg-[#7E5BA1] hover:bg-[#FFC857] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            onClick={(e) => {
              e.preventDefault();
              void trackEventAndNavigate(
                "https://app.mycyberclinics.com/",
                "book_consultation_click",
                { location: "services_get_started" },
              );
            }}
          >
            Get Started for ₦2,000
          </a>
        </div>
      </div>
    </section>
  );
}

