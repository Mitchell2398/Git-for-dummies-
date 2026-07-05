"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/loading-screen";
import { Onboarding } from "./onboarding";
import { mockData, type OnboardingData } from "@/lib/mock";

export function OnboardingFlow() {
  const params = useSearchParams();
  const slug = params.get("repo")?.trim() || "supabase/supabase";
  const [ready, setReady] = useState(false);

  // Reflect the pasted repo in the header. Prose stays the sample content
  // until the backend is wired up.
  const data = useMemo<OnboardingData>(() => {
    const [owner, name] = slug.split("/");
    if (!owner || !name) return mockData;
    return {
      ...mockData,
      repo: {
        ...mockData.repo,
        owner,
        name,
        url: `https://github.com/${owner}/${name}`,
      },
    };
  }, [slug]);

  if (!ready) {
    return <LoadingScreen repo={slug} onDone={() => setReady(true)} />;
  }

  return <Onboarding data={data} />;
}
