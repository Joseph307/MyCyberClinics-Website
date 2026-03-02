import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mycyberclinics.com"), 
  title: "MyCyber Clinics | 24/7 Telehealth in Nigeria",
  description:
    "MyCyber Clinics connects you to verified Nigerian doctors for fast, affordable telehealth consultations and continuous care.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://mycyberclinics.com/",
    siteName: "MyCyber Clinics",
    title: "MyCyber Clinics | 24/7 Telehealth in Nigeria",
    description:
      "Get instant access to verified Nigerian doctors, digital prescriptions, and transparent healthcare pricing.",
    images: [
      {
        url: "https://mycyberclinics.com/images/team/doctor-adaeze.jpg",
        width: 1200,
        height: 630,
        alt: "MyCyber Clinics telehealth services in Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCyber Clinics | 24/7 Telehealth in Nigeria",
    description:
      "Affordable telehealth in Nigeria with verified doctors and 24/7 access.",
    images: ["https://mycyberclinics.com/images/team/doctor-adaeze.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
