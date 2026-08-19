import type { InputHTMLAttributes, ReactNode } from "react";
import "./field.css";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  label: string;
  rightSlot?: ReactNode;
}


export default function Field({ icon, label, rightSlot, ...inputProps }: FieldProps) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="field__box">
        <span className="field__icon">{icon}</span>
        <input className="field__input" {...inputProps} />
        {rightSlot && <span className="field__action">{rightSlot}</span>}
      </span>
    </label>
  );
}
