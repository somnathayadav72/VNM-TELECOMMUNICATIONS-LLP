import { site } from "@/config/site";

const logoUrl = `${site.url}/brand/vnm-telecommunications-mark.png`;
const ogImageUrl = `${site.url}/opengraph-image.png`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "WholesaleStore"],
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: [site.name, "VNM Telecom", "VNM Telecommunications Pune"],
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    image: logoUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 500,
      height: 500,
    },
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.hqCity,
        addressRegion: site.hqRegion,
        addressCountry: site.countryCode,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.hqCity,
      addressRegion: site.hqRegion,
      postalCode: site.postalCode,
      addressCountry: site.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.4829,
      longitude: 73.9012,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Maharashtra" },
      { "@type": "City", name: "Pune" },
      "Middle East",
      "Asia Pacific",
      "Africa",
      "Europe",
    ],
    knowsAbout: [
      "Smartphone wholesale",
      "Consumer electronics export",
      "Refurbished mobile devices",
      "B2B mobile distribution",
      "Merchant export",
    ],
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        email: site.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      {
        "@type": "ContactPoint",
        telephone: site.phoneE164,
        email: site.email,
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "INR, USD",
    paymentAccepted: "Bank Transfer, Invoice",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    image: ogImageUrl,
  };
}

export function webPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/#webpage`,
    url: site.url,
    name: "VNM Telecommunications LLP | Smartphone & Electronics Wholesale Exporter in Pune",
    description: site.description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl,
    },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does VNM Telecommunications LLP supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VNM Telecommunications LLP supplies new and certified refurbished smartphones, tablets, wearables and accessories for B2B wholesale, India distribution and merchant export.",
        },
      },
      {
        "@type": "Question",
        name: "Where is VNM Telecommunications based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our India HQ is in Wanowrie, Pune, Maharashtra, from where we serve domestic distribution and international trade partners.",
        },
      },
      {
        "@type": "Question",
        name: "Do you export smartphones from India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We support merchant export with packing, documentation and logistics coordination for partners across export markets, alongside India B2B supply.",
        },
      },
      {
        "@type": "Question",
        name: "How can I request a stock quote?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Share your category, models, grades and quantities by emailing ${site.email} or calling ${site.phoneE164}.`,
        },
      },
    ],
  };
}

export function allStructuredData() {
  return [organizationSchema(), websiteSchema(), webPageSchema(), breadcrumbSchema(), faqSchema()];
}
