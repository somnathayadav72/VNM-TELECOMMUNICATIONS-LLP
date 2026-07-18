import { site } from "@/config/site";

export function organizationSchema() {
  return { "@context": "https://schema.org", "@type": "Organization", name: site.legalName, url: site.url, email: site.email, telephone: site.phone };
}
