// @flow

import Model from '../models/model';
import firebase from '../firebase';

import { Observable, Subject } from 'rxjs';

const db = firebase.firestore();

class Repository<Y, X: Model<Y>> {
  model: Class<X>;

  constructor(model: Class<X>) {
    this.model = model;
  }

  get(id: string): Observable<X> {
    const subject = new Subject<X>();

    db.collection(this.model.collection)
      .withConverter(this.model.converter)
      .doc(id)
      .onSnapshot((snapshot) => {
        subject.next(snapshot.data());
      });

    return subject.asObservable();
  }

  list(): Observable<Array<X>> {
    const subject = new Subject<Array<X>>([]);

    db.collection(this.model.collection)
      .withConverter(this.model.converter)
      .onSnapshot((querySnapshot) => {
        subject.next(querySnapshot.docs.map((doc) => doc.data()));
      });

    return subject.asObservable();
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
