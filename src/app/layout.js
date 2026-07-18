import "./globals.css";
import { site } from "@/config/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: "VNM Telecommunications — B2B Mobile Device Wholesale", template: "%s | VNM Telecommunications" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "VNM Telecommunications — Verified Devices, Ready for Resale",
    description: "New and certified refurbished mobile devices supplied to resellers worldwide.",
    url: "/",
    siteName: site.name,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "VNM Telecommunications B2B mobile device wholesale" }],
  },
  twitter: { card: "summary_large_image", title: "VNM Telecommunications — B2B Mobile Device Wholesale", description: "Verified smartphones, tablets, wearables and accessories for resale.", images: ["/opengraph-image.png"] },
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
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: "North Blocke-304/5/6 Sacred World Mall, Third floor, Above Kwality Restaurant, Near Jagtap Chowk, Wanowrie",
      addressLocality: "Pune",
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
