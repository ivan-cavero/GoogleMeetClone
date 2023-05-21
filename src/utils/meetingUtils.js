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
