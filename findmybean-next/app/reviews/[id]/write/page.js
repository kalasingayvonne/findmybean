import ReviewsScreen from '@/components/ReviewsScreen';

export default async function WriteReviewPage({ params }) {
  const { id } = await params;
  return <ReviewsScreen key={id} cafeId={decodeURIComponent(id)} startOpen />;
}
