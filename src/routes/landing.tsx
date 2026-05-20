import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui-kit";
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Calculator,
  Users,
  ShieldCheck,
  Globe,
  BarChart3,
  Truck,
  Receipt,
  FileSignature,
  Zap,
  Lock,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "InvoicePro — Facturation DGI Maroc" },
      { name: "description", content: "Système de facturation marocain conforme DGI — devis, factures, TVA, retenue à la source." },
      { property: "og:title", content: "InvoicePro — Facturation DGI Maroc" },
      { property: "og:description", content: "Système de facturation marocain conforme DGI — devis, factures, TVA, retenue à la source." },
    ],
  }),
});

function LandingPage() {
  const { lang, setLang, dir } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();

  const tr = (fr: string, ar: string) => (lang === "ar" ? ar : fr);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/landing" className="flex items-center gap-2">
              <div className="relative flex items-center">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  InvoicePro
                </span>
                <span className="absolute -top-0.5 -right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              </div>
            </Link>

            {/* Center nav links (hidden on mobile) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">
                {tr("Fonctionnalités", "الميزات")}
              </a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                {tr("Comment ça marche", "كيف يعمل")}
              </a>
              <a href="#pricing" className="hover:text-foreground transition-colors">
                {tr("Tarifs", "الأسعار")}
              </a>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
                className="h-9 w-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Language switcher */}
              <div className="flex gap-1 text-xs rounded-md border border-border bg-card p-1">
                <button
                  onClick={() => setLang("fr")}
                  className={`px-2 py-1 rounded transition-colors ${
                    lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang("ar")}
                  className={`px-2 py-1 rounded transition-colors ${
                    lang === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AR
                </button>
              </div>

              {/* Auth buttons */}
              <div className="hidden sm:flex items-center gap-2 ms-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                >
                  {tr("Connexion", "تسجيل الدخول")}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover shadow-sm"
                >
                  {tr("S'inscrire", "إنشاء حساب")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              {tr("Conforme DGI Maroc", "متوافق مع الضرائب المغربية")}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
              {tr(
                "La facturation marocaine, simplifiée et conforme.",
                "الفوترة المغربية، بسيطة ومتوفقة."
              )}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {tr(
                "InvoicePro est le SaaS de facturation conçu pour les entreprises marocaines. Devis, factures, bons de livraison et déclarations TVA — le tout 100 % conforme à la DGI.",
                "InvoicePro هو نظام الفوترة المصمم للشركات المغربية. عروض الأسعار، الفواتير، بيانات التسليم وإقرارات الضريبة — كل ذلك 100% متوافق مع الضرائب."
              )}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover shadow-sm"
              >
                {tr("Commencer gratuitement", "ابدأ مجاناً")}
                <Arrow className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {tr("Se connecter", "تسجيل الدخول")}
              </Link>
            </div>

            {/* Trust mini-bar */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {tr("DGI conforme", "متوافق مع الضرائب")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {tr("Bilingue FR / AR", "ثنائي اللغة")}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {tr("Support technique", "دعم فني")}
              </span>
            </div>
          </div>

          {/* Hero visual / abstract invoice card */}
          <div className="mt-16 mx-auto max-w-4xl">
            <div className="relative rounded-xl border border-border bg-card shadow-pop p-6 md:p-8 overflow-hidden">
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mini stat cards inside hero visual */}
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tr("CA HT Mensuel", "رقم الأعمال الشهري")}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-foreground">245 680 MAD</div>
                  <div className="mt-1 text-xs text-success flex items-center gap-1">
                    <Zap className="h-3 w-3" /> +12,4 %
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tr("Factures émises", "الفواتير الصادرة")}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-foreground">1 284</div>
                  <div className="mt-1 text-xs text-success flex items-center gap-1">
                    <Zap className="h-3 w-3" /> +8,2 %
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {tr("Clients actifs", "العملاء النشطون")}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-foreground">86</div>
                  <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {tr("ce mois", "هذا الشهر")}
                  </div>
                </div>
              </div>

              {/* Mini chart visual */}
              <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    {tr("Évolution du CA HT", "تطور رقم الأعمال")}
                  </span>
                  <span className="text-xs text-muted-foreground">2026</span>
                </div>
                <div className="h-16 flex items-end gap-1.5">
                  {[35, 48, 40, 60, 55, 75, 65, 78, 72, 90, 84, 96].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-primary/80 hover:bg-primary transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust strip */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {tr("Factures générées", "فاتورة مُنشأة")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {tr("Entreprises", "شركة")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99,9%</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {tr("Disponibilité", "توفر")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {tr("Support client", "دعم العملاء")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {tr("Tout ce qu'il faut pour facturer au Maroc", "كل ما تحتاجه للفوترة في المغرب")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {tr(
                "Une suite complète couvrant le cycle de vente de A à Z, avec la conformité DGI intégrée.",
                "حل متكامل يغطي دورة المبيعات من الألف إلى الياء، مع الالتزام الضريبي المدمج."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={FileText}
              title={tr("Documents commerciaux", "المستندات التجارية")}
              description={tr(
                "Créez des devis, factures, bons de livraison et avoirs avec numérotation automatique conforme DGI.",
                "أنشئ عروض أسعار وفواتير وبيانات تسليم وإشعارات دائنة مع الترقيم التلقائي المتوافق."
              )}
            />
            <FeatureCard
              icon={Calculator}
              title={tr("TVA & Retenue", "الضريبة والاقتطاع")}
              description={tr(
                "Calculs automatiques de la TVA (20 %, 14 %, 10 %, 7 %) et de la retenue à la source selon la réglementation marocaine.",
                "حسابات تلقائية للضريبة (20%، 14%، 10%، 7%) والاقتطاع وفقاً للتنظيم المغربي."
              )}
            />
            <FeatureCard
              icon={Users}
              title={tr("Gestion clients", "إدارة العملاء")}
              description={tr(
                "Annuaire clients avec historique complet, fiches détaillées et suivi des créances.",
                "دليل العملاء مع السجل الكامل والبطاقات التفصيلية ومتابعة المطالبات."
              )}
            />
            <FeatureCard
              icon={Globe}
              title={tr("Bilingue natif", "ثنائي اللغة")}
              description={tr(
                "Interface complète en français (LTR) et arabe (RTL). Basculez en un clic.",
                "واجهة كاملة بالفرنسية (من اليسار) والعربية (من اليمين). التبديل بنقرة واحدة."
              )}
            />
            <FeatureCard
              icon={BarChart3}
              title={tr("Rapports & Analyses", "التقارير والتحليلات")}
              description={tr(
                "Journal des ventes, déclaration de TVA, balance âgée et analyse de chiffre d'affaires exportables.",
                "سجل المبيعات وإقرار الضريبة وتقرير الأعمار وتحليل الأعمال قابل للتصدير."
              )}
            />
            <FeatureCard
              icon={ShieldCheck}
              title={tr("Sécurité cloud", "الأمان السحابي")}
              description={tr(
                "Hébergement sécurisé, sauvegardes automatiques et conformité aux standards de protection des données.",
                "استضافة آمنة، نسخ احتياطي تلقائي والامتثال لمعايير حماية البيانات."
              )}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {tr("Comment ça marche ?", "كيف يعمل؟")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {tr(
                "Trois étapes simples pour émettre votre première facture conforme DGI.",
                "ثلاث خطوات بسيطة لإصدار فاتورتك الأولى المتوافقة."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              icon={Users}
              title={tr("Configurez votre entité", "قم بإعداد كيانك")}
              description={tr(
                "Renseignez vos informations fiscales (ICE, IF, CNSS, RC) et personnalisez vos paramètres.",
                "أدخل معلوماتك الضريبية (ICE، IF، CNSS، RC) وخصص إعداداتك."
              )}
            />
            <StepCard
              step="2"
              icon={Receipt}
              title={tr("Créez vos documents", "أنشئ مستنداتك")}
              description={tr(
                "Générez des devis et factures avec calcul automatique de la TVA et retenue à la source.",
                "أنشئ عروض أسعار وفواتير مع الحساب التلقائي للضريبة والاقتطاع."
              )}
            />
            <StepCard
              step="3"
              icon={BarChart3}
              title={tr("Suivez & analysez", "تابع وحلل")}
              description={tr(
                "Envoyez par email, suivez les paiements et exportez vos rapports pour la DGI.",
                "أرسل بالبريد، تابع المدفوعات وصدر تقاريرك للضرائب."
              )}
            />
          </div>
        </div>
      </section>

      {/* Document types showcase */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {tr("Tous vos documents en un seul outil", "جميع مستنداتك في أداة واحدة")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {tr(
                "Devis, factures, bons de livraison et avoirs — chacun avec sa propre numérotation et son suivi.",
                "عروض أسعار، فواتير، بيانات تسليم وإشعارات دائنة — لكل منها ترقيمه الخاص ومتابعته."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DocTypeCard
              icon={FileSignature}
              label={tr("Devis", "عروض الأسعار")}
              color="bg-info/10 text-info"
            />
            <DocTypeCard
              icon={Receipt}
              label={tr("Factures", "الفواتير")}
              color="bg-primary/10 text-primary"
            />
            <DocTypeCard
              icon={Truck}
              label={tr("Bons de livraison", "بيانات التسليم")}
              color="bg-warning/10 text-warning"
            />
            <DocTypeCard
              icon={FileText}
              label={tr("Avoirs", "إشعارات دائنة")}
              color="bg-destructive/10 text-destructive"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top_right,oklch(0.7_0.15_152/0.3),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_bottom_left,oklch(0.35_0.13_152/0.4),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">
            {tr("Prêt à simplifier votre facturation ?", "مستعد لتبسيط فوترتك؟")}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {tr(
              "Rejoignez les entreprises marocaines qui font confiance à InvoicePro pour leur conformité fiscale.",
              "انضم إلى الشركات المغربية التي تثق بـ InvoicePro لالتزامها الضريبي."
            )}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-white/90 shadow-sm"
            >
              {tr("Créer un compte gratuit", "إنشاء حساب مجاني")}
              <Arrow className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 bg-transparent px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {tr("J'ai déjà un compte", "لدي حساب بالفعل")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="relative inline-flex items-center">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  InvoicePro
                </span>
                <span className="absolute -top-0.5 -right-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {tr(
                  "Système de facturation marocain conforme DGI. Pour les entreprises et professionnels.",
                  "نظام فوترة مغربي متوافق مع الضرائب. للشركات والمهنيين."
                )}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {tr("Produit", "المنتج")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">{tr("Fonctionnalités", "الميزات")}</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">{tr("Tarifs", "الأسعار")}</a></li>
                <li><Link to="/register" className="hover:text-foreground transition-colors">{tr("Inscription", "التسجيل")}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {tr("Légal", "قانوني")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{tr("Conditions d'utilisation", "شروط الاستخدام")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{tr("Politique de confidentialité", "سياسة الخصوصية")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{tr("Mentions légales", "إشعار قانوني")}</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {tr("Contact", "اتصل")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">support@invoicepro.ma</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">+212 5XX-XXXXXX</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Casablanca, Maroc</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p> InvoicePro. {tr("Tous droits réservés.", "جميع الحقوق محفوظة.")}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" />
                {tr("Sécurisé", "آمن")}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                DGI
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all hover:shadow-pop hover:-translate-y-0.5">
      <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-xl border border-border bg-card p-6 text-center">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm">
        {step}
      </div>
      <div className="mt-4 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function DocTypeCard({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 transition-all hover:shadow-pop hover:-translate-y-0.5">
      <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
