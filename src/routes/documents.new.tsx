import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Field, Input, Select } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Plus, Trash2, FileSignature, Truck, Receipt, Stamp, PenLine } from "lucide-react";

export const Route = createFileRoute("/documents/new")({
  component: DocumentCreatePage,
});

type Line = { id: number; designation: string; qty: number; unit: string; price: number; discount: number; vat: number };

function DocumentCreatePage() {
  const { t, lang, formatCurrency, dir } = useI18n();
  const [docType, setDocType] = useState<"quote" | "delivery" | "invoice">("invoice");
  const [lines, setLines] = useState<Line[]>([
    { id: 1, designation: "Conseil informatique", qty: 10, unit: "heure", price: 600, discount: 0, vat: 20 },
    { id: 2, designation: "Pack fournitures bureau", qty: 5, unit: "pièce", price: 450, discount: 5, vat: 20 },
  ]);

  const totalHT = lines.reduce((s, l) => s + l.qty * l.price * (1 - l.discount / 100), 0);
  const vatBreakdown = lines.reduce<Record<number, number>>((acc, l) => {
    const ht = l.qty * l.price * (1 - l.discount / 100);
    acc[l.vat] = (acc[l.vat] ?? 0) + (ht * l.vat) / 100;
    return acc;
  }, {});
  const totalVAT = Object.values(vatBreakdown).reduce((a, b) => a + b, 0);
  const totalTTC = totalHT + totalVAT;
  const stamp = totalTTC > 20000 ? 0 : Math.min(Math.max(totalTTC * 0.0025, 0), 1000);
  const retention = 0;
  const netToPay = totalTTC + stamp - retention;

  const docTypes = [
    { k: "quote" as const, l: lang === "ar" ? "عرض" : "Devis", icon: FileSignature, prefix: "DEV" },
    { k: "delivery" as const, l: "BL", icon: Truck, prefix: "BL" },
    { k: "invoice" as const, l: lang === "ar" ? "فاتورة" : "Facture", icon: Receipt, prefix: "FAC" },
  ];
  const currentPrefix = docTypes.find((d) => d.k === docType)!.prefix;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "إنشاء مستند" : "Créer un document"}
        actions={
          <>
            <Button variant="outline">{t("draft")}</Button>
            <Button>{t("finalize")}</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5" dir={dir}>
        <div className="space-y-5">
          {/* Header */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field label={t("client")}>
                <Select>
                  <option>SARL Atlas Trade — ICE 001234567000045</option>
                  <option>Société Maghreb Import — ICE 003456789000078</option>
                  <option>Auto-ent. Karim Benali — ICE 002345678000012</option>
                </Select>
              </Field>
              <Field label={lang === "ar" ? "نوع المستند" : "Type de document"}>
                <div className="flex gap-2">
                  {docTypes.map((x) => {
                    const Icon = x.icon;
                    const active = docType === x.k;
                    return (
                      <button
                        type="button"
                        key={x.k}
                        onClick={() => setDocType(x.k)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-md border text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40 text-muted-foreground"}`}
                      >
                        <Icon className="h-3.5 w-3.5" />{x.l}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Field label={lang === "ar" ? "رقم تلقائي" : "Numéro (auto)"}>
                <Input value={`${currentPrefix}-2026-00129`} readOnly className="bg-secondary/50" />
              </Field>

              <Field label={lang === "ar" ? "تاريخ الإصدار" : "Date d'émission"}><Input type="date" /></Field>
              <Field label={docType === "quote" ? (lang === "ar" ? "صلاحية" : "Validité") : (lang === "ar" ? "تاريخ الاستحقاق" : "Date d'échéance")}><Input type="date" /></Field>
              <Field label={lang === "ar" ? "شروط الدفع" : "Conditions de paiement"}>
                <Select>
                  <option>{lang === "ar" ? "نقدًا" : "Comptant"}</option>
                  <option>{lang === "ar" ? "30 يوم" : "30 jours"}</option>
                  <option>{lang === "ar" ? "60 يوم" : "60 jours"}</option>
                  <option>{lang === "ar" ? "90 يوم" : "90 jours"}</option>
                </Select>
              </Field>
            </div>
          </Card>

          {/* Lines */}
          <Card>
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">{lang === "ar" ? "بنود" : "Lignes"}</h3>
              <Button variant="secondary" size="sm" onClick={() => setLines((l) => [...l, { id: Date.now(), designation: "", qty: 1, unit: "pièce", price: 0, discount: 0, vat: 20 }])}>
                <Plus className="h-3.5 w-3.5" />{lang === "ar" ? "إضافة بند" : "Ajouter une ligne"}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 text-xs text-muted-foreground">
                    <th className="px-3 py-2 text-start font-medium w-10">#</th>
                    <th className="px-3 py-2 text-start font-medium">{lang === "ar" ? "التسمية" : "Désignation"}</th>
                    <th className="px-3 py-2 text-end font-medium w-20">Qté</th>
                    <th className="px-3 py-2 text-start font-medium w-24">{lang === "ar" ? "وحدة" : "Unité"}</th>
                    <th className="px-3 py-2 text-end font-medium w-28">PU HT</th>
                    <th className="px-3 py-2 text-end font-medium w-20">Rem. %</th>
                    <th className="px-3 py-2 text-center font-medium w-24">TVA</th>
                    <th className="px-3 py-2 text-end font-medium w-28">Total HT</th>
                    <th className="px-3 py-2 text-end font-medium w-28">Total TTC</th>
                    <th className="px-3 py-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l, i) => {
                    const ht = l.qty * l.price * (1 - l.discount / 100);
                    const ttc = ht * (1 + l.vat / 100);
                    return (
                      <tr key={l.id} className="border-t border-border">
                        <td className="px-3 py-2 text-muted-foreground tabular-nums">{i + 1}</td>
                        <td className="px-3 py-2"><input className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm" defaultValue={l.designation} placeholder={lang === "ar" ? "اسم البند..." : "Désignation..."} /></td>
                        <td className="px-3 py-2"><input type="number" defaultValue={l.qty} className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm text-end tabular-nums" /></td>
                        <td className="px-3 py-2"><select defaultValue={l.unit} className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm"><option>pièce</option><option>heure</option><option>kg</option><option>jour</option><option>forfait</option></select></td>
                        <td className="px-3 py-2"><input type="number" defaultValue={l.price} className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm text-end tabular-nums" /></td>
                        <td className="px-3 py-2"><input type="number" defaultValue={l.discount} className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm text-end tabular-nums" /></td>
                        <td className="px-3 py-2"><select defaultValue={l.vat} className="w-full h-8 px-2 rounded border border-transparent hover:border-input focus:border-primary outline-none bg-transparent text-sm"><option>20</option><option>14</option><option>10</option><option>7</option><option>0</option></select></td>
                        <td className="px-3 py-2 text-end tabular-nums">{formatCurrency(ht)}</td>
                        <td className="px-3 py-2 text-end tabular-nums font-medium">{formatCurrency(ttc)}</td>
                        <td className="px-3 py-2"><button onClick={() => setLines((p) => p.filter((x) => x.id !== l.id))} className="text-danger hover:bg-danger/10 h-7 w-7 rounded inline-flex items-center justify-center"><Trash2 className="h-3.5 w-3.5" /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Stamp & signature */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">{lang === "ar" ? "الختم والتوقيع" : "Cachet & Signature"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={lang === "ar" ? "الختم (إلزامي)" : "Cachet (obligatoire)"}>
                <div className="flex gap-2 items-center">
                  <Select className="flex-1"><option>Cachet officiel — SARL Atlas</option><option>Cachet succursale Casa</option></Select>
                  <div className="h-10 w-10 rounded border border-border bg-secondary flex items-center justify-center"><Stamp className="h-5 w-5 text-primary" /></div>
                </div>
              </Field>
              <Field label={lang === "ar" ? "التوقيع (اختياري)" : "Signature (optionnelle)"}>
                <div className="flex gap-2 items-center">
                  <Select className="flex-1"><option>—</option><option>Signature DG</option><option>Signature Comptable</option></Select>
                  <div className="h-10 w-10 rounded border border-border bg-secondary flex items-center justify-center"><PenLine className="h-5 w-5 text-muted-foreground" /></div>
                </div>
              </Field>
            </div>
            <p className="mt-4 text-xs italic text-muted-foreground bg-secondary/50 border border-border rounded-md p-3">
              {lang === "ar"
                ? "ملاحظة قانونية: TVA معلقة طبقًا للمادة 89 من المدونة العامة للضرائب. الدفع متأخر يخضع لفائدة قانونية."
                : "Mention légale : TVA acquittée selon les débits. Tout retard de paiement entraînera des pénalités selon l'article 49 de la loi 32-10."}
            </p>
          </Card>

          <div className="flex items-center justify-between">
            <Link to="/documents"><Button variant="outline">{t("cancel")}</Button></Link>
            <div className="flex gap-3">
              <Button variant="outline">{t("draft")}</Button>
              <Button>{t("finalize")}</Button>
            </div>
          </div>
        </div>

        {/* Totals sidebar */}
        <Card className="p-6 h-fit lg:sticky lg:top-20">
          <h3 className="font-semibold mb-4">{lang === "ar" ? "ملخص" : "Totaux"}</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Total HT</dt><dd className="tabular-nums font-medium">{formatCurrency(totalHT)}</dd></div>
            <div className="pt-3 border-t border-border space-y-2">
              <dt className="label-eyebrow">TVA détaillée</dt>
              {Object.entries(vatBreakdown).map(([rate, v]) => (
                <div key={rate} className="flex justify-between text-xs"><span className="text-muted-foreground">{rate}%</span><span className="tabular-nums">{formatCurrency(v)}</span></div>
              ))}
            </div>
            <div className="flex justify-between pt-3 border-t border-border"><dt>Total TTC</dt><dd className="tabular-nums font-semibold">{formatCurrency(totalTTC)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Timbre</dt><dd className="tabular-nums">{formatCurrency(stamp)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{lang === "ar" ? "خصم من المصدر" : "Retenue source"}</dt><dd className="tabular-nums text-danger">- {formatCurrency(retention)}</dd></div>
            <div className="pt-4 mt-2 border-t-2 border-primary flex justify-between items-baseline">
              <dt className="font-semibold">{lang === "ar" ? "صافي للدفع" : "Net à Payer"}</dt>
              <dd className="text-xl font-bold text-primary tabular-nums">{formatCurrency(netToPay)}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </AppShell>
  );
}
