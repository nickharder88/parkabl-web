// @flow

import Model from './model';

import AddressModel, { type Address } from './address';
import LandlordModel, { type Landlord } from './landlord';

export type Property = {
  id: string,
  address: Address,
  landlord: Landlord
};

class PropertyModel extends Model<Property> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'properties';
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }

  landlord(): Promise<?LandlordModel> {
    return this.hasOne<Landlord, LandlordModel>(LandlordModel, 'landlord');
  }
}

export default PropertyModel;
