import { Target, Eye, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const leadershipTeam = [
  {
    name: "Apham Nnaji",
    role: "Founder",
    image: "/images/team/leader-apham.jpg",
    bio: "Apham Nnaji is a proven business executive with 25 years of leadership across global operators, high-growth technology firms, and startups. He has built strong technology foundations for strategic business outcomes and collaborated with boards, customers, and leadership teams to improve enterprise performance. He is the Executive Managing Partner at Soltrite Logistics International Finance and Chairman of the Board for Nnaji Family Foundation. He holds an MBA from the University of Wales and was born in Enugu State, Nigeria.",
  },
  {
    name: "Dr. Chisom Eze",
    role: "Director of Medical Operations",
    image: "/images/team/leader-chisom.jpg",
    bio: "Dr. Chisom Eze is passionate about integrating technology into healthcare to improve patient outcomes. Trained at Enugu State University, he combines clinical experience with digital health innovation and has worked with NGOs focused on healthcare access. He also contributes to research and public health outreach in underserved communities, with a focus on building a healthcare system that is both advanced and human-centered.",
  },
  {
    name: "Dr. Orji Jeffery Chidozie",
    role: "Chief Medical Officer",
    image: "/images/team/leader-orji.jpg",
    bio: "Dr. Orji Jeffery Chidozie is an alumnus of Enugu State University College of Medicine, where he also completed housemanship, and later served at the Federal Road Safety Clinic, Abuja. He is focused on using technology to address healthcare access challenges in Nigeria and across Africa, and believes Nigeria's strong, tech-savvy youth population can help drive healthcare transformation.",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 px-6 lg:px-32 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
            About MyCyber Clinics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to make quality healthcare accessible to every Nigerian, regardless of location or income level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-[#ECF0F1] rounded-2xl p-8 text-center border border-[#14A9CC]/30">
            <div className="w-16 h-16 bg-[#14A9CC] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-2xl text-[#2C3E50] mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To revolutionize healthcare delivery in Nigeria by leveraging technology to connect patients with qualified doctors instantly, affordably, and securely.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#ECF0F1] rounded-2xl p-8 text-center border border-[#48C9B0]/30">
            <div className="w-16 h-16 bg-[#48C9B0] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-2xl text-[#2C3E50] mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A Nigeria where every person has immediate access to professional medical care, where distance and cost are no longer barriers to health and wellbeing.
            </p>
          </div>

          {/* Values */}
          <div className="bg-[#ECF0F1] rounded-2xl p-8 text-center border border-[#FFC857]/40">
            <div className="w-16 h-16 bg-[#FFC857] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-2xl text-[#2C3E50] mb-4">
              Our Values
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Patient-first care, transparent pricing, verified professionals, data security, and continuous innovation in healthcare delivery.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-[#48C9B0] rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="font-['Univa_Nova',sans-serif] font-bold text-3xl mb-6">
            Why We Built MyCyber Clinics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-white/90 leading-relaxed mb-4">
                Healthcare in Nigeria faces critical challenges: long wait times at clinics, high consultation costs, limited access to specialists, and the burden of traveling long distances for basic medical advice.
              </p>
              <p className="text-white/90 leading-relaxed">
                We saw families struggling to afford quality healthcare and professionals too busy to visit a clinic during work hours. We knew technology could bridge this gap.
              </p>
            </div>
            <div>
              <p className="text-white/90 leading-relaxed mb-4">
                MyCyber Clinics was founded by healthcare professionals and technology experts who believe that every Nigerian deserves access to quality medical care—instantly, affordably, and from the comfort of home.
              </p>
              <p className="text-white/90 leading-relaxed">
                Today, we&apos;re proud to serve thousands of patients across Nigeria, connecting them with licensed doctors 24/7.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="font-['Univa_Nova',sans-serif] font-bold text-3xl lg:text-4xl text-[#2C3E50] mb-3">
              Meet the Teams Behind the Vision
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Leadership and clinical professionals working to transform healthcare delivery in Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <article
                key={member.name}
                className="bg-[#ECF0F1] rounded-2xl border border-[#7E5BA1]/20 overflow-hidden"
              >
                <div className="w-full h-72 bg-white p-4">
                  <ImageWithFallback
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-contain object-center"
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                    loading="eager"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#7E5BA1] font-semibold mb-2">
                    {member.role}
                  </p>
                  <h4 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#2C3E50] mb-3">
                    {member.name}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



