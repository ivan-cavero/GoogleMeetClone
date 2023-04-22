import { defineStore } from 'pinia'
import { auth } from '../firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true
  }),
  actions: {
    setUser (newUser) {
      this.user = newUser
    },
    async checkAuthState () {
      return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
          this.setUser(user)
          this.isLoading = false
          resolve(user)
        })
      })
    },
    async signOut () {
      await auth.signOut()
      this.setUser(null)
    }
  }
})
