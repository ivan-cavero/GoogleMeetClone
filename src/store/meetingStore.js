import { defineStore } from 'pinia'

export const useMeetingStore = defineStore('meeting', {
  state: () => ({
    currentMeeting: null
  }),
  actions: {
    setCurrentMeeting (meeting) {
      this.currentMeeting = meeting
    }
  }
})
