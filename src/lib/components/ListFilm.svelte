<script lang="ts">
  import type { TypeFilmSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  import Media from './Media.svelte'
  import { goto, preloadData, pushState } from '$app/navigation'

  export let film: Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let full = false
  export let wide = false
</script>

<a rel='prefetch'
  on:click={async (e) => {
    if (e.metaKey) return;

    e.preventDefault()
    const { href } = e.currentTarget
    const result = await preloadData(href)

    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { type: 'film', open: result.data })
    } else {
      goto(href)
    }
  }}
  href={`${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`}>
  <figure class:full class:wide>
    <!-- {#if !$page.data.isMobile && item.fields.teaser}
    <ListVideo src={item.fields.animationList || item.fields.teaser}
      poster={item.fields.poster && `${item.fields.poster.fields.file.url}?w=900`} />
    {:else}
    <Picture media={item.fields.poster} />
    {/if} -->
    <Media media={film.fields.poster} ar={wide ? undefined : full ? 1 : undefined} small />
    <figcaption>
      <h6>{film.fields.title}</h6>
      <h6>{#if film.fields.ralisateur}{film.fields.ralisateur}{/if}</h6>
      <h6></h6>
      <!-- {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if} -->
    </figcaption>
  </figure>
</a>

<style lang="scss">
  figure {
    display: block;
    height: 50vh;
    // overflow: hidden;
    // margin-top: $base * -3;

    :global(img),
    :global(video) {
      height: 50vh;
      object-fit: cover;
      position: relative;
      z-index: var(--index);
    }

    &.full {
      height: 100vh;

      :global(img),
      :global(video) {
        height: 100vh;
      }
    }

    figcaption {
      position: sticky;
      z-index: var(--index);
      bottom: 0;
      color: var(--foreground-inverse);
      padding: $base 0;

      :global(.films) & {
        color: var(--foreground);
      }

      display: flex;
      transform: translate3d(0,0,0);

      h6 {
        flex: 2;
        padding: 0 $base;

        &:last-child {
          flex: 1;
        }
      }
    }
  }
</style>