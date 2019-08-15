export const gasDaftar = userBaru => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userBaru.email, userBaru.password)
      .then(resp => {
        firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            nama: userBaru.nama,
            email: userBaru.email,
            school: userBaru.school,
            address: userBaru.address
          });
      })
      .then(() => {
        dispatch({ type: "DAFTAR_BERHASIL" });
      })
      .catch(err => {
        dispatch({ type: "DAFTAR_GAGAL", err });
      });
  };
};

export const gasLogout = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_BERHASIL" });
      });
  };
};

export const gasLogin = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch({ type: "LOGIN_BERHASIL" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_GAGAL", err: err.message });
      });
  };
};
