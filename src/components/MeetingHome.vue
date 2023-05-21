<template>
  <div class="new-meeting">
    <h1>New Meeting</h1>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useMeetingStore } from '#/store/meetingStore'
import { useAuthStore } from '#/store/authStore'

export default {
  name: 'MeetingHome',
  setup () {
    const meetingStore = useMeetingStore()
    const authStore = useAuthStore()
    const currentMeeting = meetingStore.currentMeeting
    const currentUser = authStore.user

    const canAccessMeeting = () => {
      console.log(currentMeeting)
      if (currentMeeting.visibility === 'public') {
        return true
      } else if (currentMeeting.visibility === 'private') {
        return currentMeeting.participants.some(participant => participant.email === currentUser.email)
      } else {
        return false
      }
    }

    const router = useRouter()
    const canAccess = ref(false)

    onMounted(() => {
      canAccess.value = canAccessMeeting()

      if (!canAccess.value) {
        router.push({ path: '/' })
      }
    })
  }
}
</script>
