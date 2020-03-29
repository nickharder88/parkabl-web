// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Company = {
  id: string,
  name: string,
  address: Address
};

class CompanyModel extends Model<Company> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'companies';
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default CompanyModel;
