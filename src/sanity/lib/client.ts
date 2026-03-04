import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityProjectId = "mhgdyq41";
export const sanityDataset = "production";
export const sanityApiVersion = "2026-03-02";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  // Use CDN in production for faster reads, but disable in development so newly
  // published documents appear immediately while developing.
  useCdn: process.env.NODE_ENV === "production",
});

// Helper to build image URLs from Sanity image objects or asset refs.
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  try {
    return builder.image(source).url();
  } catch (e) {
    return undefined;
  }
}
