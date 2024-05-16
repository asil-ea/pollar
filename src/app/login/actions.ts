"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginFormData } from "@/lib/types";

export async function login(formData: LoginFormData) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("error:", error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: LoginFormData) {
  const supabase = createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { data: signUpResponse, error: signUpError } =
    await supabase.auth.signUp(data);

  const { data: insertResponse, error: insertError } = await supabase
    .from("users")
    .insert({
      id: signUpResponse?.user?.id,
      email: signUpResponse?.user?.email,
    })
    .select();

  if (signUpError || insertError) {
    console.error("signUpError:", signUpError);
    console.error("insertError:", insertError);
    return { error: signUpError?.message || insertError?.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
