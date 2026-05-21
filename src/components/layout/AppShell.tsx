import { createContext, useContext, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useI18n } from "@/lib/i18n";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };
const MobileNavCtx = createContext<Ctx>({ open: false, setOpen: () => {}, toggle: () => {} });
export const useMobileNav = () => useContext(MobileNavCtx);

export function AppShell({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <MobileNavCtx.Provider value={{ open, setOpen, toggle: () => setOpen(!open) }}>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <Header />
        <main
          className={
            "pt-16 min-h-screen " +
            (dir === "rtl" ? "lg:pr-[260px]" : "lg:pl-[260px]")
          }
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </MobileNavCtx.Provider>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={"bg-card rounded-lg border border-border shadow-card " + className} {...rest}>
      {children}
    </div>
  );
}
