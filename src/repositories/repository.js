import firebase from '../firebase';
const db = firebase.firestore();

import Model from '../models/model';

class Repository<Y, X: Model<Y>> {
  model: Class<X>;

  constructor(model: Class<X>) {
    this.model = model;
  }

  list(): Promise<Array<X>> {
    return db
      .collection(this.model.collection)
      .withConverter(this.model.converter)
      .get()
      .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
  }

  create(data: Y): Promise<X> {
    return db
      .collection(this.model.collection)
      .add(data)
      .then((docRef) =>
        db
          .collection(this.model.collection)
          .doc(docRef.id)
          .withConverter(this.model.converter)
          .get()
      );
  }

  update(id: string, data: Y): Promise<X> {
    return db
      .collection(this.model.collection)
      .doc(id)
      .set(data)
      .then(() =>
        db
          .collection(this.model.collection)
          .doc(id)
          .withConverter(this.model.converter)
          .get()
          .then((doc) => doc.data())
      );
  }

  delete(key: string): Promise<void> {
    return db.collection(this.model.collection).doc(key).delete();
  }
}

export default Repository;
