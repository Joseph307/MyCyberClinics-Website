import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Shield } from "lucide-react";
import logoImage from "../../assets/log_oo-removebg-cropped.png";

export function Footer() {
  return (
    <footer className="bg-[#48C9B0] text-white py-16 px-6 lg:px-32" role="contentinfo">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center mb-4">
            <Image
              src={logoImage}
              alt="MyCyber Clinics - Healthcare meets Technology"
              sizes="(min-width: 1024px) 280px, 220px"
              className="h-18 lg:h-22 w-auto"
            />
          </Link>
          <p className="text-base text-white/80 mb-6 leading-relaxed">
            Accessible, affordable, quality healthcare for Nigeria
          </p>
          <div className="flex gap-3" role="list" aria-label="Social media links">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-[#14A9CC] transition-colors"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="w-5 h-5 text-white" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-[#14A9CC] transition-colors"
              aria-label="Visit our Twitter page"
            >
              <Twitter className="w-5 h-5 text-white" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center hover:bg-[#14A9CC] transition-colors"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="w-5 h-5 text-white" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Services */}
        <nav aria-labelledby="footer-services">
          <h4 id="footer-services" style={{ fontFamily: "var(--font-display, var(--font-sans))" }} className="font-semibold text-xl text-white mb-4">
            Services
          </h4>
          <ul className="space-y-3 text-base text-white/80">
            <li>
              <a href="#how-it-works" className="hover:text-[#FFC857] transition-colors">
                How it Works
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#FFC857] transition-colors">
                Our Services
              </a>
            </li>
            <li>
              <a href="#plans" className="hover:text-[#FFC857] transition-colors">
                Pricing Plans
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-[#FFC857] transition-colors">
                Find a Doctor
              </a>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#FFC857] transition-colors">
                Health Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company */}
        <nav aria-labelledby="footer-company">
          <h4 id="footer-company" style={{ fontFamily: "var(--font-display, var(--font-sans))" }} className="font-semibold text-xl text-white mb-4">
            Company
          </h4>
          <ul className="space-y-3 text-base text-white/80">
            <li>
              <a href="#about" className="hover:text-[#FFC857] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-[#FFC857] transition-colors">
                Our Team
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#FFC857] transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC857] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC857] transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "var(--font-display, var(--font-sans))" }} className="font-semibold text-xl text-white mb-4">
            Contact
          </h4>
          <div className="space-y-4">
            <a
              href="mailto:support@mycyberclinics.com"
              className="flex items-center gap-2 text-base text-white/80 hover:text-[#FFC857] transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>support@mycyberclinics.com</span>
            </a>
            <div className="bg-[#14A9CC]/20 border border-[#14A9CC]/35 backdrop-blur rounded-lg p-4" role="note" aria-label="Emergency notice">
              <p className="text-sm text-white font-semibold mb-2">Emergency?</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Call 112 or visit your nearest ER. This is not an emergency service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <p className="text-base text-white/80">
            © 2026 MyCyber Clinics. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-base text-white/80">
            <a href="#" className="hover:text-[#FFC857] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FFC857] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#FFC857] transition-colors">
              URAC Standards
            </a>
          </div>
        </div>

        {/* URAC Compliance Notice */}
        <div className="bg-[#2C3E50]/25 backdrop-blur rounded-lg p-6 border border-white/20 mb-6">
          <h5 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FFC857]" />
            Health Professional Standards Compliance
          </h5>
          <p className="text-sm text-white leading-relaxed mb-3">
            <strong>URAC HWS-HPI Standards:</strong> MyCyber Clinics adheres to Health Professional Interaction standards. We verify the current licensure and certification of all health professionals through the Medical and Dental Council of Nigeria (MDCN). Credentials are verified upon hire and re-verified every year at license renewal.
          </p>
          <p className="text-sm text-white leading-relaxed">
            All health professionals on our platform are required to notify us immediately of any adverse changes in licensure or certification status. We implement systems to ensure adherence to professional ethical principles and provide users with transparent information about credentials, licenses, and qualifications before any consultation.
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-[#2C3E50]/25 backdrop-blur rounded-lg p-6 border border-white/20">
          <h5 className="text-base font-semibold text-white mb-3">
            Medical Disclaimer & Privacy Notice
          </h5>
          <p className="text-sm text-white leading-relaxed mb-3">
            The information provided on this platform is for informational purposes only and does
            not constitute medical advice. Always seek the advice of your physician or other
            qualified health provider with any questions you may have regarding a medical
            condition.
          </p>
          <p className="text-sm text-white leading-relaxed">
            <strong>Privacy & Data Protection:</strong> We are committed to protecting your health
            information in accordance with international privacy standards. Your data is encrypted
            and stored securely. We do not sell or share your personal health information with
            third parties without your explicit consent.
          </p>
        </div>
      </div>
    </footer>
  );
}
