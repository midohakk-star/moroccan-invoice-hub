import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Field, Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";

type Search = { token?: string; email?: string };

export const Route = createFileRoute("/reset-password")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    token: typeof s.token === "string" ? s.token : undefined,
    email: typeof s.email === "string" ? s.email : undefined,
  }),
  component: ResetPage,
});

function ResetPage() {
  const { lang } = useI18n();
  const tr = (fr: string, ar: string) => (lang === "ar" ? ar : fr);
  const { token, email } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError(tr("Minimum 8 caractères.", "8 أحرف على الأقل."));
      return;
    }
    if (password !== confirm) {
      setError(tr("Les mots de passe ne correspondent pas.", "كلمتا المرور غير متطابقتين."));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });
      if (!res.ok) {
        setError(tr("Lien invalide ou expiré.", "الرابط غير صالح أو منتهي."));
        return;
      }
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={tr("Nouveau mot de passe", "كلمة مرور جديدة")}>
      {done ? (
        <div className="space-y-4">
          <div className="rounded-md bg-success/10 border border-success/30 text-success text-sm px-3 py-2.5">
            {tr("Mot de passe réinitialisé.", "تم إعادة تعيين كلمة المرور.")}
          </div>
          <Link
            to="/login"
            className="inline-flex w-full items-center justify-center h-10 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover"
          >
            {tr("Se connecter", "تسجيل الدخول")}
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm px-3 py-2">
              {error}
            </div>
          )}
          <Field label={tr("Nouveau mot de passe", "كلمة المرور الجديدة")}>
            <Input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field label={tr("Confirmer le mot de passe", "تأكيد كلمة المرور")}>
            <Input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </Field>
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {tr("Réinitialiser", "إعادة تعيين")}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
