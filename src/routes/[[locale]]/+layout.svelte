<script lang="ts">
  import '$lib/styles.scss'

  import { page } from '$app/stores'

	import Footer from '$lib/components/Footer.svelte'
  import Header from '$lib/components/Header.svelte'
  import Dialog from '$lib/components/Dialog.svelte'

  import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<Header header={data.header}  />

<main class={$page.route.id.replace('/[[locale]]/', '').replace('/[id]', '')}>
  <slot />
</main>

<Dialog />
<Footer footer={data.footer} />

<style lang="scss">
  main {
    min-height: 90vh;
  }
</style>