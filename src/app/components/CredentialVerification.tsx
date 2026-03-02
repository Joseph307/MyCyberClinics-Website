import { Shield, CheckCircle, FileCheck, AlertCircle } from "lucide-react";

export function CredentialVerification() {
  return (
    <section className="py-20 px-6 lg:px-32 bg-white border-y border-[#ECF0F1]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ECF0F1] px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5 text-[#7E5BA1]" />
            <span className="text-sm font-semibold text-[#2C3E50]">
              URAC Health Professional Standards
            </span>
          </div>
          <h2 data-reveal className="font-['Univa_Nova',sans-serif] font-bold text-3xl lg:text-4xl text-[#2C3E50] mb-4">
            Verified Health Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All medical professionals on our platform meet strict qualification and licensing requirements
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#ECF0F1] rounded-xl p-6 border-l-4 border-[#14A9CC]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-[#14A9CC]" />
              </div>
              <div>
                <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-2">
                  Current Licensure Verified
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We verify current Medical and Dental Council of Nigeria (MDCN) licensure for all doctors. Credentials are checked upon hire and re-verified every year at license renewal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ECF0F1] rounded-xl p-6 border-l-4 border-[#FFC857]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#FFC857]" />
              </div>
              <div>
                <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-2">
                  Continuous Monitoring
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We require immediate notification of any adverse changes in licensure or certification status and implement corrective action when necessary.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ECF0F1] rounded-xl p-6 border-l-4 border-[#48C9B0]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-[#48C9B0]" />
              </div>
              <div>
                <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-2">
                  Professional Standards
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our systems enable health professionals to adhere to professional ethical principles appropriate to their profession and jurisdictional licensure requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Interaction Information */}
        <div className="bg-[#48C9B0] rounded-2xl p-8 text-white">
          <h3 className="font-['Univa_Nova',sans-serif] font-bold text-2xl mb-6">
            When You Interact with Our Health Professionals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
              <div>
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">You will see their credentials:</strong> Every doctor&apos;s profile displays their full name, MDCN registration number, specialization, qualifications, and years of practice.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
              <div>
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Professional ethics apply:</strong> All our doctors are bound by the ethical standards of their profession and Nigerian medical practice regulations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
              <div>
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Licensed professionals only:</strong> Before any consultation, you&apos;ll be informed that you are interacting with a health professional covered by their professional license.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
              <div>
                <p className="text-white/90 leading-relaxed">
                  <strong className="text-white">Verified information:</strong> We provide transparent information about each doctor&apos;s credentials, professional licenses, and qualifications before you book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
