<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'

  import { page } from '$app/stores'

  import type { PageData } from './$types'
  import Media from '$lib/components/Media.svelte';
  export let data: PageData

  const vedette = data.portfolio[0]
</script>


<a rel='prefetch' href={`${$page.data.locale === 'fr' ? `/films/${vedette.fields.identifier}` : `/${$page.data.locale}/films/${vedette.fields.identifier}`}`}>
  <figure>
    <!-- {#if !$page.data.isMobile && item.fields.teaser}
    <ListVideo src={item.fields.animationList || item.fields.teaser}
      poster={item.fields.poster && `${item.fields.poster.fields.file.url}?w=900`} />
    {:else}
    <Picture media={item.fields.poster} />
    {/if} -->
    <Media media={vedette.fields.poster} />
    <figcaption>
      <h6>{vedette.fields.title}</h6>
      {#if vedette.fields.ralisateur}<h6>{vedette.fields.ralisateur}</h6>{/if}
      <!-- {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if} -->
    </figcaption>
  </figure>
</a>

<aside>
  <h1 class="h2">{data.director.fields.name} information sur le réalisateur ipsum dolor as sit amet, consectetur adipiscing elit, sed doquis eiusmod tempor eti incididunt. Ut labore et dolore magna aliquaut enim ad minim veniam,  nostrud exercitation ullamcoas  laboris nisi ut aliquip commodo.</h1>
</aside>

<Content content={data.portfolio} />

<Table labels={{ open: 'Voir le portfolio complet', close: `Portfolio de ${data.director.fields.name}` }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Client', key: 'client' },
    { label: 'Réalisateur', key: 'director' },
    { label: 'Catégories', key: 'tags' },
    { label: 'Statut/Date', key: 'publishedDate' }
  ]} />

<style lang="scss">
  aside {
    padding: $base;
    background-color: $white;
  }

  figure {
    display: block;

    :global(img),
    :global(video) {
      height: 100vh;
      object-fit: cover;
    }

    figcaption {
      position: absolute;
      z-index: var(--index);
      bottom: 0;
      left: 0;
      width: 100%;
      color: var(--foreground-inverse);
      padding: $base;

      :global(.films) & {
        color: var(--foreground);
      }

      display: flex;
      transform: translate3d(0,0,0);

      h6 {
        flex: 1;
      }
    }
  }
</style>