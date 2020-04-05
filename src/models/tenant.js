// @flow

import Model from './model';

import PropertyModel, { type Property } from './property';

export type Tenant = {
  name: string,
  email: string,
  phone: string,
  property: Property
};

class TenantModel extends Model<Tenant> {
  static get collection(): string {
    return 'tenants';
  }

  async toStringAsync(): Promise<string> {
    return Promise.resolve(this.data.name);
  }

  property(): Promise<?PropertyModel> {
    return this.hasOne<Property, PropertyModel>(PropertyModel, 'property');
  }
}

export default TenantModel;
