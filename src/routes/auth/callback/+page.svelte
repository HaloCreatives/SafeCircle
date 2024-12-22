`<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase/client';

  onMount(async () => {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      goto('/login');
    } else {
      goto('/');
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Logging you in...</h2>
    <p class="text-gray-600">Please wait while we complete the authentication process.</p>
  </div>
</div>`