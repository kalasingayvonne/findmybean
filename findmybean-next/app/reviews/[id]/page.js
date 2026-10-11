import ReviewsScreen from '@/components/ReviewsScreen';

export default async function CafeReviewsPage({ params }) {
  const { id } = await params;
  return <ReviewsScreen key={id} cafeId={decodeURIComponent(id)} />;
}
