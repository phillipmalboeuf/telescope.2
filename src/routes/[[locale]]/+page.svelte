<script lang="ts">
  import Content from '$lib/components/Content.svelte';
  import type { PageData } from './$types'
  export let data: PageData
</script>

<!-- <h1>{data.page.fields.title}</h1> -->

<Content content={data.page.fields.content} />
