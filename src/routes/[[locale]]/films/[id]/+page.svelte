<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Media from '$lib/components/Media.svelte';
  import Video from '$lib/components/Video.svelte'
  export let data: PageData

</script>



<Video srcs={data.film.fields.video} grabs={data.film.fields.screenGrabs}>
	<nav slot="title">
		<h6>{data.film.fields.title}</h6>
    {#if data.film.fields.director}<h6><a href="/directors/{data.film.fields.director.fields.tagIdentifier}">{data.film.fields.director.fields.name}</a></h6>{/if}
	</nav>
</Video>

<!-- <aside>
</aside> -->


{#if data.director}
<Table labels={{ open: 'Voir le portfolio complet', close: `Portfolio de ${data.director.fields.name}` }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Client', key: 'client' },
    { label: 'Réalisateur', key: 'director' },
    { label: 'Catégories', key: 'tags' },
    { label: 'Statut/Date', key: 'publishedDate' }
  ]} />
{/if}

<style lang="scss">
  aside {
    padding: $base;
    background-color: $white;
  }

  nav {
    display: flex;
    // justify-content: space-between;

    h6 {
      flex: 1;
    }
  }
</style>