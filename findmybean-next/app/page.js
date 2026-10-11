import Link from 'next/link';
import { PinMascot, Wordmark } from '@/components/ui';

// Cover page
export default function Cover() {
  return (
    <section className="cover">
      <img className="cover-img" src="/cover.jpg" alt="Iced matcha latte and iced coffee floating over green and espresso panels" />
      <div className="cover-brand">
        <PinMascot />
        <div><Wordmark /><small>sip. stay. smile.</small></div>
      </div>
      <Link className="btn btn-forest" href="/explore">Find my bean</Link>
    </section>
  );
}
