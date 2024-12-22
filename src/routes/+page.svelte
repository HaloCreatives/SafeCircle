`<script lang="ts">
  import SOSButton from '$lib/components/SOSButton.svelte';
  import RiskIndicator from '$lib/components/RiskIndicator.svelte';
  import MapView from '$lib/components/MapView.svelte';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase/client';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/auth';

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        goto('/login');
      }
      user.set(session?.user || null);
    });

    return () => subscription.unsubscribe();
  });
</script>

{#if $user}
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-white">
      Welcome to SafeCircle!
    </h1>

    <div class="bg-white p-4 rounded-lg shadow">
      <RiskIndicator />
    </div>

    <div class="bg-white p-4 rounded-lg shadow flex justify-center">
      <SOSButton />
    </div>

    <div class="bg-white p-4 rounded-lg shadow">
      <MapView />
    </div>
  </div>
{/if}`