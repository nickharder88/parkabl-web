// @flow

import Model from '../models/model';
import firebase from '../firebase';

import { Observable, Subject } from 'rxjs';

const db = firebase.firestore();

export type Hooks<Y> = {
  onCreate?: (data: Y) => Promise<Y>,
  onUpdate?: (data: Y) => Promise<Y>,
  onWrite?: (data: Y) => Promise<Y>
};

export type RepositoryOptions<Y> = {
  hooks?: Hooks<Y>
};

class Repository<Y, X: Model<Y>> {
  model: Class<X>;

  options: ?RepositoryOptions<Y>;

  constructor(model: Class<X>, options?: RepositoryOptions<Y>) {
    this.model = model;
    this.options = options;
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

  // trying to trigger on create/update to create geohash
  async create(data: Y): Promise<X> {
    const newData = await this.onCreate(data);

    return db
      .collection(this.model.collection)
      .add(newData)
      .then((docRef) =>
        db
          .collection(this.model.collection)
          .doc(docRef.id)
          .withConverter(this.model.converter)
          .get()
      );
  }

  async update(id: string, data: Y): Promise<X> {
    const newData = await this.onUpdate(data);

    return db
      .collection(this.model.collection)
      .doc(id)
      .set(newData)
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

  // HOOKS
  // called before sending to database
  // called when item is created or updated
  async onWrite(data: Y): Promise<Y> {
    if (this.options && this.options.hooks && this.options.hooks.onWrite) {
      return await this.options.hooks.onWrite(data);
    }

    return data;
  }

  // called when item is created
  async onCreate(data: Y): Promise<Y> {
    let newData = data;

    if (this.options && this.options.hooks && this.options.hooks.onCreate) {
      newData = await this.options.hooks.onCreate(data);
    }

    return this.onWrite(newData);
  }

  async onUpdate(data: Y): Promise<Y> {
    let newData = data;
    if (this.options && this.options.hooks && this.options.hooks.onUpdate) {
      newData = await this.options.hooks.onUpdate(data);
    }

    return this.onWrite(newData);
  }
}

export default Repository;
