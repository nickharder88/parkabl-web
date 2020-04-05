// @flow
import firebase from '../firebase';
const db = firebase.firestore();

class Model<T> {
  collection: string;

  id: string;
  data: T;

  static get collection(): string {
    throw 'This method should be overridden';
  }

  static get converter() {
    const model = this;
    return {
      toFirestore(obj) {
        return obj.data;
      },
      fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new model(snapshot.id, data);
      }
    };
  }

  constructor(id: string, data: T) {
    this.id = id;
    this.data = data;
  }

  static async find<R: Model<T>>(id: string): Promise<?R> {
    const doc = await db
      .collection(this.collection)
      .doc(id)
      .withConverter(this.converter)
      .get();
    return doc.data();
  }

  static async findMany<R: Model<T>>(
    keyRef: string,
    value: string
  ): Promise<?Array<R>> {
    const querySnapshot = await db
      .collection(this.collection)
      .where(keyRef, '==', value)
      .withConverter(this.converter)
      .get();

    return querySnapshot.docs.map((doc) => doc.data());
  }

  async toStringAsync(): Promise<string> {
    throw 'Not Implemented';
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
