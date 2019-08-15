export const loginAdmin = data => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const admins = firestore.collection("admins");

    let fixEmail = data.email.replace(" ", "");
    //2 protection
    admins
      .where("email", "==", fixEmail)
      .get()
      .then(querySnapshot => {
        //check email ada di collection admin atau tidak
        if (querySnapshot.empty) {
          //jiak tidak terdaftar
          dispatch({
            type: "LOGIN_ADMIN_ERROR",
            err: "Email Tidak Terdaftar Sebagai Admin"
          });
        } else {
          //check id doc ada atau tidak  dari temuan data di atas di colleciton admins
          admins
            .doc(querySnapshot.docs[0].id)
            .get()
            .then(doc => {
              if (doc.exists) {
                //jika ada = login
                firebase
                  .auth()
                  .signInWithEmailAndPassword(fixEmail, data.password)
                  .then(() => {
                    dispatch({
                      type: "LOGIN_ADMIN_SUCCESS"
                    });
                  });
              } else {
                dispatch({
                  type: "LOGIN_ADMIN_ERROR",
                  err: "Email Tidak Terdaftar Sebagai Admin"
                });
              }
            });
        }
      });
  };
};

export const adminLogout = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
  };
};
