<template>
  <div class="user-info">
    <span style="margin-right: 0.5rem;">{{ currentTime }}</span>
    <el-button class="icon-button" @click="toggleDarkMode" circle style="margin-right: 0.5rem;">
      <font-awesome-icon :icon="'fa-question'" />
    </el-button>
    <el-popover
      placement="bottom"
      trigger="click"
      :width="200"
      popper-class="custom-popper"
    >
      <achievement-progress-bar
        :userAchievements="userAchievements"
        :maxAchievements="maxAchievements"
      />
      <div>
        <el-button type="primary" @click="goToProfile">Profile</el-button>
        <el-button type="danger" @click="logOut">Log Out</el-button>
      </div>
      <template v-slot:reference>
        <img :src="user.photoURL" alt="User" class="profile" />
      </template>
    </el-popover>
  </div>
  <el-button class="icon-button" @click="toggleDarkMode" circle>
    <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
  </el-button>
</template>

<script>
import { useAuthStore } from '../../store/authStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import AchievementProgressBar from './AchievementProgressBar.vue'

export default {
  name: 'AppHeaderRightAuthenticated',
  components: {
    AchievementProgressBar
  },
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)

    // Dark mode state
    const isDarkMode = ref(false)

    // Get current time
    const currentTime = ref('')

    const updateCurrentTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const day = now.toLocaleDateString('default', { weekday: 'short' })
      const date = now.toLocaleDateString('default', { day: 'numeric', month: 'short' })
      currentTime.value = `${hours}:${minutes} · ${day}, ${date}`
    }

    // Update current time every 20 seconds
    setInterval(updateCurrentTime, 20000)

    // Toggle dark mode
    function toggleDarkMode () {
      isDarkMode.value = !isDarkMode.value
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
    }

    // Update current time when the component is mounted
    updateCurrentTime()

    const goToProfile = () => {

    }

    const logOut = async () => {
      await authStore.signOut()
      router.push({ name: 'unauthenticated' })
    }

    const userAchievements = 4
    const maxAchievements = 10

    return {
      user,
      currentTime,
      isDarkMode,
      toggleDarkMode,
      goToProfile,
      logOut,
      userAchievements,
      maxAchievements
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.user-info img {
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  border: double 2px transparent;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fea837 75%, #fd1818 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  cursor: pointer;
}
.icon-button {
  width: 2rem;
}
@media screen and (max-width: 640px) {

  .user-info span {
    display: none;
  }
}
.custom-popper .el-button {
  display: block;
  width: 100%;
  margin: 0.25rem 0;
}

</style>
