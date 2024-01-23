<script lang="ts">
  import type { TypeFilmSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'

  import Media from './Media.svelte'
  import Document from './document/index.svelte'

  import { goto, preloadData, pushState } from '$app/navigation'
  import { date, year } from '$lib/formatters'
  import type { MouseEventHandler } from 'svelte/elements'

  export let film: Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let full = false
  export let wide = false

  let popup = false

  const go: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    if (e.metaKey) return;

    e.preventDefault()
    const { href } = e.currentTarget
    const result = await preloadData(href)

    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { type: 'film', open: result.data })
    } else {
      goto(href)
    }
  }
</script>

<a on:click={go}
  href={`${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`}>
  <figure class:full class:wide>
    <!-- {#if !$page.data.isMobile && item.fields.teaser}
    <ListVideo src={item.fields.animationList || item.fields.teaser}
      poster={item.fields.poster && `${item.fields.poster.fields.file.url}?w=900`} />
    {:else}
    <Picture media={item.fields.poster} />
    {/if} -->
    <Media media={film.fields.poster} ar={wide ? undefined : full ? undefined : undefined} small />
    {#if film.fields.popup && popup}
    <figcaption class="popup" transition:fly={{ y: '100%', duration: 333 }}>
      <div>
        <h4>{film.fields.title}</h4>
        <h5>{#if film.fields.ralisateur}{film.fields.ralisateur}{/if}</h5>
      </div>

      <div>
        {#if film.fields.popup.fields.title}<h3>{film.fields.popup.fields.title}</h3>{/if}
        {#if film.fields.popup.fields.body}<Document body={film.fields.popup.fields.body} />{/if}

        <footer>
          {#if film.fields.popup.fields.link}<a class="button" href="{film.fields.popup.fields.link}">{film.fields.popup.fields.linkLabel}</a>{/if}
        </footer>
      </div>

      <button on:click|stopPropagation|preventDefault={() => {
        popup = false
      }}>Fermer</button>
    </figcaption>
    {:else}
    <figcaption transition:fly={{ y: '100%', duration: 333 }}>
      {#if film.fields.popup}
      <aside>
        <button on:click|stopPropagation|preventDefault={() => {
          popup = true
        }}>Voir la distinction ↗</button>
      </aside>
      {/if}
      <h6>{film.fields.title}</h6>
      <h6>{#if film.fields.ralisateur}{film.fields.ralisateur}{/if}</h6>
      <h6>{#if film.fields.publishedDate}{date(film.fields.publishedDate)}{/if}</h6>
      <!-- {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if} -->
    </figcaption>
    {/if}
  </figure>
</a>

<style lang="scss">
  figure {
    position: relative;
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
      flex-wrap: wrap;
      align-items: flex-end;
      transform: translate3d(0,0,0);

      aside {
        width: 100%;
        padding: $base;

        button {
          padding: ($base * $scale * 0.25) ($base * $scale * 0.5);
          color: var(--foreground-inverse);
          background-color: fade-out($white, 0.5);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
        }
      }

      h6 {
        flex: 2;
        padding: 0 $base;

        &:last-child {
          flex: 1;
          text-align: right;
        }
      }

      &.popup {
        position: absolute;
        padding: $base;
        // background-color: fade-out($white, 0.75);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);

        align-items: stretch;
        min-height: 50vh;

        div {
          flex: 1;
          display: flex;
          flex-direction: column;

          &:first-child {
            border-right: 1px solid fade-out($white, 0.75);
            margin-right: $base;
          }

          :global(p) {
            margin-bottom: $base * 0.5;
          }

          h3 {
            margin-bottom: auto;
          }

          h5 {
            opacity: 0.5;
          }
          
          a.button {
            color: var(--foreground);
          }

          footer {
            margin-top: auto;
          }
        }

        > button {
          position: absolute;
          top: $base;
          right: $base;
        }
      }
    }
  }
</style>