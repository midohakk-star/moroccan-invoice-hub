import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Field, Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
});

function ForgotPage() {
  const { lang } = useI18n();
  const tr = (fr: string, ar: string) => (lang === "ar" ? ar : fr);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/v1/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout
      title={tr("Mot de passe oublié ?", "نسيت كلمة المرور؟")}
      subtitle={tr(
        "Entrez votre email pour recevoir un lien de réinitialisation.",
        "أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين.",
      )}
      footer={
        <Link to="/login" className="text-primary hover:underline">
          {tr("← Retour à la connexion", "← العودة إلى تسجيل الدخول")}
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-md bg-success/10 border border-success/30 text-success text-sm px-3 py-2.5">
          {tr(
            "Si votre email existe, un lien a été envoyé.",
            "إذا كان بريدك الإلكتروني موجوداً، تم إرسال رابط.",
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {tr("Envoyer le lien", "إرسال الرابط")}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
