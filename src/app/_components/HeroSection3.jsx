import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function HeroSection3() {
  const data = [
    {
      title: "Step 1 — Sign Up",
      content: (
        <div>
          <p className="mb-4 text-sm text-neutral-300">
            Start by creating your account on the platform. Once registered,
            you’ll gain access to your personalized dashboard where you can
            manage your repositories and integrate GitHub.
          </p>
          <div className="flex items-center justify-between gap-3">
            <img
              src="/timeline1_1.png"
              alt="landing page"
              className="h-36 w-full rounded-xl object-cover shadow-lg md:h-60"
            />
            <img
              src="/timeline1_2.png"
              alt="signin page"
              className="h-36 w-full rounded-xl object-cover shadow-lg md:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2 — Create Project",
      content: (
        <div>
          <p className="mb-4 text-sm text-neutral-300">
            After signing in, create your first project. Add your GitHub
            repository URL and configure repository tracking to start analyzing
            commits automatically.
          </p>
          <div className="flex items-center justify-between gap-3">
            <img
              src="/timeline2_1.png"
              alt="create project preview"
              className="h-36 w-full rounded-xl object-cover shadow-lg md:h-60"
            />
            <img
              src="/timeline2_2.png"
              alt="create project"
              className="h-36 w-full rounded-xl object-cover shadow-lg md:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3 — View Commit Logs",
      content: (
        <div>
          <p className="mb-4 text-sm text-neutral-300">
            Once your project is linked, view all commits fetched directly from
            GitHub. Each commit is summarized with AI-generated insights for
            better understanding of changes.
          </p>
          <img
            src="/images/commit-logs-preview.png"
            alt="Commit logs preview"
            className="h-36 w-full rounded-xl object-cover shadow-lg md:h-60"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-black" id="timeline">
      <Timeline data={data} />
    </div>
  );
}
