import { DestinationDetailPage } from '@/components/destination-detail-page';

export default function Page({ params }: { params: { slug: string } }) {
  return <DestinationDetailPage slug={params.slug} />;
}
