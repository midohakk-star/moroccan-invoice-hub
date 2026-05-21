import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  LogOut,
  FileSignature,
  Truck,
  Receipt,
  RotateCcw,
  BookOpen,
  Percent,
  Clock,
  TrendingUp,
  UserCog,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useMobileNav } from "./AppShell";

type NavItem = {
  to?: string;
  labelKey: keyof ReturnType<typeof getNoop>;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
};
const getNoop = () => ({} as Record<string, string>);

export function Sidebar() {
  const { t, dir } = useI18n();
  const nav = useNavigate();
  const logout = async () => {
    await fetch("/api/v1/logout", { method: "POST" }).catch(() => {});
    if (typeof window !== "undefined") localStorage.removeItem("token");
    nav({ to: "/login" });
  };
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [docsOpen, setDocsOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const isActive = (p: string) => path === p || (p !== "/" && path.startsWith(p));

  const linkClass = (active: boolean) =>
    [
      "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-[oklch(0.32_0.10_152)]/30 text-white"
        : "text-[color:var(--color-sidebar-muted)] hover:text-white hover:bg-white/5",
    ].join(" ");

  const ActiveBar = ({ show }: { show: boolean }) =>
    show ? (
      <span
        className={
          dir === "rtl"
            ? "absolute right-0 top-1 bottom-1 w-1 rounded-l bg-primary"
            : "absolute left-0 top-1 bottom-1 w-1 rounded-r bg-primary"
        }
      />
    ) : null;

  return (
    <aside
      className={
        "fixed top-0 bottom-0 w-[260px] bg-sidebar text-sidebar-foreground flex flex-col z-30 " +
        (dir === "rtl" ? "right-0 border-l border-sidebar-border" : "left-0 border-r border-sidebar-border")
      }
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="relative">
          <span className="text-xl font-bold tracking-tight">{t("appName")}</span>
          <span className="absolute -top-0.5 -right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <Link to="/" className={linkClass(path === "/")}>
          <ActiveBar show={path === "/"} />
          <LayoutDashboard className="h-4 w-4" />
          <span>{t("dashboard")}</span>
        </Link>

        <Link to="/clients" className={linkClass(isActive("/clients"))}>
          <ActiveBar show={isActive("/clients")} />
          <Users className="h-4 w-4" />
          <span>{t("clients")}</span>
        </Link>

        <Link to="/products" className={linkClass(isActive("/products"))}>
          <ActiveBar show={isActive("/products")} />
          <Package className="h-4 w-4" />
          <span>{t("products")}</span>
        </Link>

        {/* Documents group */}
        <button
          onClick={() => setDocsOpen((v) => !v)}
          className={linkClass(isActive("/documents")) + " w-full justify-between"}
        >
          <span className="flex items-center gap-3">
            <ActiveBar show={isActive("/documents")} />
            <FileText className="h-4 w-4" />
            {t("documents")}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${docsOpen ? "" : "-rotate-90"}`} />
        </button>
        {docsOpen && (
          <div className={(dir === "rtl" ? "pr-8" : "pl-8") + " space-y-1"}>
            <Link to="/documents" search={{ type: "quote" } as never} className={linkClass(false) + " text-xs"}>
              <FileSignature className="h-3.5 w-3.5" /> {t("quotes")}
            </Link>
            <Link to="/documents" search={{ type: "delivery" } as never} className={linkClass(false) + " text-xs"}>
              <Truck className="h-3.5 w-3.5" /> {t("deliveryNotes")}
            </Link>
            <Link to="/documents" search={{ type: "invoice" } as never} className={linkClass(false) + " text-xs"}>
              <Receipt className="h-3.5 w-3.5" /> {t("invoices")}
            </Link>
            <Link to="/documents" search={{ type: "credit" } as never} className={linkClass(false) + " text-xs"}>
              <RotateCcw className="h-3.5 w-3.5" /> {t("creditNotes")}
            </Link>
          </div>
        )}

        {/* Reports group */}
        <button
          onClick={() => setReportsOpen((v) => !v)}
          className={linkClass(["/journal", "/tva", "/aging", "/turnover"].some(isActive)) + " w-full justify-between"}
        >
          <span className="flex items-center gap-3">
            <ActiveBar show={["/journal", "/tva", "/aging", "/turnover"].some(isActive)} />
            <BarChart3 className="h-4 w-4" />
            {t("reports")}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${reportsOpen ? "" : "-rotate-90"}`} />
        </button>
        {reportsOpen && (
          <div className={(dir === "rtl" ? "pr-8" : "pl-8") + " space-y-1"}>
            <Link to="/journal" className={linkClass(isActive("/journal")) + " text-xs"}>
              <BookOpen className="h-3.5 w-3.5" /> {t("salesJournal")}
            </Link>
            <Link to="/tva" className={linkClass(isActive("/tva")) + " text-xs"}>
              <Percent className="h-3.5 w-3.5" /> {t("vatDeclaration")}
            </Link>
            <Link to="/aging" className={linkClass(isActive("/aging")) + " text-xs"}>
              <Clock className="h-3.5 w-3.5" /> {t("agingReport")}
            </Link>
            <Link to="/turnover" className={linkClass(isActive("/turnover")) + " text-xs"}>
              <TrendingUp className="h-3.5 w-3.5" /> {t("turnover")}
            </Link>
          </div>
        )}

        {/* Settings group */}
        <button
          onClick={() => setSettingsOpen((v) => !v)}
          className={linkClass(isActive("/settings")) + " w-full justify-between"}
        >
          <span className="flex items-center gap-3">
            <ActiveBar show={isActive("/settings")} />
            <Settings className="h-4 w-4" />
            {t("settings")}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${settingsOpen ? "" : "-rotate-90"}`} />
        </button>
        {settingsOpen && (
          <div className={(dir === "rtl" ? "pr-8" : "pl-8") + " space-y-1"}>
            <Link to="/settings/profile" className={linkClass(isActive("/settings/profile")) + " text-xs"}>
              <UserCog className="h-3.5 w-3.5" /> {t("profile")}
            </Link>
            <Link to="/settings/entity" className={linkClass(isActive("/settings/entity")) + " text-xs"}>
              <Building2 className="h-3.5 w-3.5" /> {t("entity")}
            </Link>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
          YA
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">Youssef Amrani</div>
          <div className="text-xs text-sidebar-muted truncate">y.amrani@invoicepro.ma</div>
        </div>
        <button onClick={logout} className="text-sidebar-muted hover:text-white" title={t("logout")} aria-label={t("logout")}>
          <LogOut className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </button>
      </div>
    </aside>
  );
}
