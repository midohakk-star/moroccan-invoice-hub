import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Download, Mail, RotateCcw, XCircle, Stamp, PenLine } from "lucide-react";

export const Route = createFileRoute("/documents/$id")({
  component: DocumentDetailPage,
});

function DocumentDetailPage() {
  const { id } = Route.useParams();
  const { t, lang, formatCurrency, formatDate, dir } = useI18n();

  const lines = [
    { d: lang === "ar" ? "استشارة معلوماتية" : "Conseil informatique", q: 10, u: "h", p: 600, vat: 20 },
    { d: lang === "ar" ? "مجموعة لوازم مكتبية" : "Pack fournitures bureau", q: 5, u: "pcs", p: 450, vat: 20 },
  ];
  const totalHT = lines.reduce((s, l) => s + l.q * l.p, 0);
  const totalVAT = lines.reduce((s, l) => s + (l.q * l.p * l.vat) / 100, 0);
  const totalTTC = totalHT + totalVAT;
  const payments = [{ date: new Date(2026, 4, 8), amount: totalTTC, mode: "Virement", ref: "VIR-2026-008" }];

  return (
    <AppShell>
      <PageHeader
        title={id}
        description={lang === "ar" ? "عرض المستند" : "Vue du document"}
        actions={
          <>
            <Button variant="outline"><Mail className="h-4 w-4" />{lang === "ar" ? "إرسال" : "Envoyer"}</Button>
            <Button variant="outline"><RotateCcw className="h-4 w-4" />{lang === "ar" ? "تحويل إلى..." : "Convertir en..."}</Button>
            <Button variant="outline" className="text-danger border-danger/50 hover:bg-danger/5"><XCircle className="h-4 w-4" />{lang === "ar" ? "إلغاء" : "Annuler"}</Button>
            <Button><Download className="h-4 w-4" />PDF</Button>
          </>
        }
      />

      <p className="text-xs text-muted-foreground mb-3">
        {lang === "ar" ? "↳ تم الإنشاء من " : "↳ Créé depuis "}
        <Link to="/documents/$id" params={{ id: "DEV-2026-00012" }} className="text-primary hover:underline">DEV-2026-00012</Link>
      </p>

      {/* Invoice card (printed look) */}
      <Card className="p-10 mb-6 relative" dir={dir}>
        <div className="grid grid-cols-2 gap-8 mb-8 items-start">
          <div>
            <div className="h-12 w-32 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">LOGO</div>
            <div className="mt-4 text-sm">
              <div className="font-semibold">SARL Atlas Trade</div>
              <div className="text-muted-foreground text-xs leading-relaxed mt-1">
                Bd Zerktouni, Casablanca<br />
                ICE: 001234567000045<br />
                IF: 12345678 · RC: 123456 · Patente: 98765432
              </div>
            </div>
          </div>
          <div className={dir === "rtl" ? "text-start" : "text-end"}>
            <div className="label-eyebrow">{lang === "ar" ? "الزبون" : "Client"}</div>
            <div className="mt-1 text-sm">
              <div className="font-semibold">Société Maghreb Import</div>
              <div className="text-muted-foreground text-xs leading-relaxed mt-1">
                12 Rue de la Liberté, Marrakech<br />
                ICE: 003456789000078
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-wide text-primary uppercase">{lang === "ar" ? "فاتورة" : "Facture"}</h2>
          <div className="mt-2 text-sm text-muted-foreground">
            N° <span className="font-medium text-foreground">{id}</span>
            <span className="mx-2">·</span>
            {lang === "ar" ? "تاريخ" : "Date"}: <span className="font-medium text-foreground tabular-nums">{formatDate(new Date(2026, 4, 7))}</span>
            <span className="mx-2">·</span>
            {lang === "ar" ? "استحقاق" : "Échéance"}: <span className="font-medium text-foreground tabular-nums">{formatDate(new Date(2026, 5, 7))}</span>
          </div>
        </div>

        {/* Stamp top right */}
        <div className={"absolute top-8 " + (dir === "rtl" ? "left-8" : "right-8")}>
          <div className="h-24 w-24 rounded-full border-2 border-primary/40 flex items-center justify-center text-xs text-primary/70 font-medium rotate-[-12deg]">
            <Stamp className="h-5 w-5 me-1" /> CACHET
          </div>
        </div>

        <table className="w-full text-sm border border-border rounded overflow-hidden mb-6">
          <thead className="bg-secondary">
            <tr className="text-xs text-muted-foreground">
              <th className="px-3 py-2 text-start font-medium">{lang === "ar" ? "التسمية" : "Désignation"}</th>
              <th className="px-3 py-2 text-end font-medium">Qté</th>
              <th className="px-3 py-2 text-end font-medium">PU HT</th>
              <th className="px-3 py-2 text-center font-medium">TVA</th>
              <th className="px-3 py-2 text-end font-medium">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} className={i % 2 ? "bg-secondary/40" : ""}>
                <td className="px-3 py-2.5">{l.d}</td>
                <td className="px-3 py-2.5 text-end tabular-nums">{l.q} {l.u}</td>
                <td className="px-3 py-2.5 text-end tabular-nums">{formatCurrency(l.p)}</td>
                <td className="px-3 py-2.5 text-center">{l.vat}%</td>
                <td className="px-3 py-2.5 text-end tabular-nums font-medium">{formatCurrency(l.q * l.p)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total HT</span><span className="tabular-nums">{formatCurrency(totalHT)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">TVA 20%</span><span className="tabular-nums">{formatCurrency(totalVAT)}</span></div>
            <div className="flex justify-between pt-2 border-t-2 border-primary"><span className="font-semibold">{lang === "ar" ? "صافي للدفع" : "Net à Payer"}</span><span className="text-xl font-bold text-primary tabular-nums">{formatCurrency(totalTTC)}</span></div>
          </div>
        </div>

        <div className={"mt-4 flex " + (dir === "rtl" ? "justify-start" : "justify-end")}>
          <div className="text-center">
            <div className="h-12 italic text-primary/70 font-serif text-xl">~ Y. Amrani</div>
            <PenLine className="h-3.5 w-3.5 inline text-muted-foreground" />
            <span className="text-xs text-muted-foreground ms-1">Signature</span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
          <div><span className="font-medium text-foreground">{lang === "ar" ? "شروط الدفع:" : "Conditions de paiement:"}</span> 30 jours net</div>
          <div><span className="font-medium text-foreground">RIB:</span> 011 780 0001234567890123 45 — Attijariwafa Bank — SWIFT: BCMAMAMC</div>
          <div className="italic mt-2">
            {lang === "ar"
              ? "ملاحظة قانونية: يخضع التأخر في الدفع لفائدة قانونية حسب القانون 32-10."
              : "Mention légale : tout retard de paiement entraînera des pénalités selon l'article 49 de la loi 32-10."}
          </div>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold">{lang === "ar" ? "سجل المدفوعات" : "Historique des paiements"}</h3>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50 text-xs text-muted-foreground"><th className="px-4 py-3 text-start font-medium">{t("date")}</th><th className="px-4 py-3 text-end font-medium">{t("amount")}</th><th className="px-4 py-3 text-start font-medium">Mode</th><th className="px-4 py-3 text-start font-medium">Réf.</th></tr></thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.ref} className="border-t border-border">
                <td className="px-4 py-3 tabular-nums">{formatDate(p.date)}</td>
                <td className="px-4 py-3 text-end tabular-nums font-medium text-success">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3">{p.mode}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.ref}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <StatusBadge status="paid" lang={lang} />
    </AppShell>
  );
}
