"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { SquarePenIcon, PanelLeftIcon, PanelRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LandingChatSessions } from "@/components/eliza/LandingChatSessions";
import { ElizaLogo } from "@/components/assets";
import { useIsMobile } from "@/hooks/useMobile";

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const SidebarContent = (
    <div className="flex flex-col h-fullborder-r border-[#ffffff20] w-80 z-50">
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
    </div>
  );

  return (
    <>
      {!isMobile && (
        <div
          className={`transition-all duration-300 overflow-hidden bg-black border-r border-[#ffffff20] overflow-y-auto z-50 ${
            isExpanded ? "w-80" : "w-14"
          }`}
        >
          <div className="p-2 flex justify-between">
            {isExpanded && (
              <Button
                className="border-zinc-950/10 h-9 border bg-transparent"
                onClick={() => router.push("/")}
                outline
              >
                <ElizaLogo className="h-4 w-4" />
              </Button>
            )}
            <Button
              className="border-zinc-950/10 h-9 border bg-transparent"
              onClick={() => setIsExpanded(!isExpanded)}
              outline
            >
              <PanelLeftIcon className="h-4 w-4" />
            </Button>
          </div>

          {isExpanded && SidebarContent}
        </div>
      )}

      {isMobile && isExpanded && (
        <div className="fixed inset-0 z-50 bg-black border-r border-[#ffffff20] w-80 shadow-lg overflow-y-auto">
          {SidebarContent}
        </div>
      )}

      {/* 📱 Mobile Toggle Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            className="border-zinc-950/10 h-10 w-10 rounded-full border bg-muted/80 backdrop-blur-sm"
            onClick={() => setIsExpanded(!isExpanded)}
            outline
          >
            <PanelRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};

export default AppSidebar;
