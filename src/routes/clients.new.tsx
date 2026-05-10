import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input, Select, Textarea, Toggle } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";

export const Route = createFileRoute("/clients/new")({
  component: ClientCreatePage,
});

function ClientCreatePage() {
  const { t, lang } = useI18n();
  const [vatExempt, setVatExempt] = useState(false);
  const [active, setActive] = useState(true);
  const [logo, setLogo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setLogo(URL.createObjectURL(f));
  };

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "إنشاء عميل" : "Créer un client"}
        description={lang === "ar" ? "أضف شركة جديدة إلى قاعدة عملائك" : "Ajoutez une nouvelle société à votre base clients"}
      />

      <form className="space-y-6">
        {/* Logo upload */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="h-40 w-40 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary-soft transition-colors flex flex-col items-center justify-center gap-2 overflow-hidden bg-secondary/50"
              >
                {logo ? (
                  <img src={logo} alt="logo" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground px-3 text-center">
                      {lang === "ar" ? "انقر للرفع" : "Cliquez pour téléverser"}
                    </span>
                  </>
                )}
              </button>
              {logo && (
                <button
                  type="button"
                  onClick={() => setLogo(null)}
                  className="absolute -top-2 -right-2 rtl:-right-auto rtl:-left-2 h-7 w-7 rounded-full bg-danger text-danger-foreground flex items-center justify-center shadow-md"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onLogo} />
            </div>
            <div className="pt-2">
              <h3 className="font-semibold">{lang === "ar" ? "شعار الشركة" : "Logo de l'entreprise"}</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                {lang === "ar"
                  ? "PNG أو JPG، 160×160 بكسل على الأقل."
                  : "PNG ou JPG, 160×160px minimum."}
              </p>
            </div>
          </div>
        </Card>

        {/* Personal info + representative */}
        <Card className="p-6">
          <h3 className="font-semibold mb-1">
            {lang === "ar" ? "معلومات شخصية" : "Informations personnelles"}
          </h3>
          <p className="text-xs text-muted-foreground mb-5">
            {lang === "ar" ? "ممثل الشركة وبيانات الاتصال" : "Représentant de la société et coordonnées"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "الاسم الأول للممثل" : "Prénom du représentant"}>
              <Input placeholder={lang === "ar" ? "كريم" : "Karim"} />
            </Field>
            <Field label={lang === "ar" ? "اسم عائلة الممثل" : "Nom du représentant"}>
              <Input placeholder={lang === "ar" ? "بنعلي" : "Benali"} />
            </Field>
            <Field label={lang === "ar" ? "المنصب" : "Fonction"}>
              <Input placeholder={lang === "ar" ? "المدير العام" : "Directeur Général"} />
            </Field>
            <Field label={lang === "ar" ? "الهاتف" : "Téléphone"}>
              <Input placeholder="+212 6XX XX XX XX" />
            </Field>
            <Field label="Email">
              <Input type="email" placeholder="contact@exemple.ma" />
            </Field>
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
            <div className="md:col-span-2">
              <Field label={lang === "ar" ? "العنوان" : "Adresse"}>
                <Input placeholder={lang === "ar" ? "شارع..." : "Avenue..."} />
              </Field>
            </div>
          </div>
        </Card>

        {/* Company info */}
        <Card className="p-6">
          <h3 className="font-semibold mb-1">
            {lang === "ar" ? "معلومات الشركة" : "Informations de l'entreprise"}
          </h3>
          <p className="text-xs text-muted-foreground mb-5">
            {lang === "ar" ? "البيانات القانونية والضريبية" : "Données légales et fiscales"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "اسم الشركة" : "Raison sociale"}>
              <Input placeholder={lang === "ar" ? "شركة..." : "Société..."} />
            </Field>
            <Field label={lang === "ar" ? "نوع الشركة" : "Type d'entreprise"}>
              <Select defaultValue="private">
                <option value="private">
                  {lang === "ar" ? "شركة خاصة" : "Entreprise privée"}
                </option>
                <option value="public">
                  {lang === "ar" ? "مؤسسة عمومية" : "Établissement public"}
                </option>
              </Select>
            </Field>
            <Field label="ICE" hint={lang === "ar" ? "15 رقم" : "15 chiffres"}>
              <Input placeholder="000000000000000" maxLength={15} />
            </Field>
            <Field label="IF"><Input placeholder="12345678" /></Field>
            <Field label="Patente"><Input placeholder="98765432" /></Field>
            <Field label="RC"><Input placeholder="123456" /></Field>
            <Field label={lang === "ar" ? "الشكل القانوني" : "Forme juridique"}>
              <Select>
                <option>SARL</option>
                <option>SARL AU</option>
                <option>SA</option>
                <option>SAS</option>
                <option>SNC</option>
              </Select>
            </Field>
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

        {/* Active toggle */}
        <Card className="p-6">
          <Toggle
            checked={active}
            onChange={setActive}
            label={lang === "ar" ? "عميل نشط" : "Client actif"}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {lang === "ar"
              ? "يمكن إصدار مستندات لهذا العميل فقط عندما يكون نشطًا."
              : "Les documents ne peuvent être émis que pour un client actif."}
          </p>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link to="/clients"><Button variant="outline">{t("cancel")}</Button></Link>
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </AppShell>
  );
}
