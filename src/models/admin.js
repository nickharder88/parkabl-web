// @flow

import Model from './model';

export type Admin = {
  name: string,
  email: string
};

class AdminModel extends Model<Admin> {
  static get collection(): string {
    return 'admins';
  }

  async toStringAsync(): Promise<string> {
    return Promise.resolve(this.data.name);
  }
}

export default AdminModel;
