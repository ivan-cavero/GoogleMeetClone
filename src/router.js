import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedHomePage from '#/views/AuthenticatedHomePage.vue'
import UnauthenticatedHomePage from '#/views/UnauthenticatedHomePage.vue'
import MeetingHome from '@/MeetingHome.vue'

import { useMeetingStore } from './store/meetingStore'
import { getMeetingByInviteCode } from './utils/meetingUtils'
import { ref as dbRef, set, child, getDatabase } from 'firebase/database'
import { useAuthStore } from './store/authStore'

const routes = [
  {
    path: '/',
    name: 'authenticated',
    component: AuthenticatedHomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'unauthenticated',
    component: UnauthenticatedHomePage
  },
  {
    path: '/meeting/:inviteCode',
    name: 'meeting',
    component: MeetingHome,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      const inviteCode = to.params.inviteCode
      const meetingData = await getMeetingByInviteCode(inviteCode)

      if (meetingData) {
        const authStore = useAuthStore()
        const currentUser = authStore.user

        // Check if the current user is already a participant
        const isParticipant = meetingData.participants.some(participant => participant.uuid === currentUser.uid)

        if (!isParticipant) {
          // Add the current user as a participant
          const newParticipant = {
            uuid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email
          }
          meetingData.participants.push(newParticipant)

          // Update the database
          const db = getDatabase()
          const meetingRef = child(dbRef(db), `meetings/${inviteCode}`)
          await set(meetingRef, meetingData)
        }

        const meetingStore = useMeetingStore()
        meetingStore.setCurrentMeeting(meetingData)
        next()
      } else {
        next({ name: 'authenticated' })
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const authStore = useAuthStore()
  const isAuthenticated = await authStore.checkAuthState()

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'unauthenticated' })
  } else if (!requiresAuth && isAuthenticated) {
    next({ name: 'authenticated' })
  } else {
    next()
  }
})

export default router
