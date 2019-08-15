export const startCourse = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const fst = firestore.collection("results");

    const fstCourses = firestore.collection("courses");
    fstCourses
      .where("class", "==", data.class)
      .get()
      .then(q1 => {
        let bnykSoal = q1.docs.length;
        fst
          .doc()
          .set({
            ...data,
            start_course: new Date().getTime(),
            // end_course: new Date().getTime() + bnykSoal * 90000,
            end_course: new Date().getTime() + 2700000,
            status: "start"
          })
          .then(doc => {
            // console.log(doc.data());
          });
      });
  };
};
export const updateRecord = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const fst = firestore.collection("records");
    fst
      .where("uid", "==", data.uid)
      .where("question", "==", data.question)
      .where("answer", "==", data.answer)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          fst.doc().set({
            no: data.no,
            class: data.class,
            uid: data.uid,
            id_course: data.id_course,
            userAnswer: data.userAnswer,
            check: data.check
          });
        } else {
          fst.doc(querySnapshot.docs[0].id).update({
            userAnswer: data.userAnswer,
            check: data.check
          });
        }
        // querySnapshot.forEach(function(doc) {

        //   console.log(doc.id, " => ", doc.data());
        // });
      });
  };
};

export const endCourse = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "LOADING_START", loading: true });
    const firestore = getFirestore();
    const fstResult = firestore.collection("results");
    const fstRecord = firestore.collection("records");
    const fstCourses = firestore.collection("courses");
    fstResult
      .where("uid", "==", data.uid)
      .where("class", "==", data.class)
      .where("status", "==", "start")
      .get()
      .then(q => {
        if (q.empty) {
          console.log("error");
        } else {
          fstResult
            .doc(q.docs[0].id)
            .set({
              ...data
            })
            .then(() => {
              fstRecord
                .where("uid", "==", data.uid)
                .where("class", "==", data.class)
                .where("check", "==", "correct")
                .get()
                .then(q1 => {
                  fstCourses
                    .where("class", "==", data.class)
                    .get()
                    .then(q2 => {
                      let grade = "";
                      //score dibagi panyak soal x 100
                      // let score = (q1.docs.length / q2.docs.length) * 100;
                      let score = q1.docs.length;
                      switch (true) {
                        case score < 15:
                          grade = "B";
                          break;
                        case score >= 16:
                          grade = "A";
                          break;
                      }
                      fstResult
                        .doc(q.docs[0].id)
                        .set({
                          ...data,
                          status: "end",
                          grade: grade
                        })
                        .then(() => {
                          dispatch({ type: "LOADING_END", loading: false });
                        });
                    });
                });
            });
        }
      });
  };
};
