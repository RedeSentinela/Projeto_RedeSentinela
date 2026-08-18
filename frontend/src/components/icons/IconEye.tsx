import type { SVGProps } from "react";

interface IconEyeProps extends SVGProps<SVGSVGElement> {
  /** true = render the "hidden" (slashed) variant, e.g. when a password is masked */
  off?: boolean;
}

export default function IconEye({ off = false, ...props }: IconEyeProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      {off && <path d="M4 4 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}
