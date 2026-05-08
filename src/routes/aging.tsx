import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/aging")({ component: AgingPage });

const rows = [
  { c: "SARL Atlas Trade", total: 12500, b1: 8500, b2: 4000, b3: 0, b4: 0 },
  { c: "Karim Benali", total: 18200, b1: 0, b2: 0, b3: 12000, b4: 6200 },
  { c: "Société Maghreb", total: 34200, b1: 12000, b2: 10200, b3: 12000, b4: 0 },
  { c: "ETS Casa Distribution", total: 8900, b1: 0, b2: 0, b3: 0, b4: 8900 },
];

function AgingPage() {
  const { lang, formatCurrency } = useI18n();
  const cell = (v: number, cls: string) => (
    <td className={`px-4 py-3 text-end tabular-nums font-medium ${v > 0 ? cls : "text-muted-foreground"}`}>{v > 0 ? formatCurrency(v) : "—"}</td>
  );
  return (
    <AppShell>
      <PageHeader title={lang === "ar" ? "تقرير الأعمار" : "Balance âgée"} description={lang === "ar" ? "fr: Balance âgée / ar: تقرير الأعمار" : "Suivi des créances"} />
      <Card className="p-4 mb-4 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{lang === "ar" ? "تاريخ المرجع:" : "Date de référence:"}</span>
        <Input type="date" className="w-44" />
      </Card>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-xs text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "العميل" : "Client"}</th>
                <th className="px-4 py-3 text-end font-medium">{lang === "ar" ? "الإجمالي المستحق" : "Total dû"}</th>
                <th className="px-4 py-3 text-end font-medium">0–30 j</th>
                <th className="px-4 py-3 text-end font-medium">31–60 j</th>
                <th className="px-4 py-3 text-end font-medium">61–90 j</th>
                <th className="px-4 py-3 text-end font-medium">+90 j</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.c} className={`border-t border-border ${i % 2 ? "bg-secondary/30" : ""}`}>
                  <td className="px-4 py-3 font-medium">{r.c}</td>
                  <td className="px-4 py-3 text-end tabular-nums font-semibold">{formatCurrency(r.total)}</td>
                  {cell(r.b1, "text-success")}
                  {cell(r.b2, "text-warning")}
                  {cell(r.b3, "text-[oklch(0.62_0.18_60)]")}
                  {cell(r.b4, "text-danger")}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
