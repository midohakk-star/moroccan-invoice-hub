import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertCircle,
  Clock,
  Receipt,
  FileSignature,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Tableau de bord — InvoicePro" }] }),
});

function DashboardPage() {
  const { t, formatCurrency, formatDate, lang, dir } = useI18n();

  const stats = [
    { label: t("caHt"), value: formatCurrency(245680), icon: Wallet, trend: 12.4, up: true },
    { label: t("receivables"), value: formatCurrency(78320), icon: AlertCircle, trend: -3.1, up: false },
    { label: t("overdue"), value: "7", icon: Clock, trend: 2, up: false, danger: true },
    { label: t("pendingQuotes"), value: "14", icon: Receipt, trend: 5, up: true },
  ];

  const months = lang === "ar"
    ? ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "غشت", "شتن", "أكت", "نون", "دجن"]
    : ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const data = [42, 58, 47, 71, 65, 89, 76, 92, 84, 105, 98, 112];
  const max = Math.max(...data);

  const topClients = [
    { name: "SARL Atlas Trade", ca: 184500, pct: 18.2, status: "paid" as const },
    { name: "Société Maghreb Import", ca: 142300, pct: 14.0, status: "paid" as const },
    { name: "Auto-ent. Karim Benali", ca: 98200, pct: 9.7, status: "overdue" as const },
    { name: "ETS Casa Distribution", ca: 76500, pct: 7.5, status: "sent" as const },
    { name: "Particulier — A. Tazi", ca: 54800, pct: 5.4, status: "paid" as const },
  ];

  const activity = [
    { type: "invoice", icon: Receipt, label: "FAC-2026-00128", client: "SARL Atlas Trade", date: new Date(2026, 4, 7), status: "paid" as const },
    { type: "quote", icon: FileSignature, label: "DEV-2026-00045", client: "Société Maghreb Import", date: new Date(2026, 4, 6), status: "sent" as const },
    { type: "delivery", icon: Truck, label: "BL-2026-00073", client: "ETS Casa Distribution", date: new Date(2026, 4, 6), status: "accepted" as const },
    { type: "invoice", icon: Receipt, label: "FAC-2026-00127", client: "Auto-ent. Karim Benali", date: new Date(2026, 4, 5), status: "overdue" as const },
    { type: "invoice", icon: Receipt, label: "FAC-2026-00126", client: "Particulier — A. Tazi", date: new Date(2026, 4, 4), status: "draft" as const },
  ];

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{t("dashboard")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {lang === "ar" ? "نظرة عامة على نشاطك التجاري" : "Vue d'ensemble de votre activité"}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          const Arrow = s.up ? TrendingUp : TrendingDown;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center ${s.danger ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-danger"}`}>
                  <Arrow className="h-3.5 w-3.5" />
                  {Math.abs(s.trend)}%
                </div>
              </div>
              <div className={`mt-4 text-3xl font-bold ${s.up ? "text-success" : s.danger ? "text-danger" : "text-foreground"}`}>
                {s.value}
              </div>
              <div className="label-eyebrow mt-1">{s.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold">{t("caEvolution")}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">CA HT (MAD) — 2026</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-3 w-3 rounded-sm bg-primary" />
            CA HT (MAD)
          </div>
        </div>
        <div className="h-64 flex items-end gap-2 border-b border-border pb-2 relative" dir={dir}>
          {[0, 25, 50, 75, 100].map((p) => (
            <div key={p} className="absolute left-0 right-0 border-t border-dashed border-border/60" style={{ bottom: `${p}%` }} />
          ))}
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 relative z-10">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-primary to-[oklch(0.55_0.13_152)] hover:opacity-80 transition-all cursor-pointer relative group"
                style={{ height: `${(v / max) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                  {formatCurrency(v * 1000)}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{months[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold">{t("topClients")}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground bg-secondary/50">
                  <th className="text-start font-medium px-6 py-3">{t("client")}</th>
                  <th className="text-end font-medium px-6 py-3">CA HT</th>
                  <th className="text-end font-medium px-6 py-3">%</th>
                  <th className="text-end font-medium px-6 py-3">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((c, i) => (
                  <tr key={c.name} className={`border-t border-border hover:bg-primary/5 ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-6 py-3 font-medium">{c.name}</td>
                    <td className="px-6 py-3 text-end tabular-nums">{formatCurrency(c.ca)}</td>
                    <td className="px-6 py-3 text-end tabular-nums text-muted-foreground">{c.pct}%</td>
                    <td className="px-6 py-3 text-end"><StatusBadge status={c.status} lang={lang} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold">{t("recentActivity")}</h3>
          </div>
          <ul className="divide-y divide-border">
            {activity.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.label} className="px-6 py-3.5 flex items-center gap-4 hover:bg-primary/5 transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/documents/$id" params={{ id: a.label }} className="text-sm font-medium hover:text-primary">
                      {a.label}
                    </Link>
                    <div className="text-xs text-muted-foreground truncate">{a.client}</div>
                  </div>
                  <div className="text-xs text-muted-foreground tabular-nums">{formatDate(a.date)}</div>
                  <StatusBadge status={a.status} lang={lang} />
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
