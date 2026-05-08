import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Input, Select } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Plus, Upload, Download, Search, Package, Wrench, Check, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/products/")({
  component: ProductsListPage,
});

const products = [
  { ref: "PRD-001", name: "Ordinateur portable Dell Latitude", type: "product", price: 8500, vat: 20, retention: false, active: true },
  { ref: "PRD-002", name: "Imprimante HP LaserJet Pro", type: "product", price: 2400, vat: 20, retention: false, active: true },
  { ref: "SRV-001", name: "Conseil informatique (heure)", type: "service", price: 600, vat: 20, retention: true, active: true },
  { ref: "SRV-002", name: "Maintenance annuelle", type: "service", price: 12000, vat: 20, retention: true, active: true },
  { ref: "PRD-003", name: "Pack fournitures bureau", type: "product", price: 450, vat: 20, retention: false, active: true },
  { ref: "SRV-003", name: "Formation utilisateur (jour)", type: "service", price: 3200, vat: 20, retention: true, active: false },
];

function ProductsListPage() {
  const { t, lang, formatCurrency, dir } = useI18n();
  return (
    <AppShell>
      <PageHeader
        title={t("products")}
        description={lang === "ar" ? "كتالوج المنتجات والخدمات" : "Catalogue produits & services"}
        actions={
          <>
            <Button variant="outline"><Upload className="h-4 w-4" />{t("import")}</Button>
            <Button variant="outline"><Download className="h-4 w-4" />{t("export")}</Button>
            <Link to="/products/new"><Button><Plus className="h-4 w-4" />{lang === "ar" ? "منتج جديد" : "Nouveau Produit"}</Button></Link>
          </>
        }
      />

      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className={"absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground " + (dir === "rtl" ? "right-3" : "left-3")} />
            <Input placeholder={lang === "ar" ? "بحث عن منتج..." : "Rechercher un produit..."} className={dir === "rtl" ? "pr-9" : "pl-9"} />
          </div>
          <Select className="w-44"><option>{lang === "ar" ? "كل الأنواع" : "Tous les types"}</option><option>{lang === "ar" ? "منتج" : "Produit"}</option><option>{lang === "ar" ? "خدمة" : "Service"}</option></Select>
          <Select className="w-40"><option>{lang === "ar" ? "كل المعدلات" : "Toutes TVA"}</option><option>20%</option><option>14%</option><option>10%</option><option>7%</option><option>0%</option><option>{lang === "ar" ? "معفى" : "Exonéré"}</option></Select>
          <Select className="w-32"><option>{lang === "ar" ? "كل" : "Tous"}</option><option>{lang === "ar" ? "نشط" : "Actif"}</option><option>{lang === "ar" ? "غير نشط" : "Inactif"}</option></Select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-xs text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "مرجع" : "Référence"}</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "التسمية" : "Désignation"}</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "النوع" : "Type"}</th>
                <th className="px-4 py-3 text-end font-medium">Prix HT</th>
                <th className="px-4 py-3 text-center font-medium">TVA</th>
                <th className="px-4 py-3 text-center font-medium">{lang === "ar" ? "خصم؟" : "Retenue?"}</th>
                <th className="px-4 py-3 text-end font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => {
                const Icon = p.type === "service" ? Wrench : Package;
                return (
                  <tr key={p.ref} className={`border-t border-border hover:bg-primary/5 ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-4 py-3 font-medium tabular-nums">{p.ref}</td>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Icon className="h-4 w-4" />{p.type === "service" ? (lang === "ar" ? "خدمة" : "Service") : (lang === "ar" ? "منتج" : "Produit")}</span></td>
                    <td className="px-4 py-3 text-end tabular-nums font-medium">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3 text-center"><span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info">{p.vat}%</span></td>
                    <td className="px-4 py-3 text-center">{p.retention ? <Check className="h-4 w-4 text-success inline" /> : <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 rounded hover:bg-secondary text-muted-foreground flex items-center justify-center"><Pencil className="h-4 w-4" /></button>
                        <button className="h-8 w-8 rounded hover:bg-danger/10 text-danger flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
