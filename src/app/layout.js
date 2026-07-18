import "./globals.css";
import { site } from "@/config/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: "VNM Telecommunications — Smartphones & Electronics Wholesale", template: "%s | VNM Telecommunications" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "VNM Telecommunications — Indian Merchant Exporter of Smartphones",
    description: "Pune-based B2B wholesale and export of smartphones, consumer electronics and accessories for distributors and bulk traders.",
    url: "/",
    siteName: site.name,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "VNM Telecommunications — smartphones and electronics wholesale" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VNM Telecommunications — B2B Smartphones & Electronics",
    description: "Indian merchant exporter serving domestic distribution and international trade partners.",
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "North Blocke-304/5/6 Sacred World Mall, Third floor, Above Kwality Restaurant, Near Jagtap Chowk, Wanowrie",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411040",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
