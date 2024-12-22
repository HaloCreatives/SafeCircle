`<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';
  export let riskLevel: 'high' | 'medium' | 'low' = 'low';

  $: riskColor = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500'
  }[riskLevel];
</script>

<div class="bg-white rounded-xl shadow-lg p-6">
  <div class="flex items-center space-x-2 mb-4">
    <AlertTriangle class="w-6 h-6 {riskColor}" />
    <h2 class="text-lg font-semibold">Current Risk Level: {riskLevel}</h2>
  </div>
  <div class="space-y-2">
    <!-- Risk details will go here -->
  </div>
</div>`