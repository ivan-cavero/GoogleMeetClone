import { defineStore } from 'pinia'
import { auth } from '../firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser (newUser) {
      this.user = newUser
    },
    async checkAuthState () {
      return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
          this.setUser(user)
          resolve(user)
        })
      })
    }
  }
})
