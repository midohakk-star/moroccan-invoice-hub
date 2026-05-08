import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
  secondary: "bg-card border border-primary text-primary hover:bg-primary-soft",
  outline: "bg-card border border-border text-foreground hover:bg-secondary",
  danger: "bg-danger text-danger-foreground hover:opacity-90",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type StatusKey =
  | "draft"
  | "sent"
  | "accepted"
  | "paid"
  | "cancelled"
  | "overdue"
  | "expired"
  | "active"
  | "neutral";

const statusStyles: Record<StatusKey, { fr: string; ar: string; cls: string }> = {
  draft: { fr: "Brouillon", ar: "مسودة", cls: "bg-muted text-muted-foreground" },
  sent: { fr: "Envoyé", ar: "مرسل", cls: "bg-info/10 text-info" },
  accepted: { fr: "Accepté", ar: "مقبول", cls: "bg-success/10 text-success" },
  paid: { fr: "Payé", ar: "مدفوع", cls: "bg-primary/10 text-primary" },
  cancelled: { fr: "Annulé", ar: "ملغى", cls: "bg-danger/10 text-danger" },
  overdue: { fr: "En retard", ar: "متأخر", cls: "bg-destructive/10 text-destructive" },
  expired: { fr: "Expiré", ar: "منتهي", cls: "bg-warning/10 text-warning" },
  active: { fr: "Actif", ar: "نشط", cls: "bg-success/10 text-success" },
  neutral: { fr: "—", ar: "—", cls: "bg-muted text-muted-foreground" },
};

export function StatusBadge({ status, lang }: { status: StatusKey; lang: "fr" | "ar" }) {
  const s = statusStyles[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${s.cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 rtl:mr-0 rtl:ml-1.5" />
      {s[lang]}
    </span>
  );
}

export function Input({
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground ${className}`}
      {...rest}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[88px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 ${props.className ?? ""}`}
    />
  );
}

export function Select({
  className = "",
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <label className={`label-eyebrow block mb-1.5 ${className}`}>{children}</label>
  );
}

export function Field({
  label,
  children,
  hint,
  error,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`h-6 w-11 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-input"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}
