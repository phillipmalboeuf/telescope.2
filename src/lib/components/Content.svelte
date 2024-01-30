<script lang="ts">
  import type { TypeAboutPieceSkeleton, TypeArticleSkeleton, TypeCollaboratorSkeleton, TypeCollaboratorSliderSkeleton, TypeContactPersonSkeleton, TypeContactPointSkeleton, TypeFilmSkeleton, TypeLooseTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import ListFilm from './ListFilm.svelte';

  export let query: string = undefined
  export let content: Entry<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]

  let films = content.filter(item => item.sys.contentType.sys.id === 'film') as Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
</script>

<ol>
{#each films as item, i}
  {#if item.sys.contentType.sys.id === 'film'}
  <li class:full={item.fields.full} style="--index: {i}; --index-reverse: {films.length - i}">
    <ListFilm film={item} full={item.fields.full} />
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

      @media (max-width: $mobile) {
        width: 100%;
      }
    }
  }
</style>