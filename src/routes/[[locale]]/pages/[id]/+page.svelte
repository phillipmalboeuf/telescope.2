<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Document from '$lib/components/document/index.svelte'

  import { page } from '$app/stores'
  import { pushState } from '$app/navigation'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<main>
  <Content content={data.page.fields.content} />
</main>


<style lang="scss">
  main {
    min-height: 100vh;
    padding: $base;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $gap;

    color: $white;
		background-color: $black-light;
  }
</style>