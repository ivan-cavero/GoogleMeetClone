<template>
  <div id="app">
    <AppHeader v-show="!authStore.isLoading" />
    <main>
      <div v-if="authStore.isLoading" v-loading="authStore.isLoading" class="loading" />
      <router-view v-else />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/Header/AppHeader.vue'
import { useAuthStore } from './store/authStore'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  setup () {
    const authStore = useAuthStore()

    return {
      authStore
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
