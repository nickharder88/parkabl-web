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

  static async find<R: Model<T>>(key: string): Promise<?R> {
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

    if (!data) {
      return null;
    }

    console.log(data);

    // $FlowFixMe
    return new this(data);
  }

  static async findMany<R: Model<T>>(
    keyRef: string,
    value: string
  ): Promise<?Array<R>> {
    const data: Array<T> = await db
      .collection(this.constructor.collection)
      .where(keyRef, '==', value);

    console.log(data);

    // $FlowFixMe
    return data.map((item) => new this(item));
  }

  /*
   * collection: collection to search
   * key: property on this object that references the primary identifier in collection
   */
  async hasOne<Y, X: Model<Y>>(model: Class<X>, key: string): Promise<?X> {
    // $FlowFixMe
    return model.find<X>(this.data[key]);
  }

  /*
   * collection: collection to search
   * key: property on this object that references the primary identifier in collection
   * keyRef: property being referred to in collection
   */
  async hasMany<Y, X: Model<Y>>(
    model: Class<X>,
    key: string,
    keyRef: string
  ): Promise<?Array<X>> {
    // $FlowFixMe
    return model.findMany<X>(keyRef, this.data[key]);
  }

  /*
   * collection: collection to search
   * key: value in this object that is being referred to in collection
   * keyRef: key in collection that is referencing key
   */
  async belongsTo<Y, X: Model<Y>>(
    model: Class<X>,
    key: string,
    keyRef: string
  ): Promise<?X> {
    // $FlowFixMe
    const models = await model.findMany<X>(keyRef, this.data[key]);

    if (!models) {
      return null;
    }

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
  async belongsToMany<Y, X: Model<Y>>(
    model: Class<X>,
    key: string,
    keyRef: string
  ): Promise<?Array<X>> {
    // $FlowFixMe
    return model.findMany<X>(keyRef, this.data[key]);
  }
}

export default Model;
