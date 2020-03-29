// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Tenant = {
  name: string,
  email: string,
  phone: string,
  address: Address
};

class TenantModel extends Model<Tenant> {
  static get collection(): string {
    return 'tenants';
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default TenantModel;
