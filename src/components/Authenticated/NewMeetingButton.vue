<template>
  <el-button
    size="large"
    type="primary"
    @click="createNewMeeting"
    :loading="isLoading"
  >
    <template #icon>
      <font-awesome-icon :icon="['fas', 'video']" />
    </template>
    New Meeting
  </el-button>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { generateUniqueCode, createMeeting } from '#/utils/inviteCodeUtils'

export default {
  name: 'NewMeetingButton',
  setup () {
    const router = useRouter()
    const isLoading = ref(false)

    const createNewMeeting = async () => {
      isLoading.value = true
      const inviteCode = await generateUniqueCode()
      const meetingData = await createMeeting(inviteCode)

      if (meetingData) {
        isLoading.value = false
        router.push({ name: 'meeting', params: { inviteCode } })
      } else {
        isLoading.value = false
      }
    }

    return {
      createNewMeeting,
      isLoading
    }
  }
}
</script>
