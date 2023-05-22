<template>
  <div>
    <h1>New Meeting</h1>
    <ul>
      <li v-for="(participant, index) in participants" :key="index">
        {{ participant.name }} {{ participant.email }} - {{ participant.online ? 'Online' : 'Offline' }}
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { useMeetingStore } from '#/store/meetingStore'
import { useAuthStore } from '#/store/authStore'
import { subscribeToParticipants, updateOnlineStatus } from '#/utils/meetingService'

export default {
  setup () {
    const meetingStore = useMeetingStore()
    const authStore = useAuthStore()
    const currentMeeting = ref(meetingStore.currentMeeting)
    const currentUser = ref(authStore.user)

    const participants = ref([])

    onMounted(() => {
      const callback = (snapshot) => {
        const updatedParticipants = []
        snapshot.forEach(childSnapshot => {
          updatedParticipants.push(childSnapshot.val())
        })
        participants.value = updatedParticipants
      }
      const unsubscribe = subscribeToParticipants(currentMeeting.value.inviteCode, callback)

      updateOnlineStatus(currentMeeting.value.inviteCode, currentUser.value.uid, true)

      window.addEventListener('beforeunload', handleBeforeUnload)

      onUnmounted(() => {
        unsubscribe()
        updateOnlineStatus(currentMeeting.value.inviteCode, currentUser.value.uid, false)
        window.removeEventListener('beforeunload', handleBeforeUnload)
      })
    })

    const handleBeforeUnload = () => {
      updateOnlineStatus(currentMeeting.value.inviteCode, currentUser.value.uid, false)
    }

    return {
      participants
    }
  }
}
</script>
