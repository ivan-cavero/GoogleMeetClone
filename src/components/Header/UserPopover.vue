<template>
  <el-popover placement="bottom" trigger="click" :width="340"
    popper-style="border-radius: 8px; background-color: #F8F8F8;">
    <div class="inner-container">
      <div class="user-info">
        <img :src="user.photoURL" alt="User" class="profile-popover profile" />
        <div>
          <span class="user-name">{{ user.displayName }}</span>
          <span class="user-email">{{ user.email }}</span>
        </div>
      </div>
      <el-button class="custom-button" @click="dialogVisible = true">Manage account</el-button>
      <div class="separator"></div>
      <achievement-progress-bar :userAchievements="userAchievements" :maxAchievements="maxAchievements" />
    </div>
    <el-button style="margin-top: 1rem; width: 100%;" type="danger" @click="logOut">Logout</el-button>
    <div class="separator"></div>
    <div class="horizontal-texts">
      <span>Privacy Policy</span>
      <span>·</span>
      <span>Terms of Service</span>
    </div>
    <template v-slot:reference>
      <img :src="user.photoURL" alt="User" class="profile" />
    </template>
  </el-popover>
  <user-settings-dialog v-model="dialogVisible" :user="user" />
</template>

<script>
import { useAuthStore } from '../../store/authStore'
import { useRouter } from 'vue-router'
import AchievementProgressBar from './AchievementProgressBar.vue'
import UserSettingsDialog from './UserSettingsDialog.vue'
import { computed, ref } from 'vue'

export default {
  name: 'UserPopover',
  components: {
    AchievementProgressBar,
    UserSettingsDialog
  },
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)
    const dialogVisible = ref(false)

    const logOut = async () => {
      await authStore.signOut()
      router.push({ name: 'unauthenticated' })
    }

    const userAchievements = 4
    const maxAchievements = 10

    return {
      user,
      userAchievements,
      maxAchievements,
      logOut,
      dialogVisible
    }
  }
}
</script>

<style scoped>
.inner-container {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 11px 14px 10px -18px rgba(0,0,0,0.4);
}

.separator {
  border-top: 1px solid #e0e0e0;
  margin: 1rem 0;
}

.horizontal-texts {
  display: flex;
  justify-content: space-evenly;
  font-size: 0.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.user-name,
.user-email {
  display: block;
  text-align: left;
}

.profile {
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  border: double 2px transparent;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fea837 75%, #fd1818 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  cursor: pointer;
}
.profile-popover {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.custom-button {
  width: 100%;
}
</style>
