import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Field, Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { lang } = useI18n();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tr = (fr: string, ar: string) => (lang === "ar" ? ar : fr);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      if (res.status === 401) {
        setError(
          tr("Email ou mot de passe incorrect.", "البريد الإلكتروني أو كلمة المرور غير صحيحة."),
        );
        return;
      }
      if (!res.ok) throw new Error("Failed");
      const data = await res.json().catch(() => ({}) as { token?: string });
      if (data?.token && typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      nav({ to: "/" });
    } catch {
      setError(
        tr("Email ou mot de passe incorrect.", "البريد الإلكتروني أو كلمة المرور غير صحيحة."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={tr("Connexion", "تسجيل الدخول")}
      subtitle={tr("Bienvenue sur InvoicePro", "مرحباً بك في InvoicePro")}
      footer={
        <span className="text-muted-foreground">
          {tr("Pas de compte ?", "لا حساب؟")}{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            {tr("Créer un compte", "إنشاء حساب")}
          </Link>
        </span>
      }
    >
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm px-3 py-2">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label={tr("Mot de passe", "كلمة المرور")}>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-[color:var(--color-primary)]"
            />
            <span className="text-foreground">{tr("Se souvenir de moi", "تذكرني")}</span>
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            {tr("Mot de passe oublié ?", "نسيت كلمة المرور؟")}
          </Link>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {tr("Se connecter", "تسجيل الدخول")}
        </Button>
      </form>
    </AuthLayout>
  );
}
