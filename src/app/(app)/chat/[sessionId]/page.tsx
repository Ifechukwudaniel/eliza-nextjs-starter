import { Suspense } from "react";

import { Chat } from "@/components/eliza/ChatSimple";

interface ChatPageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { sessionId } = await params;

  return (
    <Suspense fallback={null}>
      <Chat sessionId={sessionId} />
    </Suspense>
  );
}
