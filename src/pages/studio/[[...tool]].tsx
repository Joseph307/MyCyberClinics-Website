import dynamic from "next/dynamic";

const EmbeddedStudio = dynamic(
  async () => {
    const [{ Studio }, { default: config }] = await Promise.all([
      import("sanity"),
      import("../../../sanity.config"),
    ]);

    return function StudioPage() {
      return <Studio config={config} basePath="/studio" />;
    };
  },
  {
    ssr: false,
    loading: () => null,
  },
);

export default function StudioRoute() {
  return <EmbeddedStudio />;
}
