// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Landlord = {
  id: string,
  name: string,
  address: Address
};

class LandlordModel extends Model<Landlord> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'landlords';
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default LandlordModel;
