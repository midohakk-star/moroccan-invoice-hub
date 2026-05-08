import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Input, Select } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Download } from "lucide-react";

export const Route = createFileRoute("/tva")({ component: TvaPage });

function TvaPage() {
  const { lang, formatCurrency } = useI18n();
  const collected20 = 24500, collected14 = 0, collected10 = 1200, collected7 = 0;
  const collected = collected20 + collected14 + collected10 + collected7;
  const deductible = 8200;
  const credit = 0;
  const net = Math.max(collected - deductible - credit, 0);

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "إقرار الضريبة" : "Déclaration de TVA"}
        description={lang === "ar" ? "fr: Déclaration de TVA / ar: إقرار الضريبة" : "Calcul automatique"}
        actions={<Button variant="outline"><Download className="h-4 w-4" />Excel</Button>}
      />

      <Card className="p-5 mb-5">
        <div className="flex flex-wrap gap-3">
          <Select className="w-40"><option>Mensuelle</option><option>Trimestrielle</option></Select>
          <Select className="w-32"><option>Mai</option><option>Avril</option></Select>
          <Input type="number" defaultValue={2026} className="w-28" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        {[
          { l: lang === "ar" ? "TVA محصلة" : "TVA collectée", v: collected, c: "text-foreground" },
          { l: lang === "ar" ? "TVA قابلة للخصم" : "TVA déductible", v: deductible, c: "text-foreground" },
          { l: lang === "ar" ? "ائتمان TVA سابق" : "Crédit TVA antérieur", v: credit, c: "text-foreground" },
          { l: lang === "ar" ? "صافي TVA للدفع" : "TVA nette à payer", v: net, c: "text-success font-bold" },
        ].map((s) => (
          <Card key={s.l} className="p-5">
            <div className="label-eyebrow">{s.l}</div>
            <div className={`mt-2 text-2xl ${s.c} tabular-nums`}>{formatCurrency(s.v)}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-border"><h3 className="font-semibold">{lang === "ar" ? "تفصيل بحسب المعدل" : "Détail par taux"}</h3></div>
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50 text-xs text-muted-foreground"><th className="px-4 py-3 text-start font-medium">Taux</th><th className="px-4 py-3 text-end font-medium">Base HT</th><th className="px-4 py-3 text-end font-medium">TVA collectée</th></tr></thead>
          <tbody>
            {[{ r: "20%", b: 122500, t: collected20 }, { r: "14%", b: 0, t: 0 }, { r: "10%", b: 12000, t: collected10 }, { r: "7%", b: 0, t: 0 }, { r: "0% / Exonéré", b: 4500, t: 0 }].map((row) => (
              <tr key={row.r} className="border-t border-border tabular-nums"><td className="px-4 py-3 font-medium">{row.r}</td><td className="px-4 py-3 text-end">{formatCurrency(row.b)}</td><td className="px-4 py-3 text-end font-medium">{formatCurrency(row.t)}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
