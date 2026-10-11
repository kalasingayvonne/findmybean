import './globals.css';
import { AppProvider } from './providers';
import Shell from '@/components/Shell';
import Nav from '@/components/Nav';
import FilterSheet from '@/components/FilterSheet';

export const metadata = {
  title: 'findmybean · sip. stay. smile.',
  description: 'Find cafés in Nairobi by Wi-Fi, outlets, noise level and seating.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <div className="stage">
          <div className="phone">
            <AppProvider>
              <Shell>{children}</Shell>
              <Nav />
              <FilterSheet />
            </AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
