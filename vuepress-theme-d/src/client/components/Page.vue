<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import PageMeta from './PageMeta.vue'
import PageNav from './PageNav.vue'
import {usePageFrontmatter ,usePageData } from '@vuepress/client'

export default defineComponent({
  name: 'Page',

  components: {
    PageMeta,
    PageNav,
  },
  setup(){
    let computedRef = usePageFrontmatter();
    let ref = usePageData();
    console.log(ref)
    console.log(computedRef.value)
    console.log("page setup")
  }

})
</script>
