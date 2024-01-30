<script lang="ts">
  import { pushState } from '$app/navigation'
  import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<main>
  <nav>
    <a href="/" class="inactive" on:click={async (e) => {
      if (!$page.state.open) return;
      if (e.metaKey) return;

      e.preventDefault()
      const { href } = e.currentTarget
      pushState(href, {})
    }}>Telescope</a>
  </nav>
  {#each data.page.fields.content as item}
  {#if item.sys.contentType.sys.id === 'contactPoint'}
  <nav>
    <h4>{item.fields.title}</h4>

    <a href={item.fields.link} rel="external" target="_blank">{item.fields.linkLabel}</a>

    {#if item.fields.contacts?.length}
    <ul>
      {#each item.fields.contacts as person}
      <li>
        <h5>{person.fields.name}</h5>
        <h6>{person.fields.position}</h6>
        {#if person.fields.phone}<a href={`tel:${person.fields.phone}`}><h6>{person.fields.phone}</h6></a>{/if}
        {#if person.fields.email}<a href={`mailto:${person.fields.email}`}><h6>{@html person.fields.email.replace('@', '<div></div>@')}</h6></a>{/if}
      </li>
      {/each}
    </ul>
    {/if}
  </nav>
  {/if}
  {/each}

  <nav>
    <a class="inactive">Contact</a>
  </nav>
</main>

<style lang="scss">
  main {
    position: relative;
    z-index: 2000;
    min-height: 100vh;
    padding: $base 0;

    color: $white;
		background-color: $black-light;

    display: flex;

    @media (max-width: $mobile) {
      padding: $mobile_base 0;
      flex-direction: column;
    }

    nav {
      flex: 1;
      padding: 0 $base;

      &:not(:first-child):not(:last-child) { border-left: 1px solid $grey; }

      @media (max-width: $mobile) {
        border-left: none !important;
        padding: 0 $mobile_base;

        &:not(:first-child):not(:last-child) {
          border-top: 1px solid $grey;
          padding-top: $mobile_base;
        }

        > a,
        > h4 {
          font-size: $mobile_base * $mobile_scale * 1.15;
        }
      }

      a.inactive {
        color: $grey;
      }

      h4 {
        margin-bottom: 20vh;

        @media (max-width: $mobile) {
          margin-bottom: $mobile_base * $mobile_scale;
        }
      }

      > a {
        display: block;
        margin-bottom: $gap * 2;
      }

      ul {
        list-style: none;

        li {
          margin-bottom: $gap;

          h5, h6 {
            font-size: $base * 0.75;
            font-weight: normal;
            line-height: 1.333;
          }

          h6 {
            color: $grey;
          }
        }
      }
    }
  }
</style>