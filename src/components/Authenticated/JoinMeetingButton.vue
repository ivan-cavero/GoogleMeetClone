<template>
  <div class="join-meeting">
    <el-input size="large" placeholder="Enter code or link" v-model="meetingCode">
      <template #prefix>
        <font-awesome-icon :icon="['fas', 'keyboard']" />
      </template>
    </el-input>
    <el-button
      size="large"
      v-show="meetingCode.length > 0"
      :disabled="!isValidCode"
      @click="joinMeeting"
    >
      Join
    </el-button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { isValidInviteCode } from '#/utils/inviteCodeUtils'

export default {
  name: 'JoinMeetingButton',
  setup () {
    const router = useRouter()
    const meetingCode = ref('')
    const isValidCode = ref(false)

    watch(meetingCode, async () => {
      isValidCode.value = await isValidInviteCode(meetingCode.value)
    })

    const joinMeeting = () => {
      const inviteCode = meetingCode.value.split('/').pop().toUpperCase()
      router.push({ name: 'meeting', params: { inviteCode } })
    }

    return {
      meetingCode,
      isValidCode,
      joinMeeting
    }
  }
}
</script>

<style scoped>
.join-meeting {
  display: flex;
  flex-direction:row;
}
</style>
