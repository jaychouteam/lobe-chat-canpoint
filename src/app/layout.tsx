import { SpeedInsights } from '@vercel/speed-insights/next';
import { ResolvingViewport } from 'next';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { isRtlLang } from 'rtl-detect';

import Analytics from '@/components/Analytics';
import { DEFAULT_LANG, LOBE_LOCALE_COOKIE } from '@/const/locale';
import PWAInstall from '@/features/PWAInstall';
import AuthProvider from '@/layout/AuthProvider';
import GlobalProvider from '@/layout/GlobalProvider';
import { isMobileDevice } from '@/utils/responsive';
import {getAuth} from '@/app/api/request'

import { setCookie } from '@/utils/cookie';
const inVercel = process.env.VERCEL === '1';

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

// 校验用户
const cookieStore = cookies();
// setCookie('CANPOINTTOKEN', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw');
// const token={value:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyR3VpZCI6IlQyTXpiak5uTWpBMWJqUm5aMEZ1UlRkUGJsRTVVVDA5IiwiZXhwIjoxNzE4NjAxMjk4fQ.e2ZVENqgo6ueqieMCp1hMt6_01l5yC9RRhjtOMLvshw'}// cookieStore.get('CANPOINTTOKEN');
const token= cookieStore.get('CANPOINTTOKEN');

const RootLayout = async ({ children, modal }: RootLayoutProps) => {
  const cookieStore = cookies();

  const lang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const direction = isRtlLang(lang?.value || DEFAULT_LANG) ? 'rtl' : 'ltr';

  return (
    <html dir={direction} lang={lang?.value || DEFAULT_LANG} suppressHydrationWarning>
      <body>
        <GlobalProvider>
          <AuthProvider>
            {children}
            {modal}
          </AuthProvider>  
          <PWAInstall />
        </GlobalProvider>
        <Analytics />
        {inVercel && <SpeedInsights />}
      </body>
    </html>
  );
};

export default RootLayout;

export { generateMetadata } from './metadata';

export const generateViewport = async (): ResolvingViewport => {
  const isMobile = isMobileDevice();

  const dynamicScale = isMobile ? { maximumScale: 1, userScalable: false } : {};

  return {
    ...dynamicScale,
    initialScale: 1,
    minimumScale: 1,
    themeColor: [
      { color: '#f8f8f8', media: '(prefers-color-scheme: light)' },
      { color: '#000', media: '(prefers-color-scheme: dark)' },
    ],
    viewportFit: 'cover',
    width: 'device-width',
  };
};
