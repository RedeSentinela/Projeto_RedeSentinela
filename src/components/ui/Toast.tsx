import "./toast.css";

interface ToastProps {
  /** Message to display. When empty/undefined, nothing renders. */
  text: string;
}

/** Small floating confirmation message (e.g. "Conta criada!"). */
export default function Toast({ text }: ToastProps) {
  if (!text) return null;
  return <div className="toast">{text}</div>;
}
