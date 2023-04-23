<template>
  <div class="user-info">
    <span style="margin-right: 0.5rem;">{{ currentTime }}</span>
    <el-button class="icon-button" circle style="margin-right: 0.5rem;">
      <font-awesome-icon :icon="'fa-question'" />
    </el-button>
    <user-popover />
  </div>
</template>

<script>
import { ref } from 'vue'

import UserPopover from './UserPopover.vue'

export default {
  name: 'AppHeaderRightAuthenticated',
  components: {
    UserPopover
  },
  setup () {
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

    // Update current time when the component is mounted
    updateCurrentTime()

    return {
      currentTime
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

</style>
