<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { page } from '$app/stores'

  import FilmPage from '../../routes/[[locale]]/films/[id]/+page.svelte'
</script>

{#if $page.state.open}
<dialog transition:fly={{ opacity: 1, y: '-100%', duration: 666 }}>
  <FilmPage data={$page.state.open} />

  <button on:click={() => history.back()}>Fermer</button>
</dialog>
{/if}

<style lang="scss">
  dialog {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;
    width: 100vw;
    z-index: 2000;

    color: var(--color);
    background-color: var(--background);

    > button {
      position: absolute;
      top: $base;
      right: $base;
      z-index: 2001;
    }
  }
</style>