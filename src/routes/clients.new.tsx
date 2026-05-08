import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input, Select, Textarea, Toggle } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { User, Briefcase, Building2 } from "lucide-react";

export const Route = createFileRoute("/clients/new")({
  component: ClientCreatePage,
});

type ClientType = "individual" | "auto" | "company";

function ClientCreatePage() {
  const { t, lang } = useI18n();
  const [type, setType] = useState<ClientType>("company");
  const [vatExempt, setVatExempt] = useState(false);

  const tabs: { key: ClientType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "individual", label: lang === "ar" ? "خاص" : "Particulier", icon: User },
    { key: "auto", label: lang === "ar" ? "مقاول ذاتي" : "Auto-entrepreneur", icon: Briefcase },
    { key: "company", label: lang === "ar" ? "شركة" : "Société", icon: Building2 },
  ];

  const showPro = type !== "individual";
  const showCompanyOnly = type === "company";

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "إنشاء عميل" : "Créer un client"}
        description={lang === "ar" ? "fr: Créer un client / ar: إنشاء عميل" : "fr: Créer un client / ar: إنشاء عميل"}
      />

      {/* Tabs */}
      <div className="border-b border-border mb-6 flex gap-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.key === type;
          return (
            <button
              key={tab.key}
              onClick={() => setType(tab.key)}
              className={`flex items-center gap-2 px-1 pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-1">{lang === "ar" ? "معلومات شخصية" : "Informations personnelles"}</h3>
          <p className="text-xs text-muted-foreground mb-5">fr: Informations personnelles / ar: معلومات شخصية</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "الاسم الأول" : "Prénom"}><Input placeholder={lang === "ar" ? "كريم" : "Karim"} /></Field>
            <Field label={lang === "ar" ? "اسم العائلة" : "Nom"}><Input placeholder={lang === "ar" ? "بنعلي" : "Benali"} /></Field>
            <Field label={lang === "ar" ? "الهاتف" : "Téléphone"}><Input placeholder="+212 6XX XX XX XX" /></Field>
            <Field label="Email"><Input type="email" placeholder="contact@exemple.ma" /></Field>
            <Field label={lang === "ar" ? "العنوان" : "Adresse"} ><Input placeholder={lang === "ar" ? "شارع..." : "Avenue..."} /></Field>
            <Field label={lang === "ar" ? "المدينة" : "Ville"}>
              <Select>
                <option>Casablanca</option>
                <option>Rabat</option>
                <option>Marrakech</option>
                <option>Tanger</option>
                <option>Fès</option>
                <option>Agadir</option>
              </Select>
            </Field>
          </div>
        </Card>

        {showPro && (
          <Card className="p-6">
            <h3 className="font-semibold mb-1">{lang === "ar" ? "معلومات مهنية" : "Informations professionnelles"}</h3>
            <p className="text-xs text-muted-foreground mb-5">fr: Informations professionnelles / ar: معلومات مهنية</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="ICE" hint={lang === "ar" ? "15 رقم" : "15 chiffres"}><Input placeholder="000000000000000" maxLength={15} /></Field>
              <Field label="IF"><Input placeholder="12345678" /></Field>
              <Field label="Patente"><Input placeholder="98765432" /></Field>
              <Field label="CNSS"><Input placeholder="1234567" /></Field>
              {showCompanyOnly && (
                <>
                  <Field label="RC"><Input placeholder="123456" /></Field>
                  <Field label={lang === "ar" ? "الشكل القانوني" : "Forme juridique"}>
                    <Select>
                      <option>SARL</option><option>SARL AU</option><option>SA</option><option>SAS</option><option>SNC</option>
                    </Select>
                  </Field>
                </>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-border space-y-4">
              <Toggle
                checked={vatExempt}
                onChange={setVatExempt}
                label={lang === "ar" ? "معفى من الضريبة (المادة 89)" : "Exonéré de TVA (Article 89)"}
              />
              {vatExempt && (
                <Field label={lang === "ar" ? "المبرر" : "Justification"}>
                  <Textarea placeholder={lang === "ar" ? "سبب الإعفاء..." : "Motif de l'exonération..."} />
                </Field>
              )}
            </div>
          </Card>
        )}

        <div className="flex items-center justify-end gap-3">
          <Link to="/clients"><Button variant="outline">{t("cancel")}</Button></Link>
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </AppShell>
  );
}
