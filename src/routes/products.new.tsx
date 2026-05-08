import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input, Select, Toggle } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Package, Wrench } from "lucide-react";

export const Route = createFileRoute("/products/new")({
  component: ProductCreatePage,
});

function ProductCreatePage() {
  const { t, lang } = useI18n();
  const [type, setType] = useState<"product" | "service">("product");
  const [vat, setVat] = useState("20");
  const [retention, setRetention] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <AppShell>
      <PageHeader title={lang === "ar" ? "إنشاء منتج" : "Créer un produit"} />

      <form className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "النوع" : "Type"}</h3>
          <div className="grid grid-cols-2 gap-4">
            {([
              { k: "product" as const, l: lang === "ar" ? "منتج" : "Produit", icon: Package },
              { k: "service" as const, l: lang === "ar" ? "خدمة" : "Service", icon: Wrench },
            ]).map((x) => {
              const Icon = x.icon;
              const active = type === x.k;
              return (
                <button
                  type="button"
                  key={x.k}
                  onClick={() => setType(x.k)}
                  className={`p-5 rounded-lg border-2 text-start transition-all ${active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-semibold">{x.l}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {x.k === "product" ? (lang === "ar" ? "بضاعة مادية" : "Bien matériel") : (lang === "ar" ? "خدمة احترافية" : "Prestation de service")}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">{lang === "ar" ? "معلومات أساسية" : "Informations de base"}</h3>
          <p className="text-xs text-muted-foreground mb-5">fr: Informations de base / ar: معلومات أساسية</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "المرجع" : "Référence"} hint={lang === "ar" ? "مقترح: PRD-007" : "Suggestion: PRD-007"}>
              <Input defaultValue={type === "service" ? "SRV-004" : "PRD-007"} />
            </Field>
            <Field label={lang === "ar" ? "التسمية" : "Désignation"}><Input placeholder={lang === "ar" ? "اسم المنتج..." : "Nom du produit..."} /></Field>
            <Field label={lang === "ar" ? "وحدة افتراضية" : "Unité par défaut"}>
              <Select>
                <option>{lang === "ar" ? "قطعة" : "pièce"}</option>
                <option>kg</option>
                <option>{lang === "ar" ? "ساعة" : "heure"}</option>
                <option>{lang === "ar" ? "إجمالي" : "forfait"}</option>
                <option>{lang === "ar" ? "يوم" : "jour"}</option>
                <option>{lang === "ar" ? "متر" : "mètre"}</option>
              </Select>
            </Field>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-5">{lang === "ar" ? "السعر والضريبة" : "Prix et taxe"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={lang === "ar" ? "سعر البيع HT (MAD)" : "Prix de vente HT (MAD)"}>
              <Input type="number" placeholder="0,00" className="tabular-nums" />
            </Field>
            <Field label={lang === "ar" ? "TVA افتراضية" : "TVA par défaut"}>
              <Select value={vat} onChange={(e) => setVat(e.target.value)}>
                <option value="20">20%</option>
                <option value="14">14%</option>
                <option value="10">10%</option>
                <option value="7">7%</option>
                <option value="0">0%</option>
                <option value="exempt">{lang === "ar" ? "معفى" : "Exonéré"}</option>
              </Select>
            </Field>
            {vat === "exempt" && (
              <Field label={lang === "ar" ? "مرجع الإعفاء" : "Référence d'exonération"} >
                <Input placeholder={lang === "ar" ? "المادة 91..." : "Art. 91 du CGI..."} />
              </Field>
            )}
          </div>

          {type === "service" && (
            <div className="mt-6 pt-5 border-t border-border space-y-3">
              <Toggle
                checked={retention}
                onChange={setRetention}
                label={lang === "ar" ? "خاضع للخصم من المصدر" : "Soumis à la retenue à la source"}
              />
              {retention && (
                <p className="text-xs text-muted-foreground bg-info/5 border border-info/20 rounded-md p-3">
                  {lang === "ar"
                    ? "سيتم احتساب الخصم إذا كان العميل شركة."
                    : "La retenue sera calculée si le client est une société."}
                </p>
              )}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <Toggle checked={active} onChange={setActive} label={lang === "ar" ? "نشط" : "Actif"} />
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link to="/products"><Button variant="outline">{t("cancel")}</Button></Link>
          <Button type="submit">{t("save")}</Button>
        </div>
      </form>
    </AppShell>
  );
}
