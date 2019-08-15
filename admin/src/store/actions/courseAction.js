export const createCourse = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const storage = firebase.storage();
    const courses = firestore.collection("courses");
    const dataInput = {
      question: data.question,
      answer: data.answer,
      options: data.options,
      image: "no-image",
      no: data.no,
      class: data.class
    };
    courses
      .add({
        ...dataInput
      })
      .then(doc => {
        if (data.image) {
          let gambar = data.image;
          let metadata = {
            contentType: "image/jpeg"
          };
          const uploadTask = storage
            .ref()
            .child("courses/" + doc.id)
            .put(gambar, metadata);
          let id = doc.id;
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function(snapshot) {
              let progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              dispatch({ type: "PROGRESS_UPLOAD", progress: progress });
            },
            function(err) {
              dispatch({ type: "UPLOAD_ERROR", err: err.message });
            },
            function() {
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                dispatch({ type: "UPLOAD_SUCCESS" });
                courses.doc(id).update({
                  image: downloadURL,
                });
              });
            }
          );
        }
      });
  };
};
export const editCourse = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const storage = firebase.storage();
    const courses = firestore.collection("courses");

    const oldData = {
      ...data.oldData
    };
    const newData = {
      ...data.newData
    };
    let id = oldData.id;
    let question = newData.question ? newData.question : oldData.question;
    let answer = newData.answer ? newData.answer : oldData.answer;
    let options = [
      newData.options[0] ? newData.options[0] : oldData.options[0],
      newData.options[1] ? newData.options[1] : oldData.options[1],
      newData.options[2] ? newData.options[2] : oldData.options[2],
      newData.options[3] ? newData.options[3] : oldData.options[3]
    ];

    let imageFile = newData.image ? newData.image : null;

    //koin
    const dataInput = {
      question: question,
      answer: answer,
      options: options,
      image: "no-image",
      class: oldData.class,
      no: oldData.no
    };
    //check
    if (imageFile) {
      let gambar = imageFile;
      let metadata = {
        contentType: "image/jpeg"
      };
      const uploadTask = storage
        .ref()
        .child("courses/" + id)
        .put(gambar, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch({ type: "PROGRESS_UPLOAD", progress: progress });
        },
        function(err) {
          dispatch({ type: "UPLOAD_ERROR", err: err.message });
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            dispatch({ type: "UPLOAD_SUCCESS" });
            courses.doc(id).set({
              ...dataInput,
              image: downloadURL
            });
          });
        }
      );
    } else {
      courses.doc(id).set({
        ...dataInput,
        image: imageFile ? imageFile : oldData.image
      });
    }
  };
};

export const deleteImage = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const storage = firebase.storage();
    const courses = firestore.collection("courses");

    let id = data.id;

    storage
      .ref()
      .child("courses/" + id)
      .delete()
      .then(() => {
        courses.doc(id).update({
          image: "no-image"
        });
        dispatch({ type: "DELETE_IMAGE_SUCCESS", id });
      });
  };
};
