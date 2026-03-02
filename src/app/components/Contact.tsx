import { Button } from "./ui/button";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 lg:px-32 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 data-reveal id="contact-heading" className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions? We&apos;re here to help. Reach out to our support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <h3 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#2C3E50] mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#7E5BA1]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Email Us</h4>
                  <a
                    href="mailto:support@mycyberclinics.com"
                    className="text-gray-600 hover:text-[#14A9CC] transition-colors"
                  >
                    support@mycyberclinics.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FFC857]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Call Us</h4>
                  <a
                    href="tel:+2348012345678"
                    className="text-gray-600 hover:text-[#14A9CC] transition-colors"
                  >
                    +234 801 234 5678
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri: 8AM - 8PM, Sat-Sun: 9AM - 5PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ECF0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#48C9B0]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Live Chat</h4>
                  <p className="text-gray-600">Chat with Chioma, our AI healthcare assistant</p>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7 for instant support</p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-[#ECF0F1] border-l-4 border-[#14A9CC] rounded-lg p-5" role="alert">
              <h4 className="font-semibold text-[#2C3E50] mb-2 flex items-center gap-2">
                <span className="text-[#14A9CC]" aria-hidden="true">⚠️</span>
                Emergency?
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                For medical emergencies, please call <strong>112</strong> or visit your nearest emergency room. MyCyber Clinics is not an emergency service.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#7E5BA1] text-white rounded-2xl p-8 self-start">
            <h3 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-white mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-white mb-2">
                  Full Name <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white"
                  placeholder="Enter your full name"
                  aria-required="true"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-white mb-2">
                  Email Address <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white"
                  placeholder="your.email@example.com"
                  aria-required="true"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white"
                  placeholder="+234 800 000 0000"
                />
                <p className="text-xs text-white/80 mt-1">Format: +234 followed by your number</p>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-white mb-2">
                  Subject <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white"
                  placeholder="How can we help?"
                  aria-required="true"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-white mb-2">
                  Message <span className="text-[#FFC857]" aria-label="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#ECF0F1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E5BA1] bg-white resize-none"
                  placeholder="Tell us more about your inquiry..."
                  aria-required="true"
                ></textarea>
                <p className="text-xs text-white/80 mt-1">Please do not include any personal health information</p>
              </div>

              {/* Privacy Notice */}
              <div className="bg-white rounded-lg p-4 text-xs text-gray-600">
                <p className="leading-relaxed">
                  By submitting this form, you agree to our <a href="#" className="text-[#14A9CC] hover:underline">Privacy Policy</a>. We&apos;ll only use your information to respond to your inquiry and won&apos;t share it with third parties.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#48C9B0] hover:bg-[#14A9CC] text-white py-4 text-lg btn-glow btn-pulse"
                aria-label="Send message"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


