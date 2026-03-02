import { Shield, CheckCircle, FileText, AlertCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

interface ConsultationNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function ConsultationNotice({ isOpen, onClose, onProceed }: ConsultationNoticeProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={modalRef} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#48C9B0] to-[#7E5BA1] p-6 rounded-t-2xl relative">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-white">
                Before You Continue
              </h2>
              <p className="text-white/80 text-sm">Important information about your consultation</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Professional Interaction Notice */}
          <div className="bg-[#ECF0F1] rounded-xl p-5 border-l-4 border-[#7E5BA1]">
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#7E5BA1]" />
              You Will Be Interacting with a Licensed Health Professional
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              All doctors on MyCyber Clinics are licensed by the <strong>Medical and Dental Council of Nigeria (MDCN)</strong> and covered by the ethical standards of their profession.
            </p>
          </div>

          {/* Credentials Information */}
          <div>
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-lg text-[#2C3E50] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7E5BA1]" />
              Professional Credentials & Qualifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Before your consultation, you can view your doctor's full credentials including their MDCN registration number, qualifications, specialization, and years of practice.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We verify all doctor credentials upon hiring and re-verify them every year at license renewal.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#7E5BA1] rounded-full flex-shrink-0 mt-2"></div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our doctors are required to immediately notify us of any adverse changes in their licensure or certification status.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Ethics */}
          <div className="bg-[#ECF0F1] rounded-xl p-5">
            <h3 className="font-['Univa_Nova',sans-serif] font-semibold text-base text-[#2C3E50] mb-2">
              Professional Ethical Standards
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              All health professionals on our platform adhere to professional ethical principles appropriate to their profession and comply with Nigerian Medical and Dental Council regulations and jurisdictional licensure requirements.
            </p>
          </div>

          {/* Important Reminders */}
          <div className="bg-[#ECF0F1] border-l-4 border-[#14A9CC] rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#14A9CC] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#2C3E50] mb-2">Important Reminders</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>This is not an emergency service. For emergencies, call 112 or visit your nearest ER.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>Your health information is encrypted and protected per international privacy standards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold">•</span>
                    <span>Consultations are for medical advice and prescriptions. Follow-up care may be recommended.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onProceed}
              className="flex-1 bg-[#7E5BA1] hover:bg-[#48C9B0] text-white py-6"
            >
              I Understand, Proceed to Book
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#2C3E50] text-[#2C3E50] hover:bg-[#48C9B0] hover:text-white py-6"
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center italic">
            By proceeding, you acknowledge that you have read and understand this information about interacting with licensed health professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
