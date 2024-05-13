"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
