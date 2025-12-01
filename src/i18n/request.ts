import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {headers} from 'next/headers';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  
  if (!locale) {
    const headerLocale = (await headers()).get('X-NEXT-INTL-LOCALE');
    if (headerLocale) {
      locale = headerLocale;
    }
  }

  console.log("Request Locale Resolved:", locale);

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "fa")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
