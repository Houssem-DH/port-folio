import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import { locales } from "@/i18n/routing";
import Navbar from "@/components/navbar";
import LocaleHtmlUpdater from "@/components/locale-html-updater";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlUpdater />
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}
