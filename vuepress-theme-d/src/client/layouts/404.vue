<template>
  <div class="theme-container">
    <div class="main-card-wrapper">
      <div class="main-card">
        <h1>404</h1>

        <blockquote>{{ getMsg() }}</blockquote>

        <RouterLink :to="homeLink">{{ homeText }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouteLocale} from '@vuepress/client'
import {useThemeLocaleData} from '../composables'

export default defineComponent({
  name: '404',

  setup() {
    const routeLocale = useRouteLocale()
    const themeLocale = useThemeLocaleData()

    const messages = themeLocale.value.notFound ?? ['Not Found']
    const getMsg = (): string =>
        messages[Math.floor(Math.random() * messages.length)]
    const homeLink = themeLocale.value.home ?? routeLocale.value
    const homeText = themeLocale.value.backToHome ?? 'Back to home'

    return {
      getMsg,
      homeLink,
      homeText,
    }
  },
})
</script>
