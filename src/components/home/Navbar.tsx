"use client";
import Link from "next/link";
import React, { useState, Fragment, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Cookies from "js-cookie";
import { handleSignout } from "@/app/actions";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => {
  const t = useTranslations("Navbar");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleChangeLocale = async (locale: "en" | "tr") => {
    Cookies.set("locale", locale);
    setLocaleState(locale);
    window.location.reload();
  };

  const logOut = () => {
    handleSignout();
  };

  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* #region desktop view */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-black text-white">Pollar</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/predict-question-results"
            className="text-sm font-semibold leading-6 text-gray-100"
          >
            {t("nav")}
          </Link>
          <a
            href="/create-survey"
            className="text-sm font-semibold leading-6 text-gray-100"
          >
            {t("nav2")}
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-100">
              {t("language")}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-300"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <button
                    onClick={() => handleChangeLocale("en")}
                    className="group w-full text-left relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      {t("en")}
                      <span className="absolute inset-0" />
                    </div>
                  </button>
                  <button
                    onClick={() => handleChangeLocale("tr")}
                    className="group relative w-full text-left flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      {t("tr")}
                      <span className="absolute inset-0" />
                    </div>
                  </button>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </PopoverGroup>
        <div className="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <>
              <Link
                href="/my-surveys"
                className="text-sm font-semibold leading-6 text-gray-100"
              >
                {t("nav3")}
              </Link>
              <button
                onClick={logOut}
                className="text-sm font-semibold leading-6 text-gray-100"
              >
                {t("nav4")}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-100"
            >
              {t("nav5")} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      {/* #endregion */}

      {/* #region mobile view */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-black font-black">Pollar</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/predict-question-results"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("nav")}
                </Link>
                <Link
                  href="/create-survey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("nav2")}
                </Link>
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/my-surveys"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav3")}
                    </Link>
                    <button
                      onClick={logOut}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {t("nav4")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {t("nav5")} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {t("language")}
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        <DisclosureButton
                          as="a"
                          onClick={() => handleChangeLocale("en")}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {t("en")}
                        </DisclosureButton>
                        <DisclosureButton
                          as="a"
                          onClick={() => handleChangeLocale("tr")}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {t("tr")}
                        </DisclosureButton>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* #endregion */}
    </header>
  );
};

export default Navbar;
