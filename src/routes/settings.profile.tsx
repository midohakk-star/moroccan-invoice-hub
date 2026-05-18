import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/settings/profile")({ component: ProfilePage });

function ProfilePage() {
  const { t, lang, setLang } = useI18n();
  return (
    <AppShell>
      <PageHeader title={lang === "ar" ? "الملف الشخصي" : "Profil utilisateur"} />
      <form className="space-y-5 max-w-3xl">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "صورة الملف" : "Photo de profil"}</h3>
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">YA</div>
              <button type="button" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-card border border-border shadow flex items-center justify-center hover:bg-secondary"><Camera className="h-3.5 w-3.5" /></button>
            </div>
            <div className="text-sm text-muted-foreground">{lang === "ar" ? "JPG, PNG. الحد الأقصى 2MB." : "JPG, PNG. Max 2 Mo."}</div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "معلومات شخصية" : "Informations personnelles"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "الاسم الأول" : "Prénom"}><Input defaultValue="Youssef" /></Field>
            <Field label={lang === "ar" ? "الاسم العائلي" : "Nom"}><Input defaultValue="Amrani" /></Field>
            <Field label="Email"><Input type="email" defaultValue="y.amrani@invoicepro.ma" /></Field>
            <Field label={lang === "ar" ? "الهاتف" : "Téléphone"}><Input defaultValue="+212 661 22 33 44" /></Field>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "اللغة الافتراضية" : "Langue par défaut"}</h3>
          <div className="inline-flex border border-border rounded-md p-1">
            {(["fr", "ar"] as const).map((l) => (
              <button type="button" key={l} onClick={() => setLang(l)} className={`px-4 py-1.5 rounded text-sm font-medium ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "تغيير كلمة المرور" : "Changer le mot de passe"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label={lang === "ar" ? "الحالية" : "Mot de passe actuel"}><Input type="password" /></Field>
            <Field label={lang === "ar" ? "الجديدة" : "Nouveau mot de passe"}><Input type="password" /></Field>
            <Field label={lang === "ar" ? "تأكيد" : "Confirmer"}><Input type="password" /></Field>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">{lang === "ar" ? "الجلسات" : "Sessions"}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {lang === "ar"
              ? "تسجيل الخروج من كل المتصفحات والأجهزة المتصلة بحسابك."
              : "Déconnecter tous les navigateurs et appareils connectés à votre compte."}
          </p>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/v1/logout-all", { method: "POST" }).catch(() => {});
              if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
            }}
            className="text-sm font-medium text-danger hover:underline"
          >
            {lang === "ar" ? "تسجيل الخروج من جميع الأجهزة" : "Déconnexion de tous les appareils"}
          </button>
        </Card>
        <div className="flex justify-end"><Button>{t("save")}</Button></div>
      </form>
    </AppShell>
  );
}
