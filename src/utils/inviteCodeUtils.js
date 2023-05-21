import { getDatabase, ref as dbRef, child, get, set } from 'firebase/database'
import { useAuthStore } from '#/store/authStore'
import { v4 as uuidv4 } from 'uuid'

export async function isValidInviteCode (code) {
  if (code.length > 0) {
    const inviteCode = code.split('/').pop().toUpperCase()
    const db = getDatabase()
    const inviteCodeRef = child(dbRef(db), `meetings/${inviteCode}`)
    const snapshot = await get(inviteCodeRef)

    return snapshot.exists()
  } else {
    return false
  }
}

export async function isUniqueCode (inviteCode) {
  const db = getDatabase()
  const inviteCodeRef = child(dbRef(db), `meetings/${inviteCode}`)
  const snapshot = await get(inviteCodeRef)

  return !snapshot.exists()
}

export async function generateUniqueCode () {
  let code = ''

  do {
    code = Math.random().toString(36).substr(2, 6).toUpperCase()
  } while (!(await isUniqueCode(code)))

  return code
}

export async function createMeeting (inviteCode) {
  const meetingId = uuidv4()
  const createdAt = new Date()
  const creator = {
    uuid: useAuthStore().user.uid,
    name: useAuthStore().user.displayName,
    email: useAuthStore().user.email
  }

  const meetingData = {
    id: meetingId,
    createdAt,
    inviteCode,
    creator,
    participants: [creator],
    visibility: 'public',
    expiresAt: new Date(createdAt.getTime() + 8 * 60 * 60 * 1000) // 8 hours after creation
  }

  const db = getDatabase()
  const meetingRef = dbRef(db, `meetings/${inviteCode}`)

  try {
    await set(meetingRef, meetingData)
    return meetingData
  } catch (error) {
    console.error('Error creating new meeting:', error)
    return null
  }
}
