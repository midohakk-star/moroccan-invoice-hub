import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, PageHeader } from "@/components/layout/AppShell";
import { Button, Input, Select, StatusBadge } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { Plus, Upload, Download, Search, User, Briefcase, Building2, Pencil, Trash2, Eye } from "lucide-react";

export const Route = createFileRoute("/clients/")({
  component: ClientsListPage,
});

const clients = [
  { id: "c1", name: "SARL Atlas Trade", type: "company", ice: "001234567000045", phone: "+212 522 33 44 55", city: "Casablanca", balance: 12500 },
  { id: "c2", name: "Auto-ent. Karim Benali", type: "auto", ice: "002345678000012", phone: "+212 661 22 33 44", city: "Rabat", balance: 0 },
  { id: "c3", name: "Société Maghreb Import", type: "company", ice: "003456789000078", phone: "+212 524 11 22 33", city: "Marrakech", balance: 34200 },
  { id: "c4", name: "Particulier — A. Tazi", type: "individual", ice: "—", phone: "+212 670 88 99 11", city: "Tanger", balance: 0 },
  { id: "c5", name: "ETS Casa Distribution", type: "company", ice: "004567890000034", phone: "+212 522 99 88 77", city: "Casablanca", balance: 8900 },
  { id: "c6", name: "Auto-ent. Salma Idrissi", type: "auto", ice: "005678901000056", phone: "+212 668 44 55 66", city: "Fès", balance: 1200 },
];

const typeIcon = { company: Building2, auto: Briefcase, individual: User } as const;

function ClientsListPage() {
  const { t, lang, formatCurrency, dir } = useI18n();
  return (
    <AppShell>
      <PageHeader
        title={t("clients")}
        description={lang === "ar" ? "إدارة عملائك" : "Gérez votre portefeuille clients"}
        actions={
          <>
            <Button variant="outline"><Upload className="h-4 w-4" />{t("import")}</Button>
            <Button variant="outline"><Download className="h-4 w-4" />{t("export")}</Button>
            <Link to="/clients/new"><Button><Plus className="h-4 w-4" />{lang === "ar" ? "عميل جديد" : "Nouveau Client"}</Button></Link>
          </>
        }
      />

      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className={"absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground " + (dir === "rtl" ? "right-3" : "left-3")} />
            <Input placeholder={lang === "ar" ? "بحث عن عميل..." : "Rechercher un client..."} className={dir === "rtl" ? "pr-9" : "pl-9"} />
          </div>
          <Select className="w-48">
            <option>{lang === "ar" ? "كل الأنواع" : "Tous les types"}</option>
            <option>{lang === "ar" ? "خاص" : "Particulier"}</option>
            <option>{lang === "ar" ? "مقاول ذاتي" : "Auto-entrepreneur"}</option>
            <option>{lang === "ar" ? "شركة" : "Société"}</option>
          </Select>
          <Select className="w-48">
            <option>{lang === "ar" ? "كل المدن" : "Toutes les villes"}</option>
            <option>Casablanca</option>
            <option>Rabat</option>
            <option>Marrakech</option>
            <option>Tanger</option>
            <option>Fès</option>
          </Select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 text-xs text-muted-foreground">
                <th className="px-4 py-3 text-start w-10"><input type="checkbox" /></th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "الاسم" : "Nom"}</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "النوع" : "Type"}</th>
                <th className="px-4 py-3 text-start font-medium">ICE</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "الهاتف" : "Téléphone"}</th>
                <th className="px-4 py-3 text-start font-medium">{lang === "ar" ? "المدينة" : "Ville"}</th>
                <th className="px-4 py-3 text-end font-medium">{lang === "ar" ? "الرصيد المستحق" : "Solde dû"}</th>
                <th className="px-4 py-3 text-end font-medium">{lang === "ar" ? "إجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => {
                const Icon = typeIcon[c.type as keyof typeof typeIcon];
                return (
                  <tr key={c.id} className={`border-t border-border hover:bg-primary/5 cursor-pointer ${i % 2 ? "bg-secondary/30" : ""}`}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                    <td className="px-4 py-3"><Link to="/clients/$id" params={{ id: c.id }} className="font-medium hover:text-primary">{c.name}</Link></td>
                    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{c.type === "company" ? (lang === "ar" ? "شركة" : "Société") : c.type === "auto" ? (lang === "ar" ? "مقاول ذاتي" : "Auto-ent.") : (lang === "ar" ? "خاص" : "Particulier")}</span></td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.ice}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.phone}</td>
                    <td className="px-4 py-3">{c.city}</td>
                    <td className={`px-4 py-3 text-end tabular-nums font-medium ${c.balance > 0 ? "text-danger" : "text-muted-foreground"}`}>{c.balance > 0 ? formatCurrency(c.balance) : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-8 w-8 rounded hover:bg-primary/10 text-success flex items-center justify-center" title={t("view")}><Eye className="h-4 w-4" /></button>
                        <button className="h-8 w-8 rounded hover:bg-secondary text-muted-foreground flex items-center justify-center" title={t("edit")}><Pencil className="h-4 w-4" /></button>
                        <button className="h-8 w-8 rounded hover:bg-danger/10 text-danger flex items-center justify-center" title={t("delete")}><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <span>{lang === "ar" ? `إظهار 1-${clients.length} من ${clients.length}` : `Affichage 1-${clients.length} sur ${clients.length}`}</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-border hover:bg-secondary">‹</button>
            <button className="px-2.5 py-1 rounded border border-primary bg-primary text-white">1</button>
            <button className="px-2 py-1 rounded border border-border hover:bg-secondary">›</button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}

void StatusBadge;
