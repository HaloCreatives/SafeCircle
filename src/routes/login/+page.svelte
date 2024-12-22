`<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase/client';

  let email = '';
  let error = '';

  async function handleLogin() {
    error = '';
    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (signInError) throw signInError;

      // Show success message
      alert('Check your email for the login link!');
    } catch (err) {
      console.error('Error during login:', err);
      error = err.message;
    }
  }
</script>

<div class="flex items-center justify-center min-h-[80vh]">
  <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
    <h2 class="text-2xl font-bold mb-6 text-primary">Welcome Back</h2>
    {#if error}
      <div class="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
        {error}
      </div>
    {/if}
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
      >
        Send Magic Link
      </button>
    </form>
    <p class="mt-4 text-sm text-gray-500 text-center">
      Don't have an account?
      <a href="/signup" class="text-primary hover:underline">Sign Up</a>
    </p>
  </div>
</div>`