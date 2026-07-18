import "./globals.css";
import { site } from "@/config/site";
import { allStructuredData } from "@/lib/structuredData";

const titleDefault =
  "VNM Telecommunications LLP | Smartphone Wholesale & Electronics Exporter in Pune";
const titleTemplate = "%s | VNM Telecommunications";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titleDefault,
    template: titleTemplate,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "business",
  classification: "B2B Wholesale, Merchant Export, Consumer Electronics",
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      en: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.legalName,
    title: titleDefault,
    description: site.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "VNM Telecommunications LLP — smartphone and electronics wholesale exporter in Pune",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: site.shortDescription,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.4829;73.9012",
    ICBM: "18.4829, 73.9012",
    "business:contact_data:street_address": site.streetAddress,
    "business:contact_data:locality": site.hqCity,
    "business:contact_data:region": site.hqRegion,
    "business:contact_data:postal_code": site.postalCode,
    "business:contact_data:country_name": site.hqCountry,
    "business:contact_data:email": site.email,
    "business:contact_data:phone_number": site.phoneE164,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#EC3236" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const graphs = allStructuredData();

  return (
    <html lang="en-IN">
      <body>
        {children}
        {graphs.map((data) => (
          <script
            key={data["@type"] ? [].concat(data["@type"]).join("-") : data["@id"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </body>
    </html>
  );
}
