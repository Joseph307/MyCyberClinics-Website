import { useEffect } from "react";

export function useNoIndexMeta() {
  useEffect(() => {
    const previous = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = previous?.getAttribute("content") ?? null;

    let robotsMeta = previous;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute("content", "noindex, nofollow, noarchive");

    return () => {
      if (!robotsMeta) {
        return;
      }
      if (previousContent) {
        robotsMeta.setAttribute("content", previousContent);
      } else {
        robotsMeta.remove();
      }
    };
  }, []);
}
