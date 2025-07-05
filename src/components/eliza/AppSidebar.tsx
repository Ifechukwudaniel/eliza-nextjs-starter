"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { SquarePenIcon, PanelLeftIcon, PanelRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LandingChatSessions } from "@/components/landing-chat-sessions";
import { ElizaLogo } from "@/components/assets";

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`flex flex-col h-full border-r border-[#ffffff20] bg-muted transition-all duration-300 overflow-hidden z-40 pl-1 bg-black ${
        isExpanded ? "w-80" : "w-15"
      }`}
    >
      <div className="p-2 flex justify-between">
        <Button
          className="border-zinc-950/10 h-9 border bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
          outline
        >
          {!isExpanded ? (
            <PanelRightIcon className="h-4 w-4" />
          ) : (
            <ElizaLogo className="h-4 w-4" />
          )}
        </Button>
        <Button
          className="border-zinc-950/10 h-9 border bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
          outline
        > 
          <PanelLeftIcon className="h-4 w-4" />
        </Button>
      </div>

      {isExpanded && (
        <ScrollArea className="flex-1 px-2 mt-4">
          <Button
            outline
            className="w-full justify-start my-2 font-base border-none"
            onClick={() => router.push("/")}
          >
            <SquarePenIcon className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <div className="mt-4 space-y-2">
            <Suspense fallback={<div className="text-sm p-2">Loading...</div>}>
              <LandingChatSessions />
            </Suspense>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AppSidebar;
