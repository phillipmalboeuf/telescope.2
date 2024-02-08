<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Document from '$lib/components/document/index.svelte'

  import { page } from '$app/stores'
  import { pushState } from '$app/navigation'

  import type { PageData } from './$types'
  import Logo from '$lib/components/Logo.svelte';
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<main>
  <section>
    <h1 class="h6">{data.page.fields.title}</h1>
    <Content content={data.page.fields.content} />
    <div></div>
  </section>
  <figure>
    <Logo />
  </figure>
</main>


<style lang="scss">
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    min-height: 100vh;
    padding: $base;

    color: $white;
		background-color: $black-light;

    h1 {
      text-align: left;
    }

    figure {
      width: 100%;

      :global(svg) {
        width: 100%;
      }
    }

    section {
      width: 50%;
      min-height: 75vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: $gap;
      border-left: 1px solid $grey;
      padding-left: $base;
      padding-right: $gap * 2;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }
  }
</style>