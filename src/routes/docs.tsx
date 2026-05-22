import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Input } from "@/components/ui-kit";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState, useEffect } from "react";
import {
  Rocket,
  Users,
  Package,
  FileText,
  BarChart3,
  Settings as SettingsIcon,
  Building2,
  HelpCircle,
  Search,
  ChevronRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — InvoicePro" },
      { name: "description", content: "Guide complet pour utiliser InvoicePro." },
    ],
  }),
  component: DocsPage,
});

type SectionKey =
  | "getting-started"
  | "clients"
  | "products"
  | "documents"
  | "reports"
  | "business"
  | "settings"
  | "faq";

type Article = { q: { fr: string; ar: string }; a: { fr: string; ar: string } };
type Section = {
  key: SectionKey;
  icon: React.ComponentType<{ className?: string }>;
  title: { fr: string; ar: string };
  tagline: { fr: string; ar: string };
  articles: Article[];
};

const SECTIONS: Section[] = [
  {
    key: "getting-started",
    icon: Rocket,
    title: { fr: "Démarrage rapide", ar: "البدء السريع" },
    tagline: {
      fr: "Configurez votre compte en 5 minutes.",
      ar: "قم بإعداد حسابك في 5 دقائق.",
    },
    articles: [
      {
        q: { fr: "Créer votre compte", ar: "إنشاء حسابك" },
        a: {
          fr: "Inscrivez-vous depuis la page Inscription, confirmez votre email puis connectez-vous pour accéder au tableau de bord.",
          ar: "سجّل من صفحة التسجيل، أكّد بريدك الإلكتروني ثم سجّل الدخول للوصول إلى لوحة القيادة.",
        },
      },
      {
        q: { fr: "Configurer votre entité légale", ar: "إعداد كيانك القانوني" },
        a: {
          fr: "Rendez-vous dans Paramètres → Entité pour renseigner ICE, IF, Patente, RC, RIB et téléverser logo, cachet et signature.",
          ar: "اذهب إلى الإعدادات ← الكيان لإدخال ICE وIF والباتنتا وRC وRIB، وتحميل الشعار والختم والتوقيع.",
        },
      },
      {
        q: { fr: "Inviter votre équipe", ar: "دعوة فريقك" },
        a: {
          fr: "Depuis Paramètres → Profil, partagez votre lien d'entité avec vos collaborateurs.",
          ar: "من الإعدادات ← الملف الشخصي، شارك رابط الكيان مع زملائك.",
        },
      },
    ],
  },
  {
    key: "clients",
    icon: Users,
    title: { fr: "Clients", ar: "العملاء" },
    tagline: {
      fr: "Gérer votre portefeuille B2B et B2C.",
      ar: "إدارة محفظة عملائك B2B وB2C.",
    },
    articles: [
      {
        q: { fr: "Ajouter un client société", ar: "إضافة عميل شركة" },
        a: {
          fr: "Clients → Nouveau. Renseignez raison sociale, ICE, IF, Patente, RC et le représentant légal.",
          ar: "العملاء ← جديد. أدخل الاسم التجاري وICE وIF والباتنتا وRC والممثل القانوني.",
        },
      },
      {
        q: { fr: "Activer / désactiver un client", ar: "تفعيل / تعطيل عميل" },
        a: {
          fr: "Sur la fiche client, utilisez le toggle Actif. Les clients inactifs n'apparaissent plus dans les nouveaux documents.",
          ar: "في بطاقة العميل، استخدم زر التفعيل. لا يظهر العملاء غير النشطين في المستندات الجديدة.",
        },
      },
    ],
  },
  {
    key: "products",
    icon: Package,
    title: { fr: "Catalogue produits", ar: "كتالوج المنتجات" },
    tagline: {
      fr: "Vos produits et services à portée de clic.",
      ar: "منتجاتك وخدماتك في متناول النقر.",
    },
    articles: [
      {
        q: { fr: "Créer un produit", ar: "إنشاء منتج" },
        a: {
          fr: "Produits → Nouveau. Indiquez désignation, prix HT, taux de TVA (20/14/10/7/0%) et unité.",
          ar: "المنتجات ← جديد. أدخل الوصف والسعر بدون ضريبة ونسبة TVA والوحدة.",
        },
      },
      {
        q: { fr: "Produits exonérés", ar: "منتجات معفاة" },
        a: {
          fr: "Cochez Exonéré et précisez le motif légal (article du CGI) pour qu'il apparaisse sur la facture.",
          ar: "ضع علامة معفى وحدّد السبب القانوني (مادة CGI) ليظهر في الفاتورة.",
        },
      },
    ],
  },
  {
    key: "documents",
    icon: FileText,
    title: { fr: "Devis & factures", ar: "العروض والفواتير" },
    tagline: {
      fr: "Cycle complet du devis à l'avoir.",
      ar: "الدورة الكاملة من العرض إلى الإشعار الدائن.",
    },
    articles: [
      {
        q: { fr: "Créer une facture", ar: "إنشاء فاتورة" },
        a: {
          fr: "Documents → Nouveau → Facture. Sélectionnez le client, ajoutez des lignes depuis le catalogue, la TVA et le total sont calculés automatiquement.",
          ar: "المستندات ← جديد ← فاتورة. اختر العميل وأضف الأسطر من الكتالوج، تُحسب TVA والمجموع تلقائياً.",
        },
      },
      {
        q: { fr: "Retenue à la source", ar: "الاقتطاع من المنبع" },
        a: {
          fr: "Activez la retenue sur la facture, le taux (10% prestations standards) est appliqué et le net à payer recalculé.",
          ar: "فعّل الاقتطاع في الفاتورة، تُطبَّق النسبة (10% للخدمات العادية) ويُعاد حساب الصافي المستحق.",
        },
      },
      {
        q: { fr: "Émettre un avoir", ar: "إصدار إشعار دائن" },
        a: {
          fr: "Depuis une facture finalisée, cliquez sur Créer un avoir. Le numéro AVR est généré automatiquement.",
          ar: "من فاتورة مُنهاة، انقر إنشاء إشعار دائن. يُولَّد رقم AVR تلقائياً.",
        },
      },
    ],
  },
  {
    key: "reports",
    icon: BarChart3,
    title: { fr: "Rapports & fiscalité", ar: "التقارير والضرائب" },
    tagline: {
      fr: "Conformité DGI sans effort.",
      ar: "الامتثال لـ DGI بدون جهد.",
    },
    articles: [
      {
        q: { fr: "Journal des ventes", ar: "سجل المبيعات" },
        a: {
          fr: "Rapports → Journal des ventes. Exportez en Excel ou PDF, conforme DGI.",
          ar: "التقارير ← سجل المبيعات. صدّر بصيغة Excel أو PDF، متوافق مع DGI.",
        },
      },
      {
        q: { fr: "Déclaration de TVA", ar: "إقرار TVA" },
        a: {
          fr: "Rapports → TVA. Choisissez la période (mensuelle/trimestrielle), les bases et taxes sont consolidées par taux.",
          ar: "التقارير ← TVA. اختر الفترة (شهرية/فصلية)، تُجمَّع القواعد والضرائب حسب النسبة.",
        },
      },
      {
        q: { fr: "Balance âgée", ar: "تقرير الأعمار" },
        a: {
          fr: "Visualisez les créances par tranche : 0-30, 31-60, 61-90, 90+ jours.",
          ar: "اعرض الديون حسب الفئة: 0-30، 31-60، 61-90، أكثر من 90 يوماً.",
        },
      },
    ],
  },
  {
    key: "business",
    icon: Building2,
    title: { fr: "Activité & multi-entités", ar: "النشاط والكيانات المتعددة" },
    tagline: {
      fr: "Gérez plusieurs sociétés depuis un seul compte.",
      ar: "أدر عدة شركات من حساب واحد.",
    },
    articles: [
      {
        q: { fr: "Changer d'entité active", ar: "تغيير الكيان النشط" },
        a: {
          fr: "Utilisez le sélecteur d'entité dans l'en-tête pour basculer entre vos sociétés.",
          ar: "استخدم محدد الكيان في الرأس للتبديل بين شركاتك.",
        },
      },
      {
        q: { fr: "Numérotation des documents", ar: "ترقيم المستندات" },
        a: {
          fr: "Paramètres → Entité → Numérotation. Personnalisez le préfixe et la séquence annuelle (ex. FAC-2026-00001).",
          ar: "الإعدادات ← الكيان ← الترقيم. خصّص البادئة والتسلسل السنوي (مثل FAC-2026-00001).",
        },
      },
    ],
  },
  {
    key: "settings",
    icon: SettingsIcon,
    title: { fr: "Compte & sécurité", ar: "الحساب والأمان" },
    tagline: {
      fr: "Votre compte, vos règles.",
      ar: "حسابك، قواعدك.",
    },
    articles: [
      {
        q: { fr: "Changer de mot de passe", ar: "تغيير كلمة المرور" },
        a: {
          fr: "Paramètres → Profil → Sécurité. Votre nouveau mot de passe prend effet immédiatement.",
          ar: "الإعدادات ← الملف الشخصي ← الأمان. تسري كلمة المرور الجديدة فوراً.",
        },
      },
      {
        q: { fr: "Déconnecter tous les appareils", ar: "تسجيل الخروج من كل الأجهزة" },
        a: {
          fr: "Paramètres → Profil → Sécurité → Se déconnecter de tous les appareils.",
          ar: "الإعدادات ← الملف الشخصي ← الأمان ← تسجيل الخروج من جميع الأجهزة.",
        },
      },
    ],
  },
  {
    key: "faq",
    icon: HelpCircle,
    title: { fr: "FAQ", ar: "الأسئلة الشائعة" },
    tagline: {
      fr: "Réponses aux questions courantes.",
      ar: "إجابات على الأسئلة الشائعة.",
    },
    articles: [
      {
        q: { fr: "Mes données sont-elles sécurisées ?", ar: "هل بياناتي آمنة؟" },
        a: {
          fr: "Toutes les données sont chiffrées en transit (TLS) et au repos. Sauvegardes quotidiennes hébergées au Maroc.",
          ar: "تُشفَّر جميع البيانات أثناء النقل (TLS) وعند التخزين. النسخ الاحتياطي يومي ومستضاف في المغرب.",
        },
      },
      {
        q: { fr: "Puis-je exporter mes données ?", ar: "هل يمكنني تصدير بياناتي؟" },
        a: {
          fr: "Oui, exports Excel/PDF sur tous les rapports et listes. Export complet disponible sur demande.",
          ar: "نعم، تصدير Excel/PDF لجميع التقارير والقوائم. التصدير الكامل متاح عند الطلب.",
        },
      },
    ],
  },
];

function DocsPage() {
  const { lang, dir } = useI18n();
  const [active, setActive] = useState<SectionKey>("getting-started");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return SECTIONS;
    const q = query.toLowerCase();
    return SECTIONS.map((s) => ({
      ...s,
      articles: s.articles.filter(
        (a) =>
          a.q[lang].toLowerCase().includes(q) ||
          a.a[lang].toLowerCase().includes(q),
      ),
    })).filter((s) => s.articles.length > 0 || s.title[lang].toLowerCase().includes(q));
  }, [query, lang]);

  // Smooth scroll on nav click
  useEffect(() => {
    const el = document.getElementById(`sec-${active}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  return (
    <AppShell>
      <PageHeader
        title={lang === "ar" ? "مركز التوثيق" : "Centre de documentation"}
        description={
          lang === "ar"
            ? "كل ما تحتاجه لإتقان InvoicePro."
            : "Tout ce qu'il faut pour maîtriser InvoicePro."
        }
      />

      {/* Hero search */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-10 mb-8">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            {lang === "ar" ? "محدّث" : "Mis à jour"} · v2.4
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
            {lang === "ar" ? "كيف يمكننا مساعدتك؟" : "Comment pouvons-nous vous aider ?"}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {lang === "ar"
              ? "ابحث في الأدلة، الأسئلة الشائعة، والمواضيع الضريبية."
              : "Cherchez dans les guides, FAQ et thèmes fiscaux."}
          </p>
          <div className="relative">
            <Search
              className={
                "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground " +
                (dir === "rtl" ? "right-3" : "left-3")
              }
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "ar" ? "ابحث عن موضوع..." : "Rechercher un sujet..."}
              className={(dir === "rtl" ? "pr-10" : "pl-10") + " h-11 text-base"}
            />
          </div>
        </div>
      </div>

      {/* Section cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={
                "group text-start rounded-xl border p-4 transition-all " +
                (isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/40 hover:bg-primary/5")
              }
            >
              <div
                className={
                  "h-9 w-9 rounded-lg flex items-center justify-center mb-3 transition-colors " +
                  (isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground")
                }
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold mb-1">{s.title[lang]}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{s.tagline[lang]}</div>
            </button>
          );
        })}
      </div>

      {/* Body : sticky TOC + content */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 pb-2 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              {lang === "ar" ? "الأقسام" : "Sections"}
            </div>
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={
                    "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors " +
                    (isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="truncate">{s.title[lang]}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-10 min-w-0">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
              {lang === "ar" ? "لا توجد نتائج." : "Aucun résultat."}
            </div>
          )}
          {filtered.map((s) => {
            const Icon = s.icon;
            return (
              <section key={s.key} id={`sec-${s.key}`} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground">{s.tagline[lang]}</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
                  {s.articles.map((a, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between gap-3 cursor-pointer p-4 hover:bg-secondary/50 transition-colors list-none">
                        <span className="text-sm font-medium">{a.q[lang]}</span>
                        <ChevronRight
                          className={
                            "h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 " +
                            (dir === "rtl" ? "rotate-180 group-open:-rotate-90" : "")
                          }
                        />
                      </summary>
                      <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {a.a[lang]}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Contact card */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <div className="text-sm font-semibold mb-1">
                {lang === "ar" ? "لم تجد إجابتك؟" : "Vous ne trouvez pas votre réponse ?"}
              </div>
              <div className="text-xs text-muted-foreground">
                {lang === "ar"
                  ? "فريق الدعم متاح من الاثنين إلى الجمعة، 9 صباحاً - 6 مساءً."
                  : "Notre équipe support est disponible du lundi au vendredi, 9h - 18h."}
              </div>
            </div>
            <a
              href="mailto:support@invoicepro.ma"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {lang === "ar" ? "تواصل مع الدعم" : "Contacter le support"}
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
