// @flow

import Model from './model';

type Admin = {
  id: string,
  name: string,
  email: string
};

class AdminModel extends Model<Admin> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'admins';
  }
}

export default AdminModel;
