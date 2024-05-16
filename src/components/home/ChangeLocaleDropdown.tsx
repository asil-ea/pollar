"use client";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const ChangeLocaleDropdown = () => {
  const t = useTranslations("ChangeLocale");

  const [localeState, setLocaleState] = useState(useLocale());

  useEffect(() => {
    const locale = Cookies.get("locale");

    if (!locale) {
      Cookies.set("locale", localeState);
    }

    if (locale) {
      setLocaleState(locale);
    }
  }, []);

  const handleChangeLocale = async (e: any) => {
    const locale = e.target.value;
    Cookies.set("locale", locale);
    setLocaleState(locale);
    window.location.reload();
  };

  return (
    <select
      value={localeState}
      onChange={handleChangeLocale}
      className="text-black py-2 rounded-md text-sm font-medium"
    >
      <option value="en">{t("English")}</option>
      <option value="tr">{t("Turkish")}</option>
    </select>
  );
};

export default ChangeLocaleDropdown;
