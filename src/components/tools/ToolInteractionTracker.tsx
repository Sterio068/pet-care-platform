"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface ToolInteractionTrackerProps {
  toolSlug: string;
  toolName: string;
  children: ReactNode;
}

export function ToolInteractionTracker({
  toolSlug,
  toolName,
  children,
}: ToolInteractionTrackerProps) {
  const startedRef = useRef(false);
  const resultTrackedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function trackStart(interactionType: string) {
    if (startedRef.current) return;

    startedRef.current = true;
    trackEvent("tool_start", {
      content_type: "tool",
      content_group: "tools",
      item_id: toolSlug,
      tool_name: toolName,
      interaction_type: interactionType,
    });

    timerRef.current = window.setTimeout(() => {
      if (resultTrackedRef.current) return;

      resultTrackedRef.current = true;
      trackEvent("tool_result_view", {
        content_type: "tool",
        content_group: "tools",
        item_id: toolSlug,
        tool_name: toolName,
      });
    }, 1200);
  }

  return (
    <div
      onChangeCapture={() => trackStart("change")}
      onClickCapture={() => trackStart("click")}
      onFocusCapture={() => trackStart("focus")}
      onInputCapture={() => trackStart("input")}
    >
      {children}
    </div>
  );
}
