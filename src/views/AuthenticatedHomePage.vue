<template>
    <div>
      <h1>Welcome {{ username }}</h1>
    </div>
</template>

<script>

import { useAuthStore } from '../store/authStore'

export default {
  name: 'AuthenticatedHomePage',
  setup () {
    const authStore = useAuthStore()

    const username = authStore.user.displayName

    return {
      username
    }
  }
}
</script>
