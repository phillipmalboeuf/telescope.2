<script lang="ts">
  import { isTypeFilm, type TypeAboutPieceSkeleton, type TypeArticleSkeleton, type TypeCollaboratorSkeleton, type TypeCollaboratorSliderSkeleton, type TypeContactPersonSkeleton, type TypeContactPointSkeleton, type TypeFilmSkeleton, type TypeLooseTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import ListFilm from './ListFilm.svelte'

  export let query: string = undefined
  export let content: Entry<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
</script>

<ol>
{#each content as item, i (item.sys.id)}
  {#if isTypeFilm(item)}
  <li class:full={item.fields.full} style="--index: {i}; --index-reverse: {content.length - i}">
    <ListFilm {i} film={item} full={item.fields.full} />
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