<template>
  <div class="container">
    <div class="left-side">
      <h1>Premium Video Calling. Free for everyone.</h1>
      <p>Description</p>
      <el-button type="primary">New Meeting</el-button>
      <div class="join-meeting">
        <el-input
          placeholder="Ingrese código o enlace"
          v-model="meetingCode"
          @focus="toggleInputSize"
        ></el-input>
        <el-button :disabled="!isValidCode" @click="joinMeeting">Join</el-button>
      </div>
      <hr />
      <a href="#">More about me</a>
    </div>
    <div class="right-side">
      <Carousel />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Carousel from '@/Carousel.vue'

export default {
  name: 'AuthenticatedHomePage',
  components: Carousel,
  setup () {
    // ...
    const meetingCode = ref('')
    const isValidCode = ref(false)

    const toggleInputSize = () => {

    }

    const joinMeeting = () => {

    }

    return {
      meetingCode,
      isValidCode,
      toggleInputSize,
      joinMeeting
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.left-side {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right-side {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.join-meeting {
  display: flex;
}

.join-meeting > button {
  margin-left: 1rem;
}
</style>
