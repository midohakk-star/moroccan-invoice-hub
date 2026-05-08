import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Input, Select, StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Download } from "lucide-react";

export const Route = createFileRoute("/journal")({ component: JournalPage });

const rows = [
  { n: 1, date: new Date(2026, 4, 7), num: "FAC-2026-00128", client: "SARL Atlas Trade", ice: "001234567000045", ht: 7500, v20: 1500, v14: 0, v10: 0, v7: 0, v0: 0, ex: 0, ttc: 9000, st: 0, ret: 0, net: 9000, status: "paid" as const },
  { n: 2, date: new Date(2026, 4, 5), num: "FAC-2026-00127", client: "Karim Benali", ice: "002345678000012", ht: 15000, v20: 3000, v14: 0, v10: 0, v7: 0, v0: 0, ex: 0, ttc: 18000, st: 0, ret: 1500, net: 16500, status: "overdue" as const },
  { n: 3, date: new Date(2026, 3, 28), num: "AVR-2026-00008", client: "SARL Atlas Trade", ice: "001234567000045", ht: -1000, v20: -200, v14: 0, v10: 0, v7: 0, v0: 0, ex: 0, ttc: -1200, st: 0, ret: 0, net: -1200, status: "accepted" as const },
];

function JournalPage() {
  const { lang, formatCurrency, formatDate } = useI18n();
  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "سجل المبيعات" : "Journal des ventes"}
        description={lang === "ar" ? "متوافق مع DGI" : "Conforme DGI"}
        actions={<><Button variant="outline"><Download className="h-4 w-4" />Excel</Button><Button variant="outline"><Download className="h-4 w-4" />PDF</Button></>}
      />
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <Input type="date" className="w-44" />
          <Input type="date" className="w-44" />
          <Select className="w-64"><option>{lang === "ar" ? "كل العملاء" : "Tous les clients"}</option></Select>
        </div>
      </Card>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground">
                {["N°", "Date", "N° Facture", "Client", "ICE", "HT", "TVA 20%", "14%", "10%", "7%", "0%", "Exo.", "Total TVA", "TTC", "Timbre", "Retenue", "Net", "Statut"].map((h) => (
                  <th key={h} className="px-2 py-2 text-end font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.n} className={`border-t border-border tabular-nums ${i % 2 ? "bg-secondary/30" : ""} ${r.ttc < 0 ? "text-danger" : ""}`}>
                  <td className="px-2 py-2 text-center">{r.n}</td>
                  <td className="px-2 py-2">{formatDate(r.date)}</td>
                  <td className="px-2 py-2 font-medium">{r.num}</td>
                  <td className="px-2 py-2 text-start">{r.client}</td>
                  <td className="px-2 py-2 text-muted-foreground">{r.ice}</td>
                  <td className="px-2 py-2 text-end">{formatCurrency(r.ht)}</td>
                  <td className="px-2 py-2 text-end">{formatCurrency(r.v20)}</td>
                  <td className="px-2 py-2 text-end text-muted-foreground">{r.v14 || "—"}</td>
                  <td className="px-2 py-2 text-end text-muted-foreground">{r.v10 || "—"}</td>
                  <td className="px-2 py-2 text-end text-muted-foreground">{r.v7 || "—"}</td>
                  <td className="px-2 py-2 text-end text-muted-foreground">{r.v0 || "—"}</td>
                  <td className="px-2 py-2 text-end text-muted-foreground">{r.ex || "—"}</td>
                  <td className="px-2 py-2 text-end font-medium">{formatCurrency(r.v20 + r.v14 + r.v10 + r.v7)}</td>
                  <td className="px-2 py-2 text-end font-semibold">{formatCurrency(r.ttc)}</td>
                  <td className="px-2 py-2 text-end">{formatCurrency(r.st)}</td>
                  <td className="px-2 py-2 text-end text-danger">{r.ret > 0 ? `- ${formatCurrency(r.ret)}` : "—"}</td>
                  <td className="px-2 py-2 text-end font-semibold text-primary">{formatCurrency(r.net)}</td>
                  <td className="px-2 py-2 text-center"><StatusBadge status={r.status} lang={lang} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
