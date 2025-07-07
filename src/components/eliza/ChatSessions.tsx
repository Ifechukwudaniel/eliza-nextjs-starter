"use client";

import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../LoadingSpinner";
import { formatTimeAgo } from "@/lib/time";
import { useChatSessions } from "@/hooks/useChatSessions";
import {ChevronRight} from "lucide-react";

interface ChatSessionsProps {
  userId: string | null;
  currentSessionId?: string;
  showSwitcher?: boolean;
}

export const ChatSessions = ({
  userId,
  currentSessionId,
  showSwitcher = false,
}: ChatSessionsProps) => {
  const router = useRouter();
  const { sessions, loading, error } = useChatSessions(userId);

  const filteredSessions = showSwitcher
    ? sessions.filter((s) => s.id !== currentSessionId)
    : sessions;

  if (!userId) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="text-zinc-600 dark:text-zinc-400">
            Loading chat sessions...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-300 text-sm">
          Failed to load chat sessions: {error}
        </p>
      </div>
    );
  }

  if (filteredSessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {showSwitcher
            ? "No other chat sessions found"
            : "No previous chat sessions"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3
        className={
          showSwitcher
            ? "text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3"
            : "text-xs font-semibold text-zinc-500 mb-4"
        }
      >
        {showSwitcher
          ? "Switch to another conversation:"
          : "Chats"}
      </h3>

      <div className="space-y-2">
        {filteredSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() => router.push(`/chat/${session.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const SessionCard = ({
  session,
  onClick,
}: {
  session: {
    id: string;
    title: string;
    messageCount: number;
    lastActivity: string;
    preview: string;
    isFromAgent: boolean;
  };
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-white dark:bg-zinc-950 border border-zinc-950/10 dark:border-white/10 rounded-lg p-4 hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%] transition-all duration-200"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-zinc-900 dark:text-white text-sm group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-1">
          {session.title}
        </h4>

        {session.preview && (
          <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1 line-clamp-2">
            {session.isFromAgent ? "🤖 " : ""}
            {session.preview}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            {session.messageCount} message
            {session.messageCount !== 1 ? "s" : ""}
          </span>
          <span>•</span>
          <span>{formatTimeAgo(session.lastActivity)}</span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
      </div>
    </div>
  </div>
);
