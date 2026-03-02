import { createClient } from "@sanity/client";

export const sanityProjectId = "mhgdyq41";
export const sanityDataset = "production";
export const sanityApiVersion = "2026-03-02";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
});
