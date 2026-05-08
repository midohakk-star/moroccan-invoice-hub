import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

type Dict = Record<string, { fr: string; ar: string }>;

export const T: Dict = {
  appName: { fr: "InvoicePro", ar: "إنفويس برو" },
  // Nav
  dashboard: { fr: "Tableau de bord", ar: "لوحة القيادة" },
  clients: { fr: "Clients", ar: "العملاء" },
  products: { fr: "Produits", ar: "المنتجات" },
  documents: { fr: "Documents", ar: "المستندات" },
  quotes: { fr: "Devis", ar: "عروض الأسعار" },
  deliveryNotes: { fr: "Bons de livraison", ar: "بيانات التسليم" },
  invoices: { fr: "Factures", ar: "الفواتير" },
  creditNotes: { fr: "Avoirs", ar: "إشعارات دائنة" },
  reports: { fr: "Rapports", ar: "التقارير" },
  salesJournal: { fr: "Journal des ventes", ar: "سجل المبيعات" },
  vatDeclaration: { fr: "Déclaration de TVA", ar: "إقرار الضريبة" },
  agingReport: { fr: "Balance âgée", ar: "تقرير الأعمار" },
  turnover: { fr: "Analyse CA", ar: "تحليل رقم الأعمال" },
  settings: { fr: "Paramètres", ar: "الإعدادات" },
  profile: { fr: "Profil utilisateur", ar: "الملف الشخصي" },
  entity: { fr: "Entité", ar: "الكيان" },
  logout: { fr: "Déconnexion", ar: "تسجيل الخروج" },
  // Common
  search: { fr: "Rechercher...", ar: "بحث..." },
  new: { fr: "Nouveau", ar: "جديد" },
  edit: { fr: "Modifier", ar: "تعديل" },
  delete: { fr: "Supprimer", ar: "حذف" },
  view: { fr: "Voir", ar: "عرض" },
  cancel: { fr: "Annuler", ar: "إلغاء" },
  save: { fr: "Enregistrer", ar: "حفظ" },
  draft: { fr: "Brouillon", ar: "مسودة" },
  finalize: { fr: "Finaliser", ar: "إنهاء" },
  import: { fr: "Importer", ar: "استيراد" },
  export: { fr: "Exporter", ar: "تصدير" },
  filter: { fr: "Filtrer", ar: "تصفية" },
  status: { fr: "Statut", ar: "الحالة" },
  total: { fr: "Total", ar: "المجموع" },
  date: { fr: "Date", ar: "التاريخ" },
  client: { fr: "Client", ar: "العميل" },
  amount: { fr: "Montant", ar: "المبلغ" },
  // Dashboard
  caHt: { fr: "CA HT du mois", ar: "رقم الأعمال خارج الضريبة" },
  receivables: { fr: "Créances clients", ar: "ديون العملاء" },
  overdue: { fr: "Factures en retard", ar: "فواتير متأخرة" },
  pendingQuotes: { fr: "Devis en attente", ar: "عروض قيد الانتظار" },
  caEvolution: { fr: "Évolution du CA HT", ar: "تطور رقم الأعمال" },
  topClients: { fr: "Top 5 clients", ar: "أفضل 5 عملاء" },
  recentActivity: { fr: "Activité récente", ar: "النشاط الأخير" },
  // Status
  s_draft: { fr: "Brouillon", ar: "مسودة" },
  s_sent: { fr: "Envoyé", ar: "مرسل" },
  s_accepted: { fr: "Accepté", ar: "مقبول" },
  s_paid: { fr: "Payé", ar: "مدفوع" },
  s_cancelled: { fr: "Annulé", ar: "ملغى" },
  s_overdue: { fr: "En retard", ar: "متأخر" },
  s_expired: { fr: "Expiré", ar: "منتهي" },
};

type I18n = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof T) => string;
  dir: "ltr" | "rtl";
  formatDate: (d: Date) => string;
  formatCurrency: (n: number) => string;
};

const Ctx = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "fr" || stored === "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const dir = lang === "ar" ? "rtl" : "ltr";

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return lang === "ar" ? `${yyyy}/${mm}/${dd}` : `${dd}/${mm}/${yyyy}`;
  };

  const formatCurrency = (n: number) => {
    const formatted = n
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formatted} MAD`;
  };

  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: setLangState,
        t: (k) => T[k]?.[lang] ?? String(k),
        dir,
        formatDate,
        formatCurrency,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
