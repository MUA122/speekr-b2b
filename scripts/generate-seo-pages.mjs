import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/data/blogPosts.js";
import { arabicBlogPosts } from "../src/data/arabicBlogPosts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://speekr.ai").replace(/\/+$/, "");
const now = new Date().toISOString();

const staticRoutes = [
  {
    path: "/",
    title: "Speekr.ai | AI-Powered Communication Practice Platform",
    description:
      "Practice presentations, meetings, and leadership conversations with AI. Build real communication confidence - anytime, anywhere.",
    keywords:
      "AI communication practice, presentation practice, meeting practice, leadership conversations, communication confidence, Speekr.ai",
    image: "/images/hero.png",
    type: "website",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/platform",
    title: "Speekr Platform | AI Roleplay, Coaching & Team Analytics",
    description:
      "Explore Speekr's AI communication platform for realistic roleplays, instant feedback, learning journeys, team management, analytics, and LMS integration.",
    keywords:
      "AI roleplay platform, communication coaching, team training analytics, learning journeys, LMS integration, Speekr platform",
    image: "/images/platform/micro-learning-video.png",
    type: "website",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/solutions",
    title: "Speekr Solutions | AI Practice for Sales, Care & Leadership Teams",
    description:
      "Train sales, customer care, leadership, technical, and screening teams with AI roleplays built for real workplace conversations in English and Arabic.",
    keywords:
      "sales roleplay training, customer care training, leadership communication training, AI interview screening, Arabic roleplay training",
    image: "/images/b2b-hero-premium-sales.png",
    type: "website",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/pricing",
    title: "Speekr Pricing | Plans for Individuals, Teams & Enterprise",
    description:
      "Compare Speekr pricing for individuals, teams, and enterprise. Start free, train together, or scale AI communication practice across your business.",
    keywords:
      "Speekr pricing, communication training pricing, AI roleplay plans, enterprise communication training, team training platform",
    image: "/images/pricing/pricing-asset-11.png",
    type: "website",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/blog",
    title: "Speekr Blog | Communication, Sales & Leadership Guides",
    description:
      "Explore Speekr guides on executive presence, AI sales objection handling, leadership communication, presentations, and workplace soft skills.",
    keywords:
      "Speekr blog, AI sales objection handling, executive presence, leadership communication, communication skills, AI communication coach",
    image: "/images/blog/speekr-communication-skills-ai-riyadh-cairo.png",
    type: "website",
    priority: "0.8",
    changefreq: "weekly",
  },
];

const arabicStaticRoutes = [
  {
    path: "/ar",
    sourcePath: "/",
    title: "Speekr.ai | منصة تدريب التواصل بالذكاء الاصطناعي",
    description:
      "تدرّب على العروض والاجتماعات ومحادثات القيادة مع الذكاء الاصطناعي. ابن ثقة حقيقية في التواصل في أي وقت ومن أي مكان.",
    keywords:
      "تدريب التواصل بالذكاء الاصطناعي, تدريب العروض, مهارات القيادة, Speekr.ai",
    image: "/images/hero.png",
    type: "website",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/ar/platform",
    sourcePath: "/platform",
    title: "منصة Speekr | محاكاة ذكية وتدريب وتحليلات للفِرق",
    description:
      "اكتشف منصة Speekr للتدريب على التواصل عبر محاكاة ذكية، ملاحظات فورية، مسارات تعلم، إدارة فرق، وتحليلات أداء.",
    keywords: "منصة محاكاة ذكية, تدريب التواصل, تحليلات الفرق, Speekr",
    image: "/images/platform/micro-learning-video.png",
    type: "website",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/ar/solutions",
    sourcePath: "/solutions",
    title: "حلول Speekr | تدريب ذكي للمبيعات وخدمة العملاء والقيادة",
    description:
      "درّب فرق المبيعات وخدمة العملاء والقيادة والفرق التقنية على محادثات عمل واقعية بالعربية والإنجليزية.",
    keywords: "تدريب المبيعات, تدريب خدمة العملاء, تدريب القيادة, محاكاة ذكية بالعربية",
    image: "/images/b2b-hero-premium-sales.png",
    type: "website",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/ar/pricing",
    sourcePath: "/pricing",
    title: "أسعار Speekr | خطط للأفراد والفِرق والمؤسسات",
    description:
      "قارن أسعار Speekr للأفراد والفِرق والمؤسسات. ابدأ مجاناً، أو درّب فريقك، أو وسّع تدريب التواصل داخل مؤسستك.",
    keywords: "أسعار Speekr, خطط تدريب التواصل, تدريب الفرق بالذكاء الاصطناعي",
    image: "/images/pricing/pricing-asset-11.png",
    type: "website",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/ar/blog",
    sourcePath: "/blog",
    title: "مدونة Speekr | أدلة التواصل والمبيعات والقيادة",
    description:
      "اقرأ أدلة Speekr حول الحضور التنفيذي، التعامل مع اعتراضات البيع، التواصل القيادي، العروض، ومهارات العمل.",
    keywords: "مدونة Speekr, مهارات التواصل, المبيعات, القيادة, التدريب بالذكاء الاصطناعي",
    image: "/images/blog/speekr-communication-skills-ai-riyadh-cairo.png",
    type: "website",
    priority: "0.7",
    changefreq: "weekly",
  },
];

function absolute(pathname) {
  if (pathname.startsWith("http")) return pathname;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function localized(pathname, locale) {
  if (locale === "ar") {
    if (pathname === "/") return "/ar";
    return `/ar${pathname}`;
  }
  return pathname;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(data) {
  return JSON.stringify(data).replaceAll("</script", "<\\/script");
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Speekr",
    alternateName: "Speekr.ai",
    url: siteUrl,
    logo: absolute("/images/logo.svg"),
    sameAs: [
      "https://www.instagram.com/speekr.ai_/",
      "https://www.linkedin.com/company/speekr-ai/",
      "https://www.facebook.com/profile.php?id=61582806519272",
    ],
  };
}

function websiteSchema(locale = "en") {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Speekr.ai",
    url: absolute(localized("/", locale)),
    inLanguage: locale === "ar" ? "ar" : "en",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

function softwareSchema(locale = "en") {
  return {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#speekr-platform`,
    name: "Speekr.ai",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "AI communication practice platform",
    operatingSystem: "Web",
    url: absolute(localized("/", locale)),
    image: absolute("/images/hero.png"),
    description:
      "AI-powered communication practice platform for presentations, meetings, sales conversations, customer care, leadership, and workplace soft skills.",
    featureList: [
      "AI roleplay practice",
      "Instant communication feedback",
      "Presentation and meeting practice",
      "Leadership conversation training",
      "Sales and customer care simulations",
      "English and Arabic dialect support",
      "Team analytics and learning journeys",
    ],
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

function breadcrumbSchema(route, locale = "en") {
  const isHome = route.path === "/" || route.path === "/ar";
  const cleanName = route.title.split("|")[0].trim();
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: locale === "ar" ? "الرئيسية" : "Home",
      item: absolute(localized("/", locale)),
    },
  ];

  if (!isHome) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: cleanName,
      item: absolute(route.path),
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(route.path)}#breadcrumb`,
    itemListElement: items,
  };
}

function webpageSchema(route, locale = "en") {
  return {
    "@type": route.path.includes("/blog") ? "CollectionPage" : "WebPage",
    "@id": `${absolute(route.path)}#webpage`,
    url: absolute(route.path),
    name: route.title,
    headline: route.title,
    description: route.description,
    inLanguage: locale === "ar" ? "ar" : "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: { "@id": `${siteUrl}/#speekr-platform` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absolute(route.image),
      name: route.title,
    },
    breadcrumb: { "@id": `${absolute(route.path)}#breadcrumb` },
  };
}

const pricingFaqs = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Speekr for You lets you start for free without a credit card so you can experience roleplay and coaching before you buy. Teams also offers a guided trial.",
  },
  {
    question: "How is Speekr for Teams billed?",
    answer:
      "Speekr for Teams is billed per seat, monthly or annually. Annual billing saves 20%. You can add or remove seats as your team changes.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can upgrade from You to Teams, or from Teams to Enterprise, and your data and progress carry over.",
  },
  {
    question: "What makes Enterprise different?",
    answer:
      "Enterprise adds API and LMS integration, custom KPIs, SSO, SCIM, data residency control, and a dedicated success manager.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Speekr supports major cards for individual and team plans, plus invoicing and purchase orders for team and enterprise customers.",
  },
];

function pricingOffer(name, description, price, billingDuration, unitText, features) {
  return {
    "@type": "Offer",
    "@id": `${siteUrl}/pricing#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${billingDuration === "P1Y" ? "annual" : "monthly"}`,
    name,
    description,
    url: `${siteUrl}/pricing`,
    availability: "https://schema.org/InStock",
    price,
    priceCurrency: "USD",
    category: "SaaS subscription",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: "USD",
      billingDuration,
      unitText,
    },
    itemOffered: {
      "@type": "SoftwareApplication",
      name,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "AI communication practice platform",
      operatingSystem: "Web",
      featureList: features,
      provider: { "@id": `${siteUrl}/#organization` },
    },
    seller: { "@id": `${siteUrl}/#organization` },
  };
}

function pricingOfferCatalog() {
  const individualFeatures = [
    "Ready-made roleplay scenarios",
    "Instant feedback and coaching",
    "Guided learning journeys",
    "English and Arabic dialect support",
  ];
  const teamFeatures = [
    "Custom scenario and persona builder",
    "Seat and cohort management",
    "Manager views and analytics",
    "Skill-gap reporting",
  ];
  const enterpriseFeatures = [
    "API and LMS integration",
    "Custom KPIs and business metrics",
    "SSO, SCIM, and data residency",
    "Dedicated success manager",
  ];

  return {
    "@type": "OfferCatalog",
    "@id": `${siteUrl}/pricing#pricing-catalog`,
    name: "Speekr pricing plans",
    url: `${siteUrl}/pricing`,
    itemListElement: [
      pricingOffer(
        "Speekr for You - Monthly",
        "Monthly Speekr plan for individuals building communication, presentation, and workplace soft skills.",
        "23",
        "P1M",
        "month",
        individualFeatures,
      ),
      pricingOffer(
        "Speekr for You - Annual",
        "Annual Speekr plan for individuals building communication, presentation, and workplace soft skills.",
        "240",
        "P1Y",
        "year",
        individualFeatures,
      ),
      pricingOffer(
        "Speekr for Teams - Monthly",
        "Monthly per-seat plan for teams that need shared AI roleplay practice, coaching, analytics, and admin controls.",
        "48",
        "P1M",
        "seat per month",
        teamFeatures,
      ),
      pricingOffer(
        "Speekr for Teams - Annual",
        "Annual per-seat plan for teams that need shared AI roleplay practice, coaching, analytics, and admin controls.",
        "480",
        "P1Y",
        "seat per year",
        teamFeatures,
      ),
      {
        "@type": "Offer",
        "@id": `${siteUrl}/pricing#enterprise-custom`,
        name: "Speekr Enterprise",
        description:
          "Custom enterprise pricing for organizations that need API and LMS integration, custom KPIs, SSO, SCIM, data residency, and dedicated success support.",
        url: `${siteUrl}/pricing`,
        availability: "https://schema.org/InStock",
        category: "Enterprise SaaS subscription",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Speekr Enterprise",
          applicationCategory: "EducationalApplication",
          applicationSubCategory: "AI communication practice platform",
          operatingSystem: "Web",
          featureList: enterpriseFeatures,
          provider: { "@id": `${siteUrl}/#organization` },
        },
        seller: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

function faqSchema(route, faqs, locale = "en") {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(route.path)}#faq`,
    url: absolute(route.path),
    inLanguage: locale === "ar" ? "ar" : "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function routeSchema(route, locale = "en") {
  const graph = [
    organizationSchema(),
    websiteSchema(locale),
    softwareSchema(locale),
    webpageSchema(route, locale),
    breadcrumbSchema(route, locale),
  ];

  if (route.path === "/pricing") {
    graph.push(pricingOfferCatalog(), faqSchema(route, pricingFaqs, locale));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function articleRoute(post, locale = "en") {
  const pathName = localized(`/blog/${post.slug}`, locale);
  return {
    path: pathName,
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags?.join(", ") || "communication skills, Speekr",
    image: post.image,
    type: "article",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: post.isoDate,
    sourcePath: `/blog/${post.slug}`,
    article: post,
  };
}

function articleSchema(route, locale = "en") {
  const post = route.article;
  const articleUrl = absolute(route.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(locale),
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        image: absolute(post.image),
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        inLanguage: locale === "ar" ? "ar" : "en",
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
        articleSection: post.category,
        keywords: post.tags?.join(", "),
      },
      {
        "@type": "WebPage",
        "@id": `${articleUrl}#webpage`,
        url: articleUrl,
        name: post.metaTitle,
        headline: post.title,
        description: post.metaDescription,
        inLanguage: locale === "ar" ? "ar" : "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${articleUrl}#article` },
        publisher: { "@id": `${siteUrl}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absolute(post.image),
          name: post.imageAlt || post.title,
        },
        breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "ar" ? "الرئيسية" : "Home", item: absolute(localized("/", locale)) },
          { "@type": "ListItem", position: 2, name: locale === "ar" ? "المدونة" : "Blog", item: absolute(localized("/blog", locale)) },
          { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
        ],
      },
    ],
  };
}

function headTags(route, locale = "en") {
  const canonical = absolute(route.path);
  const sourcePath = route.sourcePath || route.path;
  const englishAlt = absolute(sourcePath === "/" ? "/" : sourcePath);
  const arabicAlt = absolute(localized(sourcePath, "ar"));
  const image = absolute(route.image || "/images/hero.png");
  const schema = route.article ? articleSchema(route, locale) : routeSchema(route, locale);

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    route.keywords ? `<meta name="keywords" content="${escapeHtml(route.keywords)}" />` : "",
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${englishAlt}" />`,
    `<link rel="alternate" hreflang="ar" href="${arabicAlt}" />`,
    `<link rel="alternate" hreflang="x-default" href="${englishAlt}" />`,
    `<meta property="og:site_name" content="Speekr.ai" />`,
    `<meta property="og:type" content="${route.type === "article" ? "article" : "website"}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:locale" content="${locale === "ar" ? "ar_AR" : "en_US"}" />`,
    `<meta property="og:locale:alternate" content="${locale === "ar" ? "en_US" : "ar_AR"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:url" content="${canonical}" />`,
    `<script type="application/ld+json" data-seo="static-route">${jsonLd(schema)}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function fallbackLinks(route, locale = "en") {
  const links = [
    [localized("/", locale), locale === "ar" ? "الرئيسية" : "Home"],
    [localized("/platform", locale), locale === "ar" ? "المنصة" : "Platform"],
    [localized("/solutions", locale), locale === "ar" ? "الحلول" : "Solutions"],
    [localized("/pricing", locale), locale === "ar" ? "الأسعار" : "Pricing"],
    [localized("/blog", locale), locale === "ar" ? "المدونة" : "Blog"],
  ];

  return links
    .filter(([href]) => href !== route.path)
    .map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join("");
}

function staticFallback(route, locale = "en") {
  const isArticle = Boolean(route.article);
  const relatedPosts = (locale === "ar" ? arabicBlogPosts : blogPosts).slice(0, 6);
  const articleLinks = relatedPosts
    .map((post) => `<li><a href="${localized(`/blog/${post.slug}`, locale)}">${escapeHtml(post.metaTitle || post.title)}</a></li>`)
    .join("");
  const extra =
    route.path.endsWith("/blog") || isArticle
      ? `<section><h2>${locale === "ar" ? "أدلة تواصل من Speekr" : "Communication Guides from Speekr"}</h2><ul>${articleLinks}</ul></section>`
      : `<section><h2>${locale === "ar" ? "استكشف Speekr" : "Explore Speekr"}</h2><ul>${fallbackLinks(route, locale)}</ul></section>`;

  return [
    "<noscript>",
    '<main style="max-width: 760px; margin: 48px auto; padding: 0 24px; font-family: Arial, sans-serif; line-height: 1.6;">',
    `<h1>${escapeHtml(isArticle ? route.article.title : route.title)}</h1>`,
    `<p>${escapeHtml(route.description)}</p>`,
    `<p>${locale === "ar" ? "Speekr.ai منصة تدريب على التواصل بالذكاء الاصطناعي للعروض والاجتماعات والمبيعات وخدمة العملاء والقيادة." : "Speekr.ai is an AI-powered communication practice platform for presentations, meetings, sales calls, customer care, leadership conversations, and workplace soft skills."}</p>`,
    extra,
    "</main>",
    "</noscript>",
  ].join("");
}

function injectHead(baseHtml, route, locale = "en") {
  let html = baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']alternate["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+(?:property|name)=["'](?:og:|twitter:)[^>]*>\s*/gi, "")
    .replace(/<script[^>]+data-seo=["']static-route["'][\s\S]*?<\/script>\s*/gi, "");

  html = html.replace("<html lang=\"en\">", `<html lang="${locale === "ar" ? "ar" : "en"}" dir="${locale === "ar" ? "rtl" : "ltr"}">`);
  return html
    .replace("</head>", `    ${headTags(route, locale)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${staticFallback(route, locale)}`);
}

async function writeRoute(baseHtml, route, locale = "en") {
  const html = injectHead(baseHtml, route, locale);
  if (route.path === "/") {
    await writeFile(path.join(distDir, "index.html"), html);
    return;
  }

  const dir = path.join(distDir, route.path.replace(/^\/+/, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
}

function sitemapUrl(route) {
  return [
    "  <url>",
    `    <loc>${absolute(route.path)}</loc>`,
    `    <lastmod>${route.lastmod || now}</lastmod>`,
    `    <changefreq>${route.changefreq || "monthly"}</changefreq>`,
    `    <priority>${route.priority || "0.7"}</priority>`,
    "  </url>",
  ].join("\n");
}

async function writeSitemap(routes) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(sitemapUrl),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(path.join(distDir, "sitemap.xml"), xml);
}

async function writeRobots() {
  const text = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ChatGPT-User",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
  await writeFile(path.join(distDir, "robots.txt"), text);
}

async function writeLlms(routes) {
  const keyRoutes = routes.filter((route) => !route.path.startsWith("/ar")).slice(0, 20);
  const text = [
    "# Speekr.ai",
    "",
    "Speekr.ai is an AI-powered communication practice platform for presentations, meetings, sales calls, customer care, leadership conversations, and workplace soft skills.",
    "",
    "## Core Pages",
    ...keyRoutes.map((route) => `- [${route.title}](${absolute(route.path)}): ${route.description}`),
    "",
    "## Best Descriptions",
    "- AI communication practice platform",
    "- AI roleplay training for sales, customer care, leadership, and teams",
    "- Presentation, meeting, and workplace communication practice with instant AI feedback",
    "- Communication training platform with English and Arabic dialect support",
    "",
  ].join("\n");
  await writeFile(path.join(distDir, "llms.txt"), text);
}

async function main() {
  const baseHtml = await readFile(path.join(distDir, "index.html"), "utf8");
  const articleRoutes = blogPosts.map((post) => articleRoute(post, "en"));
  const arabicArticleRoutes = arabicBlogPosts.map((post) => articleRoute(post, "ar"));
  const allRoutes = [...staticRoutes, ...arabicStaticRoutes, ...articleRoutes, ...arabicArticleRoutes];

  for (const route of staticRoutes) {
    await writeRoute(baseHtml, route, "en");
  }

  for (const route of arabicStaticRoutes) {
    await writeRoute(baseHtml, route, "ar");
  }

  for (const route of articleRoutes) {
    await writeRoute(baseHtml, route, "en");
  }

  for (const route of arabicArticleRoutes) {
    await writeRoute(baseHtml, route, "ar");
  }

  await writeSitemap(allRoutes);
  await writeRobots();
  await writeLlms(allRoutes);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
