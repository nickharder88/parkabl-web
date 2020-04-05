// @flow

import Model from './model';

import AddressModel, { type Address } from './address';

export type Company = {
  name: string,
  address: Address
};

class CompanyModel extends Model<Company> {
  static get collection(): string {
    return 'companies';
  }

  toString(): string {
    return this.data.name;
  }

  address(): Promise<?AddressModel> {
    return this.hasOne<Address, AddressModel>(AddressModel, 'address');
  }
}

export default CompanyModel;
