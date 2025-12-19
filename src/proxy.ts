import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  console.log("Middleware hit:", nextUrl.pathname);
  
  if (!nextUrl.pathname.startsWith('/admin') && !nextUrl.pathname.startsWith('/api')) {
    return intlMiddleware(req);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
