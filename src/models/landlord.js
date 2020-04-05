// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Landlord = {
  name: string,
  email: string,
  address: Address
};

class LandlordModel extends Model<Landlord> {
  static get collection(): string {
    return 'landlords';
  }

  toString(): string {
    return this.data.name;
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default LandlordModel;
