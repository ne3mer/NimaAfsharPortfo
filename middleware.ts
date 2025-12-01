import NextAuth from "next-auth"
import { authConfig } from "./src/auth.config"
import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // If it's not an admin route and not an API route, use intl middleware
  // Note: API routes are already excluded by matcher, but good to be safe if matcher changes
  if (!nextUrl.pathname.startsWith('/admin') && !nextUrl.pathname.startsWith('/api')) {
    return intlMiddleware(req);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
