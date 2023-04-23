<template>
  <div class="achievement-progress-bar">
    <div class="achievement-title">
      <span>Achievements</span>
      <span>{{ userAchievements }} / {{ maxAchievements }}</span>
    </div>
    <div class="progress-bar">
      <div
        v-for="index in maxAchievements"
        :key="index"
        class="progress-bar-part"
        :class="{ 'completed': index <= userAchievements }"
      ></div>
    </div>
    <div style="display: flex; flex-direction: row;">
      <el-button disabled style="margin-top: 0.5rem; width: 100%;" class="custom-button">Achievements</el-button>
      <el-button disabled style="margin-top: 0.5rem; width: 100%;" type="primary" class="custom-button">Rewards</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userAchievements: {
      type: Number,
      required: true
    },
    maxAchievements: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.achievement-progress-bar {
  display: flex;
  flex-direction: column;
}

.achievement-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.progress-bar {
  display: flex;
  margin-bottom: 0.3rem;
}

.progress-bar-part {
  flex: 1;
  height: 0.4rem;
  background-color: #e0e0e0;
  border-radius: 10px;
}

.progress-bar-part:not(:last-child) {
  margin-right: 0.25rem;
}

.progress-bar-part.completed {
  background-color: #409eff;
}
</style>
