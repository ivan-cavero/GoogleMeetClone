<template>
    <div>
      <h1>Welcome {{ username }}</h1>
      <el-button type="danger" @click="signOut">Log out</el-button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

export default {
  name: 'AuthenticatedHomePage',
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()

    const signOut = async () => {
      await authStore.signOut()
      router.push({ name: 'unauthenticated' })
    }

    const username = authStore.user.displayName

    return {
      signOut,
      username
    }
  }
}
</script>
