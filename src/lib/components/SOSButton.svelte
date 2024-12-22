`<script lang="ts">
  let isEmergency = false;

  async function triggerEmergencyAlert() {
    isEmergency = true;
    // Implementation for sending alerts will go here
  }
</script>

<div class="bg-white rounded-2xl shadow-xl p-6">
  <button
    on:click={() => triggerEmergencyAlert()}
    class="w-full py-6 rounded-xl text-white text-xl font-bold transition-all {
      isEmergency
        ? 'bg-red-600 animate-pulse'
        : 'bg-red-500 hover:bg-red-600'
    }"
  >
    {isEmergency ? 'ALERT SENT' : 'EMERGENCY ALERT'}
  </button>
</div>`