<template>
  <header class="app-header">
    <div class="app-header-left">
      <img src="../assets/logo.png" alt="Google Meet" />
      <span>Meet</span>
    </div>
    <div class="app-header-right">
      <template v-if="!isAuthenticated">
        <el-button type="primary">
          <font-awesome-icon :icon="'fa-user'" style="padding-right: 0.5rem;" />
          Login
        </el-button>
        <el-button class="desktop">Join a meeting</el-button>
        <el-button class="desktop">Start a meeting</el-button>
        <el-dropdown class="mobile">
          <el-button type="primary" style="margin-left: 0.5rem;">
            Meeting
            <font-awesome-icon :icon="'fa-caret-down'" style="padding-left: 0.5rem;" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Join a meeting</el-dropdown-item>
              <el-dropdown-item>Start a meeting</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-if="isAuthenticated">
        <div class="user-info">
          <span style="margin-right: 0.5rem;">{{ currentTime }}</span>
          <el-button class="icon-button" @click="toggleDarkMode" circle style="margin-right: 0.5rem;">
            <font-awesome-icon :icon="'fa-question'" />
          </el-button>
          <img :src="user.photoURL" alt="User" class="profile" />
        </div>
        <el-button class="icon-button" @click="toggleDarkMode" circle>
          <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
        </el-button>
      </template>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../store/authStore'
import { ref, computed } from 'vue'

export default {
  setup () {
    // Auth store
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.user !== null)
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

    return {
      isAuthenticated,
      user,
      currentTime,
      isDarkMode,
      toggleDarkMode
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

.app-header-left {
  display: flex;
  align-items: center;
}
.app-header-left img {
  height: 2rem;
  margin-right: 0.2rem;
}
.app-header-left span {
  font-size: 19px;
  vertical-align: middle;
  color: #5f6368;
  font-weight: 300;
}
.app-header-left span:hover {
  text-decoration: underline;
}

.app-header-right {
  display: flex;
  align-items: center;
}

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
.desktop {
  display: inline-block;
}

.mobile {
  display: none;
}
@media screen and (max-width: 640px) {
  .app-header-left span {
    display: none;
  }

  .user-info span {
    display: none;
  }
  .desktop {
    display: none;
  }
  .mobile {
    display: inline-block;
  }
}
</style>
