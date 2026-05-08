import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Download } from "lucide-react";

export const Route = createFileRoute("/turnover")({ component: TurnoverPage });

function TurnoverPage() {
  const { lang, formatCurrency } = useI18n();
  const months = lang === "ar"
    ? ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "غشت", "شتن", "أكت", "نون", "دجن"]
    : ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const data = [42, 58, 47, 71, 65, 89, 76, 92, 84, 105, 98, 112];
  const max = Math.max(...data);
  const top = [
    ["SARL Atlas Trade", 184500, 18.2],
    ["Société Maghreb Import", 142300, 14.0],
    ["Karim Benali", 98200, 9.7],
    ["ETS Casa Distribution", 76500, 7.5],
    ["Particulier — A. Tazi", 54800, 5.4],
    ["Salma Idrissi", 48200, 4.8],
    ["Bouygues Maroc", 42100, 4.1],
    ["Cosumar SA", 38900, 3.8],
    ["OCP Group", 32400, 3.2],
    ["Royal Air Maroc", 28100, 2.8],
  ] as const;

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "تحليل رقم الأعمال" : "Analyse CA"}
        actions={<Button variant="outline"><Download className="h-4 w-4" />{lang === "ar" ? "تصدير" : "Exporter"}</Button>}
      />
      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-5">{lang === "ar" ? "CA HT شهريا" : "CA HT mensuel"}</h3>
        <div className="h-64 flex items-end gap-2 border-b border-border pb-2">
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-md bg-primary hover:opacity-80 transition-all" style={{ height: `${(v / max) * 100}%` }} />
              <span className="text-xs text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="px-6 py-4 border-b border-border"><h3 className="font-semibold">{lang === "ar" ? "أفضل 10 عملاء" : "Top 10 clients"}</h3></div>
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50 text-xs text-muted-foreground"><th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "العميل" : "Client"}</th><th className="px-4 py-3 text-end font-medium">CA HT</th><th className="px-4 py-3 text-end font-medium">%</th></tr></thead>
          <tbody>
            {top.map(([c, ca, pct], i) => (
              <tr key={c} className={`border-t border-border ${i % 2 ? "bg-secondary/30" : ""}`}>
                <td className="px-4 py-3 font-medium">{c}</td>
                <td className="px-4 py-3 text-end tabular-nums">{formatCurrency(ca as number)}</td>
                <td className="px-4 py-3 text-end tabular-nums text-muted-foreground">{pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
