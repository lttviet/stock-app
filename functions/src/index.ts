import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const setupNewUser = functions.auth.user().onCreate(async (user) => {
  const now = new Date()

  const initialData = {
    cash: 100000,
    history: [
      `${now.toUTCString()}: Opened account`,
    ],
  }

  functions.logger.info(`Create new user ${user.uid}`)

  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set(initialData)
})
