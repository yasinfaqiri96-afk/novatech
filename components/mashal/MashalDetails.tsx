import type { ReactNode } from "react";
export default function MashalDetails({ children, label = "جزئیات کامل این بخش", enabled = true }: { children: ReactNode; label?: string; enabled?: boolean }) {
  return enabled ? <details className="mashal-details"><summary>{label}</summary><div className="mashal-details-body">{children}</div></details> : <>{children}</>;
}
