import React from "react";

interface DebugPanelProps {
  agentId?: string;
  sessionId?: string;
  channelId?: string;
  userEntity?: string;
  connectionStatus?: string;
  serverStatus?: string;
  agentStatus?: string;
  inputDisabled?: boolean;
  isAgentThinking?: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  agentId,
  sessionId,
  channelId,
  userEntity,
  connectionStatus,
  serverStatus,
  agentStatus,
  inputDisabled,
  isAgentThinking,
}) => {
  const debugData = {
    "Agent ID": agentId,
    "Session ID": sessionId,
    "Channel ID": channelId,
    "User Entity": userEntity,
    Connection: connectionStatus,
    Server: serverStatus,
    "Agent Status": agentStatus,
    "Input Disabled": inputDisabled,
    "Agent Thinking": isAgentThinking,
  };

  return (
    <div className="mt-6 mb-12 p-4 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 space-y-1">
      <div className="font-medium text-zinc-500 dark:text-zinc-400 mb-2">
        Debug Info
      </div>

      {Object.entries(debugData).map(([label, value]) => (
        <div key={label}>
          {label}: <span className="font-mono">{String(value)}</span>
        </div>
      ))}
    </div>
  );
};
