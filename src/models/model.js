// @flow
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwyaBA5y0KaOvVzv2RqL4NXryw3DAQ4a4',
  authDomain: 'parkabl.firebaseapp.com',
  databaseURL: 'https://parkabl.firebaseio.com',
  projectId: 'parkabl',
  storageBucket: 'parkabl.appspot.com',
  messagingSenderId: '921812638836',
  appId: '1:921812638836:web:8d15f911efa9a2b6e38521',
  measurementId: 'G-GKR6Q67PNC'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// registry of collection names to instantiable model types
export const registry = new Map<string, any>();

class Model<T> {
  collection: string;

  data: T;

  static get primaryKey(): string {
    throw 'This method should be overridden';
  }

  static get collection(): string {
    throw 'This method should be overridden';
  }

  constructor(data: T) {
    this.data = data;
  }

  static async find(key: string): Promise<?Model<T>> {
    const data: T = await db
      .collection(this.constructor.collection)
      .doc(key)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null;
        }
      });

    return new this(data);
  }

  static async findMany(
    keyRef: string,
    value: string
  ): Promise<?Array<Model<T>>> {
    const data: Array<T> = await db
      .collection(this.constructor.collection)
      .where(keyRef, '==', value);
    return data.map((item) => new this(item));
  }

  /*
   * collection: collection to search
   * key: property on this object that references the primary identifier in collection
   */
  async hasOne<R>(collection: string, key: string): Promise<?Model<R>> {
    const Model: ?any = registry.get(collection);

    if (!Model) {
      throw `Expected a Model to be registered for collection: ${collection}`;
    }

    return Model.find(this.data[key]);
  }

  /*
   * collection: collection to search
   * key: property on this object that references the primary identifier in collection
   * keyRef: property being referred to in collection
   */
  async hasMany<R>(
    collection: string,
    key: string,
    keyRef: string
  ): Promise<?Array<Model<R>>> {
    const Model: ?any = registry.get(collection);

    if (!Model) {
      throw `Expected a Model to be registered for collection: ${collection}`;
    }

    return Model.findMany(keyRef, this.data[key]);
  }

  /*
   * collection: collection to search
   * key: value in this object that is being referred to in collection
   * keyRef: key in collection that is referencing key
   */
  async belongsTo<R>(
    collection: string,
    key: string,
    keyRef: string
  ): Promise<?Model<R>> {
    const Model: ?any = registry.get(collection);

    if (!Model) {
      throw `Expected a Model to be registered for collection: ${collection}`;
    }

    const models = await Model.findMany(keyRef, this.data[key]);

    if (models.length > 1) {
      throw `Expected one reference for belongsTo`;
    }

    return models.length === 1 ? models[0] : null;
  }

  /*
   * collection: collection to search
   * key: value in this object that is being referred to in collection
   * keyRef: key in collection that is referencing key
   */
  async belongsToMany<R>(
    collection: string,
    key: string,
    keyRef: string
  ): Promise<?Array<Model<R>>> {
    const Model: ?any = registry.get(collection);

    if (!Model) {
      throw `Expected a Model to be registered for collection: ${collection}`;
    }

    return Model.findMany(keyRef, this.data[key]);
  }
}

export default Model;
