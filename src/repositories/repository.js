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
  parent?: {
    key: string,
    value: string
  },
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

    let ref = db.collection(this.model.collection);
    if (this.options && this.options.parent) {
      // Filter by a Parent Property
      // Use Case: hasOne
      // Example: Tenants have a Property. Show all tenants for a property
      ref = ref.where(this.options.parent.key, '==', this.options.parent.value);
    }

    ref.withConverter(this.model.converter).onSnapshot((querySnapshot) => {
      subject.next(querySnapshot.docs.map((doc) => doc.data()));
    });

    return subject.asObservable();
  }

  remaining(): Observable<Array<X>> {
    if (!this.options || !this.options.parent) {
      throw 'Expected Parent Value to Filter';
    }

    const subject = new Subject<Array<X>>([]);
    db.collection(this.model.collection)
      .withConverter(this.model.converter)
      .onSnapshot((querySnapshot) => {
        subject.next(
          querySnapshot.docs
            .map((doc) => doc.data())
            .filter(
              (item) =>
                item.data[this.options.parent.key] !== this.options.parent.value
            )
        );
      });
    return subject.asObservable();
  }

  // trying to trigger on create/update to create geohash
  async create(data: Y): Promise<void> {
    const newData = await this.onCreate(data);
    return db.collection(this.model.collection).add(newData);
  }

  async update(id: string, data: Y): Promise<void> {
    const newData = await this.onUpdate(data);
    return db.collection(this.model.collection).doc(id).update(newData);
  }

  delete(key: string): Promise<void> {
    return db.collection(this.model.collection).doc(key).delete();
  }

  // Associate doc(id) with parent
  associate(id: string): Promise<void> {
    if (!this.options || !this.options.parent) {
      throw 'Expected parent to be defined';
    }

    return db
      .collection(this.model.collection)
      .doc(id)
      .update({ [this.options.parent.key]: this.options.parent.value });
  }

  dissociate(id: string): Promise<void> {
    if (!this.options || !this.options.parent) {
      throw 'Expected parent to be defined';
    }

    return db
      .collection(this.model.collection)
      .doc(id)
      .update({ [this.options.parent.key]: null });
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
