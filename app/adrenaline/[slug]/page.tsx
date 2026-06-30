import { getActivity, allActivitySlugs } from "@/lib/adrenalineData";
import ActivityContent from "@/components/ActivityContent";
import ComingSoon from "@/components/ComingSoon";

export function generateStaticParams() {
  return allActivitySlugs.map((slug) => ({ slug }));
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return <ComingSoon slug={slug} />;
  return <ActivityContent activity={activity} />;
}
