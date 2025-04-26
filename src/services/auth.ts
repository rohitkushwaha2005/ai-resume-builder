
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AuthUser = {
  id: string;
  email: string;
};

export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      throw error;
    }

    return data.user;
  } catch (error: any) {
    toast.error(error.message || "Failed to login");
    throw error;
  }
}

export async function signup(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error:", error);
      throw error;
    }

    // Supabase might require email verification
    if (data.user?.identities?.length === 0) {
      toast.error("Email already registered. Please login instead.");
      throw new Error("Email already registered");
    }

    toast.success("Signup successful! You can now login.");
    return data.user;
  } catch (error: any) {
    toast.error(error.message || "Failed to sign up");
    throw error;
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout error:", error);
      throw error;
    }
    
    return true;
  } catch (error: any) {
    toast.error(error.message || "Failed to logout");
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user || null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}
