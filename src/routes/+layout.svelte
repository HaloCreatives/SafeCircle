`<script lang="ts">
  import '../app.css';
  import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="min-h-screen bg-gradient-to-b from-[#67DD00] to-[#000000]">
  <NavBar />
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
</div>`