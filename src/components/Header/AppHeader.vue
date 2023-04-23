<template>
  <header class="app-header">
    <AppHeaderLeft />
    <div class="app-header-right">
      <template v-if="isAuthenticated">
        <AppHeaderRightAuthenticated />
      </template>
      <template v-else>
        <AppHeaderRightNotAuthenticated />
      </template>
    </div>
  </header>
</template>

<script>
import AppHeaderLeft from './AppHeaderLeft.vue'
import AppHeaderRightNotAuthenticated from './AppHeaderRightNotAuthenticated.vue'
import AppHeaderRightAuthenticated from './AppHeaderRightAuthenticated.vue'

import { useAuthStore } from '../../store/authStore'
import { computed } from 'vue'

export default {
  name: 'AppHeader',
  components: {
    AppHeaderLeft,
    AppHeaderRightNotAuthenticated,
    AppHeaderRightAuthenticated
  },
  setup () {
    // Auth store
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.user !== null)

    return {
      isAuthenticated
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #fff;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.1);
}
.dark-mode .app-header {
  background-color: #222;
  color: #fff;
}
.app-header-right {
  display: flex;
  align-items: center;
}
</style>
