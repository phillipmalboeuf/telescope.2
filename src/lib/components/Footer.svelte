<script lang="ts">
  import Logo from './Logo.svelte'

  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  export let footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<footer>
  <nav>
    {#each footer?.fields.links as link, i}
    <div>
      <a href={link.fields.link} {...link.fields.external && { rel: "external", target: "_blank" }}>{link.fields.label}</a>

      {#if link.fields.subLinks}
      <ul>
      {#each link.fields.subLinks as sublink}
        <li>
          <a href={sublink.fields.link} {...sublink.fields.external && { rel: "external", target: "_blank" }}>{@html sublink.fields.label.replaceAll('\\n', '<br>')}</a>
        </li>
      {/each}
      </ul>
      {/if}

      {#if i === footer.fields.links.length - 1}
      <aside>
        <a href="">© 2023 Telescope</a>
        <a href="">Web Design <strong>Caserne</strong></a>
      </aside>
      {/if}
    </div>
    {/each}
  </nav>

  <Logo />
</footer>

<style lang="scss">
  footer {
    position: relative;
    z-index: 999;
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);
    padding: $base;
    
    > :global(svg) {
      width: 100%;
    }

    nav {
      display: flex;

      div {
        flex: 1;
        margin-bottom: $gap;

        &:not(:first-child) {
          padding-left: $base;
          border-left: 1px solid $grey;
        }

        &:last-child {
          flex: 2;
        }

        ul {
          list-style: none;
          margin: $gap 0 ($gap * 6);

          color: $grey;
        }

        aside {
          color: $grey;
          display: flex;
          justify-content: space-between;

          strong {
            color: var(--foreground-inverse);
          }
        }
      }
    }
  }
</style>