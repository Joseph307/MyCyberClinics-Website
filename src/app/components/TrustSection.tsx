import Image from "next/image";
import { DollarSign, Lock, CheckCircle } from "lucide-react";
import AdaezeImg from "../../assets/review1.png";
import ChidiImg from "../../assets/review4.png";
import FunmiImg from "../../assets/review3.png";

const trustCards = [
  {
    icon: CheckCircle,
    title: "Verified Doctors",
    description: "All our physicians are licensed by the Medical and Dental Council of Nigeria (MDCN). Every profile is verified and updated regularly."
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Ever. See exactly what you'll pay before booking. One-time ₦2,000 activation, then clear per-consultation rates."
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description: "Bank-level encryption protects your health data. We follow international privacy standards to keep your information confidential."
  }
];

const testimonials = [
  {
    name: "Adaeze O.",
    location: "Lagos",
    text: "I booked a consultation at 11pm and spoke to a doctor in 5 minutes. This service is a lifesaver for busy professionals.",
    rating: 5,
    avatar: AdaezeImg
  },
  {
    name: "Dr. Chidi M.",
    role: "General Practitioner",
    text: "MyCyber Clinics makes it easy to reach patients who need care but can't make it to a physical clinic. Great platform.",
    rating: 5,
    avatar: ChidiImg
  },
  {
    name: "Dotun F.",
    location: "Abuja",
    text: "The pricing is so clear and affordable. No more surprise bills. I know exactly what I'm paying for before I book.",
    rating: 5,
    avatar: FunmiImg
  }
];

export function TrustSection() {
  return (
    <section className="py-20 px-6 lg:px-32 bg-white">
      {/* Trust Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {trustCards.map((card, index) => (
          <div
            key={index}
            className={`bg-[#ECF0F1] rounded-xl p-8 text-center border-2 transition-all ${
              index === 0
                ? "border-[#14A9CC]/25 hover:border-[#14A9CC]"
                : index === 1
                  ? "border-[#FFC857]/35 hover:border-[#FFC857]"
                  : "border-[#48C9B0]/25 hover:border-[#48C9B0]"
            }`}
          >
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <card.icon
                className={`w-8 h-8 ${
                  index === 0
                    ? "text-[#14A9CC]"
                    : index === 1
                      ? "text-[#FFC857]"
                      : "text-[#48C9B0]"
                }`}
              />
            </div>
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-xl text-[#2C3E50] mb-3">
              {card.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="text-center mb-12">
        <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
          Trusted by Thousands
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join the growing community of Nigerians getting better healthcare access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-[#ECF0F1] hover:shadow-lg transition-shadow"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-[#FFC857]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-700 mb-6 leading-relaxed italic">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author with avatar */}
            <div className="flex items-center gap-4 mt-2">
              <Image
                src={testimonial.avatar}
                alt={`${testimonial.name} avatar`}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-[#2C3E50]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.location || testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
