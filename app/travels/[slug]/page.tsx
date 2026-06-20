import { getDestination, allCitySlugs } from "@/lib/travelsData";
import DestinationContent from "@/components/DestinationContent";
import ComingSoon from "@/components/ComingSoon";

export function generateStaticParams() {
  return allCitySlugs.map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return <ComingSoon slug={slug} />;
  return <DestinationContent dest={dest} />;
}
