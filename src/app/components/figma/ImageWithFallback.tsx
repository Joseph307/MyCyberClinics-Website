import Image from "next/image";
import React, { useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const [retryUnoptimizedSrc, setRetryUnoptimizedSrc] = useState<
    string | undefined
  >(undefined);
  const { src, alt, style, className, sizes, ...rest } = props;

  const srcValue = typeof src === "string" && src.length > 0 ? src : undefined;
  const didError = !!srcValue && failedSrc === srcValue;
  const isDataUri = !!srcValue && srcValue.startsWith("data:");
  const useUnoptimized = isDataUri || retryUnoptimizedSrc === srcValue;

  const handleError = () => {
    if (!srcValue) return;

    // Retry once with direct source loading in case Next image optimization fails.
    if (!isDataUri && retryUnoptimizedSrc !== srcValue) {
      setRetryUnoptimizedSrc(srcValue);
      return;
    }

    setFailedSrc(srcValue);
  };

  if (!srcValue || didError) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-100 text-center align-middle ${className ?? ""}`}
        style={style}
        data-original-url={srcValue}
      >
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          stroke="#000"
          strokeWidth="3.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          aria-hidden="true"
        >
          <rect x="16" y="16" width="56" height="56" rx="6" />
          <path d="M16 58 32 40 64 72" />
          <circle cx="53" cy="35" r="7" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`} style={style}>
      <Image
        src={srcValue}
        alt={alt ?? ""}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        loading={rest.loading}
        onError={handleError}
        unoptimized={useUnoptimized}
      />
    </div>
  );
}
