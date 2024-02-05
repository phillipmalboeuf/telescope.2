<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<!-- <h1>{data.page.fields.title}</h1> -->

<Content content={data.page.fields.content} />

<Table tag='film' labels={{ open: 'Voir tous les films', close: 'Films' }}
  columns={[
    { label: 'Projet', key: 'title' },
    // { label: 'Client', key: 'client' },
    { label: 'Réalisateur', key: 'director' },
    { label: 'Catégories', key: 'tags' },
    { label: 'Année', key: 'publishedDate' }
  ]} />