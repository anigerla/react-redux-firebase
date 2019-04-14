//Firebase elements import & app initialization
const functions = require('firebase-functions');
const admin = require('firebase-admin');
//app initialization through passing of app configuration
admin.initializeApp(functions.config().firebase);

//Example code from Firebase: the trigger is https request
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hej!");
});

//1. CREATE NOTIFICATION FOR A NEW PROJECT FUNCTION
const createNotification = (notification) => {
  //Firestore will create a 'notifications' collection automatically, if it does not exist yet
    return admin.firestore().collection('notifications')
      .add(notification)
      .then(doc => console.log('notification added', doc));
}

//the trigger is creating of a new document within the projects database in Firestore
exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    //whenever a new project is created within the above collection, the callback function below gets executed
    .onCreate(doc => {
      //the variable stores the data within the project (e.g. title, author, time created, etc.)
      const project = doc.data();
      //notification object:
      const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)
});
//--------------------------------------------------------------------------------

//2. CREATE NOTIFICATION WHEN A NEW USER JOINS FUNCTION:
exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    //a just created document for new user is returned here
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'Joined the application',
          user:  `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
      
      })
})