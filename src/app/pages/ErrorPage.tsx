import Image from "next/image";
import Link from "next/link";
import { useRouteError, isRouteErrorResponse } from "react-router";
import { fallbackSiteSettings } from "@/sanity/lib/content";
import { Button } from "../components/ui/button";
import { Footer } from "../components/Footer";
import { AlertCircle, Home } from "lucide-react";
import logoImage from "../../assets/log_o-removebg-cropped.png";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="min-h-screen bg-white font-['Karla']" lang="en">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4" role="banner">
        <nav className="flex items-center justify-between" aria-label="Error page navigation">
          <Link to="/#home" className="flex items-center gap-3">
            <Image
              src={logoImage}
              alt="MyCyber Clinics - Healthcare meets Technology"
              sizes="(min-width: 1024px) 160px, 140px"
              className="h-14 lg:h-16 w-auto"
            />
          </Link>
        </nav>
      </header>

      <main className="py-20 px-6 lg:px-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#7D1FFF]/10 mb-6">
            <AlertCircle className="w-10 h-10 text-[#7D1FFF]" aria-hidden="true" />
          </div>

          {/* Error Status */}
          {errorStatus && (
            <h1 className="font-['Univa_Nova',sans-serif] font-bold text-6xl lg:text-7xl text-[#1C227A] mb-4">
              {errorStatus}
            </h1>
          )}

          {/* Error Title */}
          <h2 className="font-['Univa_Nova',sans-serif] font-bold text-3xl lg:text-4xl text-[#1C227A] mb-4">
            {errorStatus === 404 ? 'Page Not Found' : 'Oops! Something Went Wrong'}
          </h2>

          {/* Error Message */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {errorStatus === 404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "We're sorry for the inconvenience. Please try again or return to the homepage."}
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-sm text-gray-700 font-mono break-all">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                className="bg-[#1C227A] hover:bg-[#0F1347] text-white px-8 py-6 text-lg"
              >
                <Home className="w-5 h-5 mr-2" aria-hidden="true" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-[#7D1FFF] text-[#7D1FFF] hover:bg-[#7D1FFF] hover:text-white px-8 py-6 text-lg"
              >
                View Blog
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer siteSettings={fallbackSiteSettings} />
    </div>
  );
}
