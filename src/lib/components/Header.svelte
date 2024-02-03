<script lang="ts">
  import { page } from '$app/stores'
  import Document from '$lib/components/document/index.svelte'
  import { fade, fly } from 'svelte/transition'
  import { goto, preloadData, pushState } from '$app/navigation'

  import type { TypeLooseTextSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { api } from '$lib/api';
  
  export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let visible = false
  let about: Entry<TypeLooseTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = undefined

  let films = false
  let directors = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class:visible on:mouseleave={() => visible = false}>
  <nav style="--length: {header.fields.links.length}">
    {#each header.fields.links as link}
    <div>
      <a href={link.fields.link} {...link.fields.external && { rel: "external", target: "_blank" }}
        class:active={$page.url.pathname !== '/' && link.fields.link !== '/' && $page.url.pathname.startsWith(link.fields.link)}
        on:click={async (e) => {
          visible = false
          films = false
          directors = false

          if (link.fields.link !== '/contact') return;
          if (e.metaKey) return;

          e.preventDefault()
          const { href } = e.currentTarget
          const result = await preloadData(href)

          if (result.type === 'loaded' && result.status === 200) {
            pushState(href, { type: 'contact', open: result.data })
          } else {
            goto(href)
          }
        }}
        on:touchstart={(e) => {
          if (["/films", "/directors", "/about"].includes(link.fields.link)) {
            e.preventDefault()
            e.stopImmediatePropagation()
          }

          if (link.fields.link === "/films") {
            films = true
            directors = false
            about = undefined
          }

          if (link.fields.link === "/directors") {
            directors = true
            films = false
            about = undefined
          }
        }}
        on:pointerenter={async () => {
          visible = true

          if (link.fields.link === "/about") {
            directors = false
            films = false
            // @ts-ignore
            about = await api.get("/about")
          }
        }}
        on:pointerleave={() => about = undefined}>{link.fields.label}</a>

      {#if $page.data.films && link.fields.link === "/films"}
      <ol class:films>
        {#each $page.data.films as film}
        <li><a href="/films/{film.fields.identifier}">{film.fields.title}</a></li>
        {/each}
      </ol>
      {/if}

      {#if $page.data.directors && link.fields.link === "/directors"}
      <ol class:directors>
        {#each $page.data.directors as director}
        <li><a href="/directors/{director.fields.tagIdentifier}">{director.fields.name}</a></li>
        {/each}
      </ol>
      {/if}

      {#if about && link.fields.link === "/about"}
      <aside class:about><Document body={about.fields.body} /></aside>
      {/if}
    </div>
   
    {/each}
    <small><a href="/en">English</a></small>
    <div><button on:click={()=> {
      visible = !visible
      films = false
      directors = false
    }}>{#if visible}Fermer{:else}Menu{/if}</button></div>
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    padding: $base 0;
    background-color: fade-out($white, 1);
    transition: height 666ms, background-color 666ms;
    pointer-events: none;

    &:not(.visible) {
      @supports (mix-blend-mode: exclusion) {
        color: white;
        mix-blend-mode: exclusion;
      }
    }

    nav {
      display: flex;
      flex-wrap: wrap;

      &:has(a.active) a:not(.active) {
        opacity: 0.4;

        &:hover,
        &:focus {
          opacity: 1;
        }
      }

      &:not(:has(a.active)) a {
        opacity: 1 !important;

        &:hover,
        &:focus {
          opacity: 0.4 !important;
        }
      }

      a, button {
        pointer-events: auto;
      }

      a {
        transition: opacity 333ms;

        &.active {
          opacity: 1 !important;

          &:hover,
          &:focus {
            opacity: 0.4 !important;
          }

          + ol {
            a {
              opacity: 1 !important;

              &:hover,
              &:focus {
                opacity: 0.4 !important;
              }
            }
          }
        }
      }

      ol,
      aside {
        opacity: 0;
        visibility: hidden;
        transition: opacity 666ms;

        margin-top: $gap * 1.5;
        list-style: none;
        
        li {
          margin-bottom: $base * 0.5;
        }
      }

      div {
        width: calc(100% / var(--length));
        transition: border-color 666ms;
        padding: 0 ($base * 0.75);
        
        &:not(:first-child):not(:last-child) {
          border-left: 1px solid transparent;
        }

        aside {
          width: 175%;
        }

        &:nth-child(4) {
          // margin-left: calc(50% / var(--length));
        }

        &:nth-last-child(3) {
          border-color: transparent !important;
        }

        &:nth-child(n + 4) a {
          visibility: hidden;
          opacity: 0;
        }

        &:last-child {
          position: absolute;
          width: auto;
          top: $base * 0.83333333;
          right: 0;
        }

        @media (max-width: $mobile) {
          &:first-child {
            a {
              opacity: 1 !important;
            }
          }
        }
      }

      // div {
      //   position: absolute;
      //   top: $base - ($base * $scale * 0.125);
      //   right: $base - ($base * $scale * 0.333);
      // }
    }

    small {
      display: none;
      padding: 0 ($base * 0.75);
    }

    @media (max-width: $mobile) {
      padding: $mobile_base 0;

      a {
        font-size: $mobile_base * $mobile_scale * 1.15;
      }

      small a {
        font-size: $mobile_base * $mobile_scale;
      }

      button {
        font-size: $mobile_base * $mobile_scale;
      }

      &:not(.visible) {
        nav > div {
          &:not(:first-child):not(:last-child) { display: none; }
        }
      }
    }

    &.visible {
      background-color: fade-out($white, 0.5);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      pointer-events: auto;

      :global(html:has(.films)) & {
        background-color: fade-out($black-light, 0.5);
      }

      @media (max-width: $mobile) {
        small {
          display: block;
          margin-top: auto;
        }

        nav {
          min-height: 50vh;
          flex-direction: column;
        }
      }

      ol,
      aside {
        opacity: 1;
        visibility: visible;

        @media (max-width: $mobile) {
          display: none;

          &.films,
          &.directors,
          &.about {
            display: block;
            font-size: $mobile_base;
            position: absolute;
            top: $mobile_base * $mobile_scale * 2.15;
            right: 0;
            bottom: $mobile_base;
            border-left: 1px solid;
            padding-left: $mobile_base;;
            width: 50%;
            overflow-y: auto;

            li {
              margin-bottom: 0;

              a {
                font-size: $mobile_base * $mobile_scale;
              }
            }
          }
        }
      }

      nav div {
        &:first-child {
          @media (max-width: $mobile) {
            margin-bottom: $mobile_base * $mobile_scale * 2;
          }
        }
        &:not(:first-child) {
          border-color: fade-out($color: $black, $amount: 0.75);

          :global(html:has(.films)) & {
            border-color: fade-out($color: $white, $amount: 0.75);
          }

          @media (max-width: $mobile) {
            border: none !important;

            &:not(:last-child) {
              width: 100%;
            }
          }
        }

        &:nth-child(n + 4) a {
          visibility: visible;
        }
      }
    }
  }
</style>