import CafeScreen from '@/components/CafeScreen';

export default async function CafePage({ params }) {
  const { id } = await params;
  return <CafeScreen id={decodeURIComponent(id)} />;
}
