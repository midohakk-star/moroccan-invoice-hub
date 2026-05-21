import { Bell, Search, Languages, ChevronDown, Building2, Moon, Sun, Menu } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useMobileNav } from "./AppShell";
import { Link, useRouterState } from "@tanstack/react-router";

export function Header() {
  const { t, lang, setLang, dir } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const { toggle: toggleNav } = useMobileNav();
  const path = useRouterState({ select: (r) => r.location.pathname });

  const segments = path.split("/").filter(Boolean);
  const crumbs = [
    { label: dir === "rtl" ? "الرئيسية" : "Accueil", to: "/" },
    ...segments.map((s, i) => ({
      label: prettify(s, lang),
      to: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-20 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 " +
        (dir === "rtl" ? "lg:right-[260px] lg:left-0" : "lg:left-[260px] lg:right-0")
      }
    >
      <button
        onClick={toggleNav}
        aria-label="Menu"
        className="lg:hidden h-9 w-9 rounded-md border border-border hover:bg-secondary flex items-center justify-center shrink-0"
      >
        <Menu className="h-4 w-4" />
      </button>

      <nav className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground min-w-0 overflow-hidden">
        {crumbs.map((c, i) => (
          <span key={c.to} className="flex items-center gap-1.5 whitespace-nowrap">
            {i > 0 && <span className="text-border">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="text-foreground font-medium truncate">{c.label}</span>
            ) : (
              <Link to={c.to} className="hover:text-primary">{c.label}</Link>
            )}
          </span>
        ))}
      </nav>

      <div className={"flex items-center gap-2 sm:gap-3 " + (dir === "rtl" ? "mr-auto" : "ml-auto")}>
        <div className="relative hidden md:block">
          <Search className={"absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground " + (dir === "rtl" ? "right-3" : "left-3")} />
          <input
            placeholder={t("search")}
            className={"w-48 xl:w-64 h-9 rounded-md border border-border bg-secondary/50 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary " + (dir === "rtl" ? "pr-9 pl-3 text-right" : "pl-9 pr-3")}
          />
        </div>


        <button className="relative h-9 w-9 rounded-md border border-border hover:bg-secondary flex items-center justify-center">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
          className="h-9 w-9 rounded-md border border-border hover:bg-secondary flex items-center justify-center"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
          className="h-9 px-3 rounded-md border border-border hover:bg-secondary flex items-center gap-1.5 text-sm font-medium"
        >
          <Languages className="h-4 w-4" />
          {lang === "fr" ? "FR" : "AR"}
        </button>

        <button className="hidden sm:flex h-9 px-3 rounded-md border border-border hover:bg-secondary items-center gap-2 text-sm font-medium">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="hidden md:inline truncate max-w-[140px]">SARL Atlas Trade</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

function prettify(s: string, lang: "fr" | "ar") {
  const map: Record<string, { fr: string; ar: string }> = {
    clients: { fr: "Clients", ar: "العملاء" },
    products: { fr: "Produits", ar: "المنتجات" },
    documents: { fr: "Documents", ar: "المستندات" },
    new: { fr: "Créer", ar: "إنشاء" },
    journal: { fr: "Journal des ventes", ar: "سجل المبيعات" },
    tva: { fr: "TVA", ar: "الضريبة" },
    aging: { fr: "Balance âgée", ar: "تقرير الأعمار" },
    turnover: { fr: "Analyse CA", ar: "تحليل رقم الأعمال" },
    settings: { fr: "Paramètres", ar: "الإعدادات" },
    profile: { fr: "Profil", ar: "الملف" },
    entity: { fr: "Entité", ar: "الكيان" },
  };
  return map[s]?.[lang] ?? s;
}
