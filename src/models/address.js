// @flow

import Model from './model';

export type Address = {
  id: string,
  houseNum: string,
  apartmentNum: string,
  street: string,
  city: string,
  state: string,
  country: string,
  postal: string
};

class AddressModel extends Model<Address> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'addresses';
  }
}

export default AddressModel;
