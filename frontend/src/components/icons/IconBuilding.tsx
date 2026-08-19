// src/components/icons/IconBuilding.tsx
import type { SVGProps } from "react";

export default function IconBuilding(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 21V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 17 5v16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 8h1M8.5 11.5h1M8.5 15h1M12.5 8h1M12.5 11.5h1M12.5 15h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 21v-3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}