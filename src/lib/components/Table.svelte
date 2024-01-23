<script lang="ts">
  import type { EntryCollection } from 'contentful'
  import type { TypeFilmSkeleton } from '$lib/clients/content_types'
  import { api } from '$lib/api';
  import { date } from '$lib/formatters'
  import { goto, preloadData, pushState } from '$app/navigation'

  import { page } from '$app/stores'

  export let labels: {
    open: string
    close: string
  }

  export let columns: {
    key: string
    label: string
  }[]

  let open = false
  let data: EntryCollection<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = undefined
  let filter: string = undefined
  let tags: string[] = undefined
  
  const out = ["recent","martin-c-pariseau","vincent-lortie","brittney-canda","jf-sauve","kristof-brandl","phil-chagnon","jb-proulx", "2017","2018","2019","2020","2021","2022"]
</script>

<section>
  <nav>
    <button on:click={async () => {
      open = !open

      // @ts-ignore
      data = await api.get("/films")
      tags = [...new Set(data.items.reduce((ts, item)=> {
        return [
          ...ts,
          ...item.fields.tags ? item.fields.tags.filter(tag => !out.includes(tag)).map(tag => tag.toLowerCase()) : []
        ]
      }, []))].sort()
    }}><h2>{#if open}{labels.close}{:else}{labels.open}{/if}</h2></button>

    <div>
    {#if open && tags}
    <button class:active={!filter} on:click={() => filter = undefined}>Tous</button>
    {#each tags as tag}
    <button class:active={tag === filter} on:click={() => filter = tag}>{tag}</button>
    {/each}
    {/if}
    </div>
  </nav>

  {#if open}
  <table style="--length: {columns.length}">
    <tr>
      {#if data}
      {#each columns as column}
      <th>{column.label}</th>
      {/each}
      {:else}
      <th>Un instant...</th>
      {/if}
    </tr>

    {#if data}
    <tr>
      <th colspan={columns.length}><hr></th>
    </tr>

    {#each data.items.filter(film => filter ? film.fields.tags?.map(tag => tag.toLowerCase()).includes(filter) : true) as film, i}
    <tr>
      {#each columns as column, i}
      <td>
        {#if column.key === 'tags' && film.fields.tags}
        {film.fields.tags.filter(tag => !out.includes(tag)).join(' ')}
        {:else if column.key.includes('Date')}
        {film.fields[column.key] ? date(film.fields[column.key]) : '–'}
        {:else}
        {#if i === 0}
        <a
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
          href={`${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`}>{film.fields[column.key]}</a>
        {:else}
        {film.fields[column.key] ? film.fields[column.key] : '–'}
        {/if}
        {/if}
      </td>
      {/each}
    </tr>
    {/each}
    {/if}
  </table>
  {/if}
</section>

<style lang="scss">
  section {
    padding: $base;
    position: relative;
    z-index: 998;
    background-color: $white;

    button:has(h2) {
      background-color: transparent !important;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        gap: $base * 0.5;

        button {
          background-color: $grey-light;

          &.active {
            color: $white;
            background-color: $black;
          }
        }
      }
    }

    nav,
    table {
      margin-bottom: $gap;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      hr {
        margin: ($base * 0.5) 0 ($base * 0.5);
      }

      th, td {
        width: calc(100% / var(--length));
      }

      th {
        text-align: left;
        padding: ($base * 0.25) 0;
        // border-bottom: 1px solid;
        // padding: $base 0;
      }

      td {
        padding: ($base * 0.25) 0;
      }

      tr:not(:has(> th)):hover,
      tr:has(a:focus) {
        background-color: $grey-light;
      }
    }

    :global(.films) & {
      color: $white;
      background-color: $black-light;

      button {
        color: $white;
        background-color: $grey-dark;

        &.active {
          color: $black;
          background-color: $white;
        }
      }

      tr:not(:has(> th)):hover,
      tr:has(a:focus) {
        background-color: $grey-dark;
      }
    }
  }
</style>