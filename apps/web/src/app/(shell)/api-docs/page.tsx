"use client";

import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function ApiDocsPage() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const docsPath = mounted && resolvedTheme === "dark" ? "/docs/dark" : "/docs";

  return (
    <iframe
      key={docsPath}
      src={`${API_URL}${docsPath}`}
      className="flex-1 border-0"
      title="API Documentation"
    />
  );
}
