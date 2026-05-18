import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { t, lang, setLang, dir } = useI18n();
  return (
    <div
      dir={dir}
      className="min-h-screen w-full bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-10"
    >
      <div className="absolute top-4 end-4 flex gap-1 text-xs rounded-md border border-border bg-card p-1">
        <button
          onClick={() => setLang("fr")}
          className={`px-2 py-1 rounded ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          FR
        </button>
        <button
          onClick={() => setLang("ar")}
          className={`px-2 py-1 rounded ${lang === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          AR
        </button>
      </div>
      <div className="w-full max-w-[480px] bg-white rounded-lg shadow-sm border border-border p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="relative">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {t("appName")}
            </span>
            <span className="absolute -top-0.5 -right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-foreground text-center">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground text-center">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>
    </div>
  );
}
