import {getRequestConfig} from 'next-intl/server';
import { cookies } from "next/headers";
 
export default getRequestConfig(async () => {
  // This can either be defined statically if only a single locale
  // is supported, or alternatively read from the user settings
  const cookieStore = cookies();

  const locale = cookieStore.get("locale")?.value || "en";
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});