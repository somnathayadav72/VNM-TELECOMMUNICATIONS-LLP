import SiteExperience from "@/components/site/SiteExperience";

export const metadata = {
  title: {
    absolute: "VNM Telecommunications LLP | Smartphone Wholesale & Electronics Exporter in Pune",
  },
  description:
    "Buy wholesale smartphones, consumer electronics and accessories from VNM Telecommunications LLP in Pune. Indian merchant exporter serving distributors, wholesalers and bulk traders across India and export markets.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VNM Telecommunications LLP | Smartphone Wholesale & Electronics Exporter in Pune",
    description:
      "Pune-based B2B wholesale and merchant export of smartphones, tablets, wearables and accessories for trade partners in India and overseas.",
    url: "/",
  },
};

export default function HomePage() {
  return <SiteExperience />;
}
