"use client";
import { login, signup } from "./actions";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ZodType, z } from "zod";

export default function LoginPage() {
  const t = useTranslations("Login");
  const router = useRouter();
  const supabase = createClient();

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error || data.user) {
      router.push("/");
    }
  };
  checkUser();

  const schema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const submitData = async (data: LoginFormData) => {
    setButtonsDisabled(true);
    if (!isSignUp) {
      const res = await login(data);
      res && setError("password", { type: "server", message: res.error });
    } else {
      const res = await signup(data);
      res && setError("password", { type: "server", message: res.error });
    }
    setButtonsDisabled(false);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t("login")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("login2")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {t("login3")}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <button
                type="submit"
                onClick={() => setIsSignUp(false)}
                disabled={buttonsDisabled}
                className="flex w-full sm:w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-2 sm:mb-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("login4")}
              </button>
              <div className="w-2" />
              <button
                type="submit"
                onClick={() => setIsSignUp(true)}
                disabled={buttonsDisabled}
                className="flex w-full sm:w-1/2 justify-center rounded-md border border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("login5")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
