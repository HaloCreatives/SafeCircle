`<script lang="ts">
  import { Map } from 'lucide-svelte';
  export let userLocation: GeolocationPosition | null = null;
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center space-x-2 mb-4">
    <Map class="w-6 h-6 text-[#8DF6F6]" />
    <h2 class="text-lg font-semibold">Safe Routes</h2>
  </div>
  <div class="h-48 bg-gray-100 rounded-lg">
    <!-- Map implementation will go here -->
    {#if userLocation}
      <p class="p-4">Location: {userLocation.coords.latitude}, {userLocation.coords.longitude}</p>
    {/if}
  </div>
</div>`