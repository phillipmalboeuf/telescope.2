<script lang="ts">
  import type { TypeAboutPieceSkeleton, TypeArticleSkeleton, TypeCollaboratorSkeleton, TypeCollaboratorSliderSkeleton, TypeContactPersonSkeleton, TypeContactPointSkeleton, TypeFilmSkeleton, TypeLooseTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  import Media from './Media.svelte'

  export let query: string = undefined
  export let content: Entry<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]

  let films = content.filter(item => item.sys.contentType.sys.id === 'film') as Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
</script>

<ol>
{#each films as item, i}
  {#if item.sys.contentType.sys.id === 'film'}
  <li class:full={item.fields.full}>
    <a rel='prefetch' href={`${$page.data.locale === 'fr' ? `/films/${item.fields.identifier}${query ? query : ''}` : `/${$page.data.locale}/films/${item.fields.identifier}${query ? query : ''}`}`}>
      <figure style="--index: {i}; --index-reverse: {films.length - i}">
        <!-- {#if !$page.data.isMobile && item.fields.teaser}
        <ListVideo src={item.fields.animationList || item.fields.teaser}
          poster={item.fields.poster && `${item.fields.poster.fields.file.url}?w=900`} />
        {:else}
        <Picture media={item.fields.poster} />
        {/if} -->
        <Media media={item.fields.poster} ar={1} small />
        <figcaption>
          <h6>{item.fields.title}</h6>
          {#if item.fields.ralisateur}<h6>{item.fields.ralisateur}</h6>{/if}
          <!-- {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if} -->
        </figcaption>
      </figure>
    </a>
  </li>
  {/if}
{/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    li {
      width: 50%;
      

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

        figcaption {
          position: sticky;
          z-index: var(--index);
          bottom: 0;
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

      &.full {
        figure {
          height: 100vh;

          :global(img),
          :global(video) {
            height: 100vh;
          }
        }
      }
    }
  }
</style>