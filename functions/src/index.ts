import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const corsHandler = cors({origin: true});
admin.initializeApp();

export const exampleFunction = functions.https.onRequest((request,response) => {
    // tslint:disable-next-line:no-empty
    corsHandler(request,response, ()=> {})
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const subscribeToTopic = functions.https.onCall(
    async(data, context) => {
        await admin.messaging().subscribeToTopic(data.token, data.topic);
        return `Subscribed to ${data.topic}`;
    }
)

export const unsubscribeToTopic = functions.https.onCall(
    async(data, context) => {
        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
        return `Unsubscribed to ${data.topic}`;
    }
)

export const sendOnFirestoreCreate = functions.firestore.document('/foodItems/{id}').onCreate( async (snapshot) => {
   
    const newItem = snapshot.data();

    const notification: admin.messaging.Notification = {
        title: "New Food Item !!!",
        body: `${newItem.name} is available on our restaurant from now`
    }

    const payload: admin.messaging.Message = {
        notification,
        webpush: {
            notification: {
                vibrate: [200, 100, 200],
                icon: 'https://angularfirebase.com/images/logo.png',
                actions: [
                    {
                        action: 'like',
                        title: 'Yaay !'
                    },
                    {
                        action: 'dislike',
                        title: 'Boooo'
                    }
                ]
            }
        },
        android: {
            ttl: 3600 * 1000, // 1 hour in milliseconds
            priority: 'normal',
            notification: {
              icon: 'https://angularfirebase.com/images/logo.png',
              color: '#f45342'
            }
          },
        topic: 'newitem'
    }
    
    await admin.messaging().send(payload);
})