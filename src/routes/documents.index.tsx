import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Input, Select, StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Plus, Eye, Download, MoreHorizontal, FileSignature, Truck, Receipt, RotateCcw, Search } from "lucide-react";

export const Route = createFileRoute("/documents/")({
  component: DocumentsListPage,
});

type DocType = "quote" | "delivery" | "invoice" | "credit";

const docs = [
  { num: "FAC-2026-00128", type: "invoice" as DocType, client: "SARL Atlas Trade", date: new Date(2026, 4, 7), due: new Date(2026, 5, 7), total: 24500, status: "paid" as const },
  { num: "FAC-2026-00127", type: "invoice" as DocType, client: "Auto-ent. Karim Benali", date: new Date(2026, 4, 5), due: new Date(2026, 4, 20), total: 18200, status: "overdue" as const },
  { num: "FAC-2026-00126", type: "invoice" as DocType, client: "Particulier — A. Tazi", date: new Date(2026, 4, 4), due: new Date(2026, 5, 4), total: 4500, status: "draft" as const },
  { num: "DEV-2026-00045", type: "quote" as DocType, client: "Société Maghreb Import", date: new Date(2026, 4, 6), due: new Date(2026, 5, 6), total: 31000, status: "sent" as const },
  { num: "BL-2026-00073", type: "delivery" as DocType, client: "ETS Casa Distribution", date: new Date(2026, 4, 6), due: new Date(2026, 4, 6), total: 12300, status: "accepted" as const },
  { num: "AVR-2026-00008", type: "credit" as DocType, client: "SARL Atlas Trade", date: new Date(2026, 3, 28), due: new Date(2026, 3, 28), total: -1200, status: "accepted" as const },
];

const typeMeta: Record<DocType, { fr: string; ar: string; icon: React.ComponentType<{ className?: string }> }> = {
  quote: { fr: "Devis", ar: "عروض الأسعار", icon: FileSignature },
  delivery: { fr: "Bons de livraison", ar: "بيانات التسليم", icon: Truck },
  invoice: { fr: "Factures", ar: "الفواتير", icon: Receipt },
  credit: { fr: "Avoirs", ar: "إشعارات دائنة", icon: RotateCcw },
};

function DocumentsListPage() {
  const { t, lang, formatCurrency, formatDate, dir } = useI18n();
  const [activeType, setActiveType] = useState<DocType>("invoice");

  const filtered = docs.filter((d) => d.type === activeType);

  return (
    <AppShell>
      <PageHeader
        title={t("documents")}
        actions={
          <Link to="/documents/new"><Button><Plus className="h-4 w-4" />{lang === "ar" ? "مستند جديد" : "Nouveau document"}</Button></Link>
        }
      />

      {/* Tabs */}
      <div className="border-b border-border mb-5 flex gap-6 overflow-x-auto">
        {(Object.keys(typeMeta) as DocType[]).map((k) => {
          const m = typeMeta[k];
          const Icon = m.icon;
          const active = activeType === k;
          return (
            <button
              key={k}
              onClick={() => setActiveType(k)}
              className={`flex items-center gap-2 px-1 pb-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />{m[lang]}
            </button>
          );
        })}
      </div>

      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className={"absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground " + (dir === "rtl" ? "right-3" : "left-3")} />
            <Input placeholder={lang === "ar" ? "بحث عن عميل..." : "Rechercher un client..."} className={dir === "rtl" ? "pr-9" : "pl-9"} />
          </div>
          <Input type="date" className="w-44" />
          <Input type="date" className="w-44" />
          <Select className="w-44">
            <option>{lang === "ar" ? "كل الحالات" : "Tous statuts"}</option>
            <option>{lang === "ar" ? "مسودة" : "Brouillon"}</option>
            <option>{lang === "ar" ? "مرسل" : "Envoyé"}</option>
            <option>{lang === "ar" ? "مدفوع" : "Payé"}</option>
            <option>{lang === "ar" ? "متأخر" : "En retard"}</option>
          </Select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-xs text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "رقم" : "Numéro"}</th>
                <th className="px-4 py-3 text-start font-medium">{t("client")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("date")}</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "الاستحقاق" : "Échéance"}</th>
                <th className="px-4 py-3 text-end font-medium">Total TTC</th>
                <th className="px-4 py-3 text-center font-medium">{t("status")}</th>
                <th className="px-4 py-3 text-end font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const Icon = typeMeta[d.type].icon;
                return (
                  <tr key={d.num} className={`border-t border-border hover:bg-primary/5 ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-4 py-3">
                      <Link to="/documents/$id" params={{ id: d.num }} className="inline-flex items-center gap-2 font-medium hover:text-primary">
                        <Icon className="h-4 w-4 text-primary" />{d.num}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{d.client}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDate(d.date)}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDate(d.due)}</td>
                    <td className={`px-4 py-3 text-end tabular-nums font-medium ${d.total < 0 ? "text-danger" : ""}`}>{formatCurrency(d.total)}</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={d.status} lang={lang} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 rounded hover:bg-primary/10 text-success flex items-center justify-center"><Eye className="h-4 w-4" /></button>
                        <button className="h-8 w-8 rounded hover:bg-secondary text-muted-foreground flex items-center justify-center"><Download className="h-4 w-4" /></button>
                        <button className="h-8 w-8 rounded hover:bg-secondary text-muted-foreground flex items-center justify-center"><MoreHorizontal className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">{lang === "ar" ? "لا توجد مستندات." : "Aucun document."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
