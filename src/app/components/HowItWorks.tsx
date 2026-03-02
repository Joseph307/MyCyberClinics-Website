import { UserPlus, Stethoscope, Video, FileCheck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Activate Account",
    description: "Pay a one-time ₦2,000 fee to unlock 24/7 access to our platform and doctors"
  },
  {
    icon: Stethoscope,
    title: "Choose Doctor Type",
    description: "Select from General Practitioners, Consultants, or Specialists based on your needs"
  },
  {
    icon: Video,
    title: "Consult Instantly",
    description: "Connect via video or audio call with your doctor from anywhere, anytime"
  },
  {
    icon: FileCheck,
    title: "Get Prescriptions",
    description: "Receive digital prescriptions, referrals, and care plans directly on the platform"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 lg:px-32 bg-[#ECF0F1]">
      <div className="text-center mb-16">
        <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Getting quality healthcare has never been easier. Start in 4 simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-white rounded-xl p-8 h-full shadow-sm border border-[#ECF0F1] hover:shadow-lg transition-shadow">
              {/* Step Number Badge */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#14A9CC] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              
              {/* Icon */}
              <div className="w-16 h-16 bg-[#ECF0F1] rounded-xl flex items-center justify-center mb-6 mx-auto">
                <step.icon className="w-8 h-8 text-[#2C3E50]" />
              </div>

              {/* Content */}
              <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-xl text-[#2C3E50] text-center mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Connector Arrow (not on last item) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <div className="w-6 h-0.5 bg-[#FFC857]"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#FFC857]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
