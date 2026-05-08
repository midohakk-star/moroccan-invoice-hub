import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Pencil, Plus, Download, Building2, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/clients/$id")({
  component: ClientDetailPage,
});

function ClientDetailPage() {
  const { id } = Route.useParams();
  const { t, lang, formatCurrency, formatDate } = useI18n();
  const [tab, setTab] = useState<"docs" | "payments" | "notes">("docs");

  const docs = [
    { num: "FAC-2026-00128", type: "Facture", date: new Date(2026, 4, 7), total: 24500, status: "paid" as const },
    { num: "FAC-2026-00115", type: "Facture", date: new Date(2026, 3, 22), total: 18200, status: "overdue" as const },
    { num: "DEV-2026-00045", type: "Devis", date: new Date(2026, 4, 1), total: 31000, status: "sent" as const },
    { num: "BL-2026-00073", type: "BL", date: new Date(2026, 4, 6), total: 12300, status: "accepted" as const },
  ];
  const payments = [
    { date: new Date(2026, 4, 8), amount: 24500, mode: "Virement", ref: "VIR-2026-008" },
    { date: new Date(2026, 3, 12), amount: 16400, mode: "Chèque", ref: "CHQ-456712" },
  ];

  return (
    <AppShell>
      <PageHeader
        title="SARL Atlas Trade"
        description={`#${id} — ${lang === "ar" ? "تفاصيل العميل" : "Détail client"}`}
        actions={<Button variant="outline"><Pencil className="h-4 w-4" />{t("edit")}</Button>}
      />

      <Card className="p-6 mb-5">
        <div className="flex items-start gap-5">
          <div className="h-16 w-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Building2 className="h-7 w-7" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">SARL Atlas Trade</h2>
                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">{lang === "ar" ? "شركة" : "Société"}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">ICE: 001234567000045 · IF: 12345678 · RC: 123456</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />Bd Zerktouni, Casablanca</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" />+212 522 33 44 55</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" />contact@atlastrade.ma</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {[
          { label: lang === "ar" ? "إجمالي مفوتر" : "Total facturé", value: formatCurrency(184500), color: "text-foreground" },
          { label: lang === "ar" ? "الرصيد المستحق" : "Solde dû", value: formatCurrency(12500), color: "text-danger" },
          { label: lang === "ar" ? "متوسط مدة السداد" : "Délai moyen paiement", value: lang === "ar" ? "32 يوم" : "32 jours", color: "text-foreground" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <div className="label-eyebrow">{s.label}</div>
            <div className={`mt-2 text-2xl font-bold ${s.color}`}>{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <Link to="/documents/new"><Button variant="outline"><Plus className="h-4 w-4" />{lang === "ar" ? "عرض جديد" : "Nouveau Devis"}</Button></Link>
        <Link to="/documents/new"><Button variant="outline"><Plus className="h-4 w-4" />{lang === "ar" ? "بيان تسليم جديد" : "Nouveau BL"}</Button></Link>
        <Link to="/documents/new"><Button><Plus className="h-4 w-4" />{lang === "ar" ? "فاتورة جديدة" : "Nouvelle Facture"}</Button></Link>
        <Button variant="outline" className="ms-auto"><Download className="h-4 w-4" />{lang === "ar" ? "تصدير المستندات" : "Exporter"}</Button>
      </div>

      <Card>
        <div className="flex border-b border-border">
          {([
            { k: "docs" as const, l: t("documents") },
            { k: "payments" as const, l: lang === "ar" ? "المدفوعات" : "Paiements" },
            { k: "notes" as const, l: "Notes" },
          ]).map((x) => (
            <button
              key={x.k}
              onClick={() => setTab(x.k)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px ${tab === x.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {x.l}
            </button>
          ))}
        </div>

        {tab === "docs" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 text-xs text-muted-foreground">
                  <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "رقم" : "Numéro"}</th>
                  <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "نوع" : "Type"}</th>
                  <th className="px-4 py-3 text-start font-medium">{t("date")}</th>
                  <th className="px-4 py-3 text-end font-medium">Total TTC</th>
                  <th className="px-4 py-3 text-end font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d, i) => (
                  <tr key={d.num} className={`border-t border-border hover:bg-primary/5 ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-4 py-3 font-medium">{d.num}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDate(d.date)}</td>
                    <td className="px-4 py-3 text-end tabular-nums font-medium">{formatCurrency(d.total)}</td>
                    <td className="px-4 py-3 text-end"><StatusBadge status={d.status} lang={lang} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "payments" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 text-xs text-muted-foreground">
                  <th className="px-4 py-3 text-start font-medium">{t("date")}</th>
                  <th className="px-4 py-3 text-end font-medium">{t("amount")}</th>
                  <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "طريقة" : "Mode"}</th>
                  <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "مرجع" : "Référence"}</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={p.ref} className={`border-t border-border ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-4 py-3 tabular-nums">{formatDate(p.date)}</td>
                    <td className="px-4 py-3 text-end tabular-nums font-medium text-success">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3">{p.mode}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "notes" && (
          <div className="p-6 text-sm text-muted-foreground">
            {lang === "ar" ? "لا توجد ملاحظات." : "Aucune note pour ce client."}
          </div>
        )}
      </Card>
    </AppShell>
  );
}
