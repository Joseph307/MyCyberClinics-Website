"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the client-only BlogPostPage; this runs only in the browser.
const BlogPostPage = dynamic(() => import("@/app/pages/BlogPostPage"), { ssr: false });

export default function BlogPostClientWrapper() {
  return <BlogPostPage />;
}
