import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { handleSignout } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pollar",
  description: "Use the power of AI to survey.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const isLoggedIn = !error || data?.user;

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Link
                  href="/predict-question-results"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Predict Question Results
                </Link>
                <Link
                  href="/create-survey"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Survey
                </Link>
              </div>
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/my-surveys"
                      className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Surveys
                    </Link>
                    <form>
                      <button
                        formAction={handleSignout}
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Log out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
