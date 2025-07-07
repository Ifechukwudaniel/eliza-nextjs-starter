import { useEffect, useState } from "react";

interface ChatSession {
  id: string;
  title: string;
  messageCount: number;
  lastActivity: string;
  preview: string;
  isFromAgent: boolean;
  channelId?: string;
}

export const useChatSessions = (userId: string | null) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/chat-sessions?userId=${encodeURIComponent(userId)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch chat sessions");
        }

        setSessions(data.data?.sessions || []);
      } catch (err) {
        console.error("[ChatSessions] Error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load chat sessions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  return { sessions, loading, error };
};
