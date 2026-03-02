import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Are your doctors properly licensed and verified?",
    answer: "Yes. All doctors on MyCyber Clinics are licensed by the Medical and Dental Council of Nigeria (MDCN). We verify their credentials upon hiring and re-verify them every year at license renewal. Doctors must immediately notify us of any changes to their licensure status."
  },
  {
    question: "How can I see my doctor's credentials before booking?",
    answer: "Before any consultation, you can view your doctor's full credentials including their MDCN registration number, qualifications, specialization, years of practice, and professional licenses. This information is displayed on every doctor's profile page."
  },
  {
    question: "Why do I need to pay a ₦2,000 activation fee?",
    answer: "The ₦2,000 is a one-time account activation fee that unlocks secure platform access, doctor booking, CHIOMA support, and health education resources. It is not a consultation fee. It is credited toward your first consultation within 30 days and waived for new Gold or Platinum Concierge members."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. MyCyber Clinics is built on transparent pricing. Pay-as-you-go consultations are GP: ₦6,000, Consultant: ₦8,000, and Specialist: ₦10,000. Gold is ₦40,000/month and Platinum is ₦60,000/month. What you see upfront is what you pay."
  },
  {
    question: "What professional standards do your doctors follow?",
    answer: "All our doctors adhere to professional ethical principles appropriate to their profession. They comply with Nigerian Medical and Dental Council regulations and jurisdictional licensure requirements. We implement systems to ensure they maintain these professional standards."
  },
  {
    question: "Can I choose my own doctor?",
    answer: "Yes! You can browse our verified doctors' profiles, see their specialties, credentials, and availability, and book with your preferred physician. All our doctors are licensed by the Medical and Dental Council of Nigeria (MDCN)."
  },
  {
    question: "How quickly can I see a doctor?",
    answer: "Most consultations are available within minutes. Our doctors are online 24/7. You can book an immediate consultation or schedule an appointment for a convenient time."
  },
  {
    question: "What is CHIOMA?",
    answer: "CHIOMA is your smart care companion for guidance, booking help, and health education. It does not replace doctors or provide diagnosis. CHIOMA usage by plan: Activated users get up to 10 messages/month, pay-as-you-go users with a recent consultation get up to 30/month, Gold gets unlimited (fair use), and Platinum gets unlimited with priority routing."
  },
  {
    question: "Can I use MyCyber Clinics without paying monthly?",
    answer: "Yes. Pay-As-You-Go lets you pay only when you book a consultation. Monthly concierge plans are optional and best for users who want ongoing, priority access and unlimited visits."
  },
  {
    question: "Why are there different consultation prices for doctors?",
    answer: "Consultation fees are based on level of expertise. General Practitioners manage common conditions, while Consultants and Specialists provide advanced or focused care. This helps you choose the level of care that matches your needs."
  },
  {
    question: "What makes concierge care different?",
    answer: "Concierge care is not insurance. It gives you predictable monthly costs, no per-visit billing, direct doctor access, coordinated referrals, and longer structured follow-up support."
  },
  {
    question: "Can I get prescriptions through the platform?",
    answer: "Yes. After your consultation, your doctor can issue prescriptions digitally. You can have them filled at your local pharmacy or use our partner pharmacy network for delivery (where available)."
  },
  {
    question: "Is my health information secure?",
    answer: "Absolutely. We use bank-level encryption and follow international healthcare privacy standards to protect your medical records. Your data is stored securely and never shared without your explicit consent."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 lg:px-32 bg-[#F1F2FB]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#1C227A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Everything you need to know about MyCyber Clinics
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E4E5F6]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F1F2FB] transition-colors"
              >
                <span className="font-semibold text-[#1C227A] pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7D1FFF] flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-5" role="region">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-xl p-8 border-l-4 border-[#7D1FFF]">
          <h3 className="font-semibold text-xl text-[#1C227A] mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to help you
          </p>
          <a
            href="#contact"
            className="inline-block text-[#7D1FFF] font-semibold hover:underline"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
}
