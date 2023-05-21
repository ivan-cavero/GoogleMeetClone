import { getDatabase, ref as dbRef, child, get } from 'firebase/database'

export async function getMeetingByInviteCode (inviteCode) {
  const db = getDatabase()
  const inviteCodeRef = child(dbRef(db), `meetings/${inviteCode}`)
  const snapshot = await get(inviteCodeRef)

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return null
  }
}

export const canAccessMeeting = (currentMeeting, currentUser) => {
  if (currentMeeting.visibility === 'public') {
    return true
  } else if (currentMeeting.visibility === 'private') {
    return currentMeeting.participants.some(participant => participant.email === currentUser.email)
  } else {
    return false
  }
}
