import { Suspense } from "react";

import { Footer } from "@/components/footer";
import { LandingTextarea } from "@/components/landing-textarea";

import AppSidebar from "@/components/eliza/AppSidebar";

export default function Page() {
  return (
    <main className="flex h-screen w-full overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col justify-center items-center gap-8 px-4 md:px-0 overflow-y-auto">
        <h1 className="text-3xl xl:text-4xl font-semibold text-center tracking-tighter text-pretty mt-8">
          Ask anything about Eliza
        </h1>

        <div className="max-w-xl mx-auto w-full">
          <Suspense fallback={null}>
            <LandingTextarea />
          </Suspense>
        </div>

        <Footer />
      </div>
    </main>
  );
}
