import type { ReactNode } from "react";

interface RevealProps {
  className?: string;
  children: ReactNode;
}

/** 纯容器：保留 .reveal 的定位上下文，但不再做跟随指针的高光。 */
export function Reveal({ className = "", children }: RevealProps) {
  return <div className={`reveal ${className}`.trim()}>{children}</div>;
}
