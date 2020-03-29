// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Tenant = {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: Address
};

class TenantModel extends Model<Tenant> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'tenants';
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default TenantModel;
