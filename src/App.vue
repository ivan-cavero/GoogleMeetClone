<template>
  <div id="app">
    <MainHeader v-show="!authStore.isLoading" />
    <main>
      <div v-if="authStore.isLoading" v-loading="authStore.isLoading" class="loading" />
      <router-view v-else />
    </main>
  </div>
</template>

<script>
import MainHeader from '@/MainHeader.vue'
import { useAuthStore } from './store/authStore'

export default {
  name: 'App',
  components: {
    MainHeader
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
