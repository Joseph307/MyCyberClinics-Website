import { useEffect } from "react";
import Head from "next/head";

// Client-side redirect page for legacy `/blog/author/[author]` routes.
// We avoid getServerSideProps so the site can be exported as static HTML.
export default function AuthorRedirect() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // Extract the last path segment as the author slug
      const parts = window.location.pathname.split("/").filter(Boolean);
      const author = parts[parts.length - 1] || "";
      const dest = `/authors/${encodeURIComponent(author)}`;
      // Use replace so history isn't polluted
      window.location.replace(dest);
    } catch (e) {
      // no-op
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div aria-hidden="true" />
    </>
  );
}
