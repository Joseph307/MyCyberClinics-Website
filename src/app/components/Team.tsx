import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Stethoscope, Award, Heart, Shield, CheckCircle } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Adaeze Okonkwo",
    role: "General Practitioner",
    specialty: "Family Medicine",
    mdcn: "MDCN/2015/48392",
    qualifications: "MBBS, MPH",
    experience: "8 years",
    image: "/images/team/doctor-adaeze.jpg",
    altText: "Dr. Adaeze Okonkwo, General Practitioner specializing in Family Medicine with 8 years of experience"
  },
  {
    name: "Dr. Chinedu Eze",
    role: "Consultant Physician",
    specialty: "Internal Medicine",
    mdcn: "MDCN/2012/35187",
    qualifications: "MBBS, FWACP",
    experience: "12 years",
    image: "/images/team/doctor-chinedu.jpg",
    altText: "Dr. Chinedu Eze, Consultant Physician specializing in Internal Medicine with 12 years of experience"
  },
  {
    name: "Dr. Oluwaseun Adeleke",
    role: "Specialist",
    specialty: "Dermatology",
    mdcn: "MDCN/2010/29456",
    qualifications: "MBBS, FMCDS",
    experience: "14 years",
    image: "/images/team/doctor-oluwaseun.jpg",
    altText: "Dr. Oluwaseun Adeleke, Dermatology Specialist with 14 years of experience"
  }
];

export function Team() {
  return (
    <section id="team" className="py-20 px-6 lg:px-32 bg-white" aria-labelledby="team-heading">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[#ECF0F1] px-4 py-2 rounded-full mb-4">
          <Shield className="w-5 h-5 text-[#7E5BA1]" />
          <span className="text-sm font-semibold text-[#2C3E50]">
            All Credentials Verified
          </span>
        </div>
          <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
          Featured Doctors
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Meet our dedicated healthcare professionals. All licensed by the Medical and Dental Council of Nigeria (MDCN).
        </p>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border-2 border-[#ECF0F1] hover:border-[#14A9CC] hover:shadow-xl transition-all"
          >
            <div className="h-64 overflow-hidden relative">
              <ImageWithFallback
                src={member.image}
                alt={member.altText}
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                loading={index < 3 ? "eager" : "lazy"}
              />
              {/* Verification Badge */}
              <div className="absolute top-4 right-4 bg-[#14A9CC] text-white px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Verified</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-['Univa_Nova',sans-serif] font-bold text-xl text-[#2C3E50] mb-2">
                {member.name}
              </h3>
              <p className="text-[#14A9CC] font-semibold mb-1">{member.role}</p>
              <p className="text-sm text-gray-600 mb-4">{member.specialty}</p>

              {/* Professional Credentials */}
              <div className="bg-[#ECF0F1] rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#2C3E50]">MDCN License:</span>
                  <span className="text-xs text-gray-700">{member.mdcn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#2C3E50]">Qualifications:</span>
                  <span className="text-xs text-gray-700">{member.qualifications}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#2C3E50]">Experience:</span>
                  <span className="text-xs text-gray-700">{member.experience}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">
                Credentials verified and updated regularly per URAC standards
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Interaction Notice */}
      <div className="bg-[#ECF0F1] border-l-4 border-[#FFC857] rounded-lg p-6 mb-12">
        <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-3">
          Before Your Consultation
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          You will be informed that you are interacting with a licensed health professional covered by the ethical standards of their profession. You can view their full credentials, professional licenses, and qualifications before booking your appointment.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          All our doctors adhere to professional ethical principles appropriate to their profession and comply with Nigerian Medical and Dental Council regulations.
        </p>
      </div>

      {/* Team Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#7E5BA1] rounded-2xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-xl mb-3">
            Expert Care
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            Board-certified physicians with years of experience in their respective fields
          </p>
        </div>

        <div className="bg-[#FFC857] rounded-2xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-xl mb-3">
            MDCN Licensed
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            All doctors licensed by the Medical and Dental Council of Nigeria, verified every year
          </p>
        </div>

        <div className="bg-[#14A9CC] rounded-2xl p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-xl mb-3">
            Ethical Standards
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            Bound by professional ethics and Nigerian medical practice regulations
          </p>
        </div>
      </div>
    </section>
  );
}

