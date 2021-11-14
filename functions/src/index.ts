import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

export const setupNewUser = functions.auth.user().onCreate(async (user) => {
  const now = new Date()

  const initialData = {
    cash: 100000,
    history: [
      `${now.toUTCString()}: Opened account`,
    ],
  }

  functions.logger.info(`Create new user ${user.uid}`)

  await db.doc(`users/${user.uid}`).set(initialData)
})

export const buyStock = functions.https.onCall(async (data, context) => {
  const { ticker, price } = data

  if (context.app === undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    )
  }

  if (!(typeof ticker === 'string') || ticker.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Argument "ticker" is invalid'
    )
  }

  if (!(typeof price === 'number') || price <= 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Argument "price" is invalid'
    )
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    )
  }

  const uid = context.auth?.uid

  functions.logger.info(`User ${uid} buys 1 ${ticker} for ${price}`)

  const userRef = db.doc(`users/${uid}`)
  const stockRef = db.doc(`users/${uid}/portfolio/${ticker}`)

  await db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef)
    const stockDoc = await t.get(stockRef)

    if (!userDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'User not found',
      )
    }

    if (!userDoc.get('cash') || userDoc.get('cash') < price) {
      throw new functions.https.HttpsError(
        'internal',
        'Not enough cash',
      )
    }

    const newCash = userDoc.get('cash') - price
    t.update(userRef, { cash: newCash })

    const newQuantity = (stockDoc.get('quantity') || 0) + 1
    const newCosts = (stockDoc.get('costs') || []).concat(price)
    t.set(stockRef, {
      quantity: newQuantity,
      costs: newCosts,
    }, {
      merge: true,
    })
  })
})

export const sellStock = functions.https.onCall(async (data, context) => {
  const { ticker, price } = data

  if (context.app === undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    )
  }

  if (!(typeof ticker === 'string') || ticker.length === 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Argument "ticker" is invalid'
    )
  }

  if (!(typeof price === 'number') || price <= 0) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Argument "price" is invalid'
    )
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated'
    )
  }

  const uid = context.auth?.uid

  functions.logger.info(`User ${uid} sells 1 ${ticker} for ${price}`)

  const userRef = db.doc(`users/${uid}`)
  const stockRef = db.doc(`users/${uid}/portfolio/${ticker}`)

  await db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef)
    const stockDoc = await t.get(stockRef)

    if (!userDoc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'User not found',
      )
    }

    if (!stockDoc.get('quantity') || !stockDoc.get('costs')?.length) {
      throw new functions.https.HttpsError(
        'internal',
        'Not enough stock to sell',
      )
    }

    const newCash = (userDoc.get('cash') || 0) + price
    t.update(userRef, { cash: newCash })

    const newQuantity = stockDoc.get('quantity') - 1
    const newCosts = stockDoc
      .get('costs')
      .filter((_: number, i: number) => i !== 0)
    t.update(stockRef, {
      quantity: newQuantity,
      costs: newCosts,
    })
  })
})

export const createAverageCost = functions.firestore
  .document('users/{uid}/portfolio/{ticker}')
  .onCreate((snap) => {
    const costs = snap.get('costs')

    // 1 ele in costs when doc is created
    // TODO the constraint may be changed later
    const averageCost = (costs && costs.length === 1)
      ? costs[0]
      : 0

    return snap.ref.update({ averageCost })
  })

export const updateAverageCost = functions.firestore
  .document('users/{uid}/portfolio/{ticker}')
  .onUpdate((change) => {
    const data = change.after.data()
    const prevData = change.before.data()

    if (prevData.costs === data.costs) {
      return
    }

    const averageCost = (data.costs.length > 0)
      ? data.costs.reduce((a: number, b: number) => a + b) / data.costs.length
      : 0

    return change.after.ref.update({ averageCost })
  })
