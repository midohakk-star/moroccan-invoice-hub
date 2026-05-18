import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button, Field, Input, Select } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
];

type Profile = "freelance" | "company" | "accountant";

function RegisterPage() {
  const { lang } = useI18n();
  const nav = useNavigate();
  const tr = (fr: string, ar: string) => (lang === "ar" ? ar : fr);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirm: "",
  });
  const [profile, setProfile] = useState<Profile>("freelance");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = tr("Requis", "مطلوب");
    if (!form.lastName) e.lastName = tr("Requis", "مطلوب");
    if (!form.email) e.email = tr("Requis", "مطلوب");
    if (!form.city) e.city = tr("Requis", "مطلوب");
    if (form.password.length < 8)
      e.password = tr("Minimum 8 caractères", "8 أحرف على الأقل");
    if (form.password !== form.confirm)
      e.confirm = tr("Les mots de passe ne correspondent pas", "كلمتا المرور غير متطابقتين");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, profile }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { errors?: Record<string, string> };
        if (data?.errors) setErrors(data.errors);
        return;
      }
      const data = await res.json().catch(() => ({}) as { token?: string });
      if (data?.token && typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      nav({ to: "/" });
    } finally {
      setLoading(false);
    }
  };

  const profiles: { key: Profile; fr: string; ar: string }[] = [
    { key: "freelance", fr: "Professionnel indépendant", ar: "مستقل" },
    { key: "company", fr: "Représentant d'une société", ar: "ممثل شركة" },
    { key: "accountant", fr: "Expert-comptable", ar: "محاسب" },
  ];

  return (
    <AuthLayout
      title={tr("Créer un compte", "إنشاء حساب")}
      subtitle={tr("Rejoignez InvoicePro", "انضم إلى InvoicePro")}
      footer={
        <span className="text-muted-foreground">
          {tr("Déjà un compte ?", "لديك حساب؟")}{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            {tr("Se connecter", "تسجيل الدخول")}
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("Prénom", "الاسم الشخصي")} error={errors.firstName}>
            <Input required value={form.firstName} onChange={upd("firstName")} />
          </Field>
          <Field label={tr("Nom", "الاسم العائلي")} error={errors.lastName}>
            <Input required value={form.lastName} onChange={upd("lastName")} />
          </Field>
        </div>
        <Field label="Email" error={errors.email}>
          <Input type="email" required value={form.email} onChange={upd("email")} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={tr("Téléphone", "الهاتف")}>
            <Input type="tel" value={form.phone} onChange={upd("phone")} />
          </Field>
          <Field label={tr("Ville", "المدينة")} error={errors.city}>
            <Select required value={form.city} onChange={upd("city")}>
              <option value="">—</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div>
          <label className="label-eyebrow block mb-1.5">
            {tr("Type de profil", "نوع الملف")}
          </label>
          <div className="grid grid-cols-1 gap-2">
            {profiles.map((p) => {
              const active = profile === p.key;
              return (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => setProfile(p.key)}
                  className={`text-start rounded-md border px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "border-primary bg-primary-soft text-primary font-medium"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`h-3.5 w-3.5 rounded-full border ${
                        active ? "border-primary bg-primary" : "border-input"
                      }`}
                    />
                    {tr(p.fr, p.ar)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Field label={tr("Mot de passe", "كلمة المرور")} error={errors.password}>
          <Input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={upd("password")}
            autoComplete="new-password"
          />
        </Field>
        <Field label={tr("Confirmer le mot de passe", "تأكيد كلمة المرور")} error={errors.confirm}>
          <Input
            type="password"
            required
            value={form.confirm}
            onChange={upd("confirm")}
            autoComplete="new-password"
          />
        </Field>

        <p className="text-xs text-muted-foreground">
          {tr(
            "En créant un compte, vous acceptez nos conditions d'utilisation.",
            "بإنشاء حساب، أنت توافق على شروط الاستخدام.",
          )}
        </p>

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {tr("Créer mon compte", "إنشاء حسابي")}
        </Button>
      </form>
    </AuthLayout>
  );
}
