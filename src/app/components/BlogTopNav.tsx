"use client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "../../assets/log_o-removebg-cropped.png";
import React from "react";

export default function BlogTopNav() {
  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") window.location.href = "/";
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4"
      role="banner"
    >
      <nav className="flex items-center justify-between" aria-label="Blog navigation">
        <a href="/" onClick={navigateHome} className="flex items-center gap-3">
          <Image
            src={logoImage}
            alt="MyCyber Clinics - Healthcare meets Technology"
            sizes="(min-width: 1024px) 160px, 140px"
            className="h-14 lg:h-16 w-auto"
          />
        </a>

        <Button variant="nav" className="btn-glow" asChild>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") window.location.href = "/";
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Home
          </a>
        </Button>
      </nav>
    </header>
  );
}
