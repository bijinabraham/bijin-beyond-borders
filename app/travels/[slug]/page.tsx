import { notFound } from "next/navigation";
import { getDestination, getAllSlugs } from "@/lib/travelsData";
import DestinationContent from "@/components/DestinationContent";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();
  return <DestinationContent dest={dest} />;
}
