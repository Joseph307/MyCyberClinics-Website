import Image from "next/image";
import { MessageCircle, Calendar, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import ChiomaChatImage from "../../assets/chioma-chat.png";

const features = [
  {
    icon: MessageCircle,
    title: "24/7 Health Guidance",
    description: "Ask CHIOMA about symptoms, medications, or general health questions anytime"
  },
  {
    icon: Calendar,
    title: "Booking Assistance",
    description: "Let CHIOMA help you find the right doctor and schedule appointments quickly"
  },
  {
    icon: BookOpen,
    title: "Health Education",
    description: "Learn about conditions, treatments, and preventive care through simple conversations"
  }
];

export function ChiomaSection() {
  return (
    <section className="py-12 px-4 lg:py-20 lg:px-32 bg-white" aria-labelledby="chioma-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column - Chat Image (replaces live demo) */}
        <div className="relative flex justify-center items-center lg:justify-center">
          <Image
            src={ChiomaChatImage}
            alt="CHIOMA chat screenshot"
            priority={false}
            sizes="(min-width: 1024px) 448px, 320px"
            width={448}
            height={896}
            className="w-full max-w-xs lg:max-w-md h-auto"
          />
        </div>

        {/* Right Column - Content */}
        <div>
          <h2 data-reveal id="chioma-heading" className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-6">
            Meet Chioma, Your Personal Healthcare Assistant
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Chioma helps you navigate our platform, understand symptoms, and book the right doctor for your needs. Available 24/7 to guide your healthcare journey.
          </p>

          {/* Features Grid */}
          <ul className="space-y-6 mb-8" aria-label="CHIOMA features">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    index === 0
                      ? "bg-[#14A9CC]/15"
                      : index === 1
                        ? "bg-[#FFC857]/22"
                        : "bg-[#48C9B0]/18"
                  }`}
                  aria-hidden="true"
                >
                  <feature.icon
                    className={`w-6 h-6 ${
                      index === 0
                        ? "text-[#14A9CC]"
                        : index === 1
                          ? "text-[#FFC857]"
                          : "text-[#48C9B0]"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Important Disclaimer */}
          <div className="bg-[#ECF0F1] border-l-4 border-[#14A9CC] rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#14A9CC] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#2C3E50] mb-2">Important Notice</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Chioma provides <strong>guidance and education only</strong> - not medical diagnosis or treatment. Always consult with our licensed doctors for medical advice, prescriptions, and care decisions.
                </p>
              </div>
            </div>
          </div>

          <Button asChild className="bg-[#7E5BA1] hover:bg-[#48C9B0] text-white btn-glow">
            <a href="https://app.mycyberclinics.com/signUp">Chat with Chioma</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
