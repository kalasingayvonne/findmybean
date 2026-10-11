'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// The scrolling screen area. Its class changes per page (cover, explore, cafe, ...), which the CSS uses.
export default function Shell({ children }) {
  const path = usePathname(), ref = useRef(null), seg = path.split('/')[1] || 'cover';
  useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [path]);
  return <main ref={ref} className={`screen screen-${seg}`}>{children}</main>;
}
