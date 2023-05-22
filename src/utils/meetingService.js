import { ref as dbRef, onValue, getDatabase, child, update } from 'firebase/database'

export function subscribeToParticipants (inviteCode, callback) {
  const db = getDatabase()
  const meetingRef = child(dbRef(db), `meetings/${inviteCode}/participants`)
  return onValue(meetingRef, callback)
}

export function updateOnlineStatus (inviteCode, participantUuid, status) {
  const db = getDatabase()
  const participantRef = child(dbRef(db), `meetings/${inviteCode}/participants/${participantUuid}`)
  update(participantRef, { online: status })
}
