import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input, Select, Toggle } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Plus, Trash2, Pencil, Stamp, PenLine } from "lucide-react";

export const Route = createFileRoute("/settings/entity")({ component: EntityPage });

function EntityPage() {
  const { t, lang } = useI18n();
  const [stampOn, setStampOn] = useState(true);
  const [retentionOn, setRetentionOn] = useState(true);

  const sigs = [
    { name: "Cachet officiel", type: "stamp", isDefault: true },
    { name: "Cachet succursale", type: "stamp", isDefault: false },
    { name: "Signature DG", type: "signature", isDefault: true },
  ];

  return (
    <AppShell>
      <PageHeader title={lang === "ar" ? "إعدادات الكيان" : "Paramètres de l'entité"} />

      <form className="space-y-5">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "الهوية القانونية" : "Identité légale"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "الاسم القانوني" : "Raison sociale"}><Input defaultValue="SARL Atlas Trade" /></Field>
            <Field label={lang === "ar" ? "الاسم التجاري" : "Nom commercial"}><Input defaultValue="Atlas Trade" /></Field>
            <Field label="ICE"><Input defaultValue="001234567000045" /></Field>
            <Field label="IF"><Input defaultValue="12345678" /></Field>
            <Field label="Patente"><Input defaultValue="98765432" /></Field>
            <Field label="RC"><Input defaultValue="123456" /></Field>
            <Field label="CNSS"><Input defaultValue="1234567" /></Field>
            <Field label={lang === "ar" ? "الشكل القانوني" : "Forme juridique"}><Select><option>SARL</option><option>SA</option></Select></Field>
            <Field label={lang === "ar" ? "النظام الضريبي" : "Régime fiscal"}><Select><option>Réel</option><option>Simplifié</option></Select></Field>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "العنوان والاتصال" : "Adresse et contact"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "العنوان" : "Adresse"}><Input defaultValue="Bd Zerktouni" /></Field>
            <Field label={lang === "ar" ? "المدينة" : "Ville"}><Select><option>Casablanca</option></Select></Field>
            <Field label={lang === "ar" ? "الهاتف" : "Téléphone"}><Input defaultValue="+212 522 33 44 55" /></Field>
            <Field label="Email"><Input defaultValue="contact@atlastrade.ma" /></Field>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "الإحداثيات البنكية" : "Coordonnées bancaires"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label={lang === "ar" ? "البنك" : "Banque"}><Input defaultValue="Attijariwafa Bank" /></Field>
            <Field label="RIB"><Input defaultValue="011 780 0001234567890123 45" /></Field>
            <Field label="SWIFT"><Input defaultValue="BCMAMAMC" /></Field>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "الجبايات" : "Fiscalité"}</h3>
          <div className="space-y-4">
            <Toggle checked={stampOn} onChange={setStampOn} label={lang === "ar" ? "الطابع المالي قابل للتطبيق" : "Timbre applicable"} />
            {stampOn && (
              <div className="border border-border rounded-md p-4 space-y-2">
                <div className="grid grid-cols-4 gap-3 text-xs label-eyebrow"><span>Min</span><span>Max</span><span>{lang === "ar" ? "المبلغ" : "Montant"}</span><span></span></div>
                {[{ min: 0, max: 200, amt: 0.25 }, { min: 200, max: 20000, amt: 5 }].map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-3">
                    <Input defaultValue={row.min} type="number" />
                    <Input defaultValue={row.max} type="number" />
                    <Input defaultValue={row.amt} type="number" />
                    <Button variant="outline" size="sm" type="button" className="text-danger"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" type="button"><Plus className="h-3.5 w-3.5" />{lang === "ar" ? "إضافة عتبة" : "Ajouter un seuil"}</Button>
              </div>
            )}
            <Toggle checked={retentionOn} onChange={setRetentionOn} label={lang === "ar" ? "الخصم من المصدر قابل للتطبيق" : "Retenue à la source applicable"} />
            {retentionOn && (
              <div className="max-w-xs"><Field label={lang === "ar" ? "النسبة الافتراضية (%)" : "Taux par défaut (%)"}><Input type="number" defaultValue={10} /></Field></div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{lang === "ar" ? "الأختام والتوقيعات" : "Cachets & Signatures"}</h3>
            <Button variant="outline" size="sm" type="button"><Plus className="h-3.5 w-3.5" />{lang === "ar" ? "إضافة" : "Ajouter"}</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sigs.map((s) => {
              const Icon = s.type === "stamp" ? Stamp : PenLine;
              return (
                <div key={s.name} className="border border-border rounded-lg p-4">
                  <div className="h-24 rounded bg-secondary border border-border flex items-center justify-center mb-3"><Icon className="h-8 w-8 text-primary" /></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{s.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-info/10 text-info">{s.type === "stamp" ? "Cachet" : "Signature"}</span>
                        {s.isDefault && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success">{lang === "ar" ? "افتراضي" : "Défaut"}</span>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground flex items-center justify-center"><Pencil className="h-3.5 w-3.5" /></button>
                      <button type="button" className="h-7 w-7 rounded hover:bg-danger/10 text-danger flex items-center justify-center"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">{lang === "ar" ? "الترقيم" : "Numérotation"}</h3>
          <p className="text-sm text-muted-foreground mb-4">{lang === "ar" ? "البادئة، اللاحقة، السنة لكل نوع مستند" : "Préfixe, suffixe et année par type de document"}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[["Devis", "DEV"], ["BL", "BL"], ["Facture", "FAC"], ["Avoir", "AVR"]].map(([l, p]) => (
              <div key={l} className="border border-border rounded-md p-3">
                <div className="label-eyebrow">{l}</div>
                <div className="font-mono text-sm mt-1">{p}-2026-00001</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end gap-3"><Button variant="outline">{t("cancel")}</Button><Button>{t("save")}</Button></div>
      </form>
    </AppShell>
  );
}
