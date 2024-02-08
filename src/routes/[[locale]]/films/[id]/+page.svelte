<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'
  import Media from '$lib/components/Media.svelte'
  import Video from '$lib/components/Video.svelte'
  import Document from '$lib/components/document/index.svelte'

  import { page } from '$app/stores'
  import { pushState } from '$app/navigation'

  import type { PageData } from './$types'
  import { year } from '$lib/formatters';
  export let data: PageData
</script>



<Video srcs={data.film.fields.video} grabs={data.film.fields.screenGrabs}>
	<nav slot="title">
		<h6>{data.film.fields.title}</h6>
    <h6></h6>
    {#if data.film.fields.director}<h6>
      <a on:click={(e) => {
        const { href } = e.currentTarget
        pushState(href, {})
      }} href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/directors/{data.film.fields.director.fields.tagIdentifier}">{data.film.fields.director.fields.name}</a>
    </h6>{/if}
    <h6></h6>
    <h6>{#if data.film.fields.publishedDate}{year(data.film.fields.publishedDate)}{/if}</h6>
	</nav>
</Video>

{#if data.film.fields.description}
<main>
  <div>
    <h4>Film</h4>
    <Document body={data.film.fields.description} />
  </div>
  
  <div>
    {#if data.film.fields.distribution}
    <h4>Distributions</h4>
    <Document body={data.film.fields.distribution} />
    {/if}
  </div>
  
  
  <div>
    {#if data.film.fields.synopsis}
    <h4>Synopsis</h4>
    <Document body={data.film.fields.synopsis} />
    {/if}
  </div>
  
  {#if data.film.fields.prix}
  <div>
    <h4>Prix et distinctions</h4>
    <Document body={data.film.fields.prix} />
  </div>
  {/if}
</main>
{/if}

{#if data.film.fields.screenGrabs}
<ol>
  {#each data.film.fields.screenGrabs as grab}
  <li>
    <figure>
      <Media media={grab.fields.thumbnail} small />
    </figure>
  </li>
  {/each}
</ol>
{/if}


{#if data.director}
<Table labels={{ open: 'Voir le portfolio complet', close: `Portfolio de ${data.director.fields.name}` }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Client', key: 'client' },
    { label: 'Réalisateur', key: 'director' },
    { label: 'Catégorie', key: 'tags' },
    { label: 'Année', key: 'publishedDate' }
  ]} />
{/if}

<style lang="scss">
  main {
    padding: $base;
    display: flex;

    @media (max-width: $mobile) {
      flex-direction: column;
      padding: $mobile_base;
    }
    
    :global(html:has(.films)) & {
      background-color: $black-light;

      h4,
      :global(em) {
        color: $grey;
        font-style: normal;
      }
    }

    > div {
      flex: 1;
      padding-right: $base;
      display: flex;
      flex-direction: column;
      gap: $base;

      :global(html:has(.films)) & {
        border-color: $grey;
      }

      &:not(:last-child) { border-right: 1px solid; }
      &:not(:first-child) { padding-left: $base; }

      h4 {
        margin-bottom: 20vh;
      }

      :global(td),
      :global(th) {
        padding-bottom: $base * 0.5;
      }

      :global(em) {
        font-style: normal;
        opacity: 0.5;
      }

      @media (max-width: $mobile) {
        padding: $mobile_base 0 ($mobile_base * $mobile_scale * 2) !important;
        border-right: none !important;
        border-bottom: 1px solid;

        h4 {
          margin-bottom: $mobile_base;
        }

        &:first-child {
          padding-top: 0 !important;
          h4 { display: none; }
        }
      }
    }
  }

  ol {
    list-style: none;

    figure {
      width: 50%;
    }

    li {

      &:nth-child(2n) {
        figure {
          margin-left: auto;
        }
      }
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: $base 0;

    h6 {
      flex: 1;
      padding: 0 $base;

      &:nth-child(2) {
        // text-align: center;
      }
    }
  }
</style>