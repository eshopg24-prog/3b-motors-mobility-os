import type React from "react";

export type FormFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly helperText?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly children: React.ReactNode;
};

export function FormField({ children, error, helperText, id, label, required = false }: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {helperText ? (
        <p className="form-field__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="form-field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
