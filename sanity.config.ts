import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./src/sanity/schemaTypes";
import shareToBuffer from "./src/sanity/plugins/share-to-buffer";

// Note: this file is intentionally minimal. The share-to-buffer plugin adds a
// Studio tool which lets editors share blog posts to Buffer using the Next API
// endpoint at `/api/share-to-buffer`.
export default defineConfig({
  name: "default",
  title: "MyCyberClinics",
  projectId: "mhgdyq41",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool(), shareToBuffer()],
  schema: {
    types: schemaTypes,
  },
});
