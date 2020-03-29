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
}

export default AdminModel;
