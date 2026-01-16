"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { getDirection } from "@/i18n/routing";

export default function LocaleHtmlUpdater() {
  const locale = useLocale();

  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  return null;
}
