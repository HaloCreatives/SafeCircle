import { supabase } from '$lib/supabase/client';
import { user } from '$lib/stores/auth';
import type { AuthError } from '@supabase/supabase-js';

export async function signUp(email: string, password: string, name: string): Promise<AuthError | null> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });

  return error;
}

export async function signIn(email: string, password: string): Promise<AuthError | null> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return error;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  user.set(null);
}