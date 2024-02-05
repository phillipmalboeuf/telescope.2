<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Media from '$lib/components/Media.svelte'
  import ListFilm from '$lib/components/ListFilm.svelte'

  export let data: PageData

  let vedette

  $: {
    vedette = data.portfolio[0]
  }
</script>


<figure>
  <ListFilm i={1000} film={vedette} full wide />
</figure>

<aside>
  <h1 class="h2">{data.director.fields.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; information sur le réalisateur ipsum dolor as sit amet, consectetur adipiscing elit, sed doquis eiusmod tempor eti incididunt. Ut labore et dolore magna aliquaut enim ad minim veniam,  nostrud exercitation ullamcoas  laboris nisi ut aliquip commodo.</h1>
</aside>

<Content content={data.portfolio} />

<Table director={data.director.fields.tagIdentifier} labels={{ open: 'Voir le portfolio complet', close: `Portfolio de ${data.director.fields.name}` }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Client', key: 'client' },
    { label: 'Réalisateur', key: 'director' },
    { label: 'Catégories', key: 'tags' },
    { label: 'Statut/Date', key: 'publishedDate' }
  ]} />

<style lang="scss">
  figure {
    display: block;
    position: relative;
    z-index: 100;
  }

  aside {
    padding: $base;
    background-color: $white;

    position: relative;
    z-index: 110;
  }
</style>