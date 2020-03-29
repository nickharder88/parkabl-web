// @flow

import Model from './model';

import TenantModel, { type Tenant } from './tenant';

export type Vehicle = {
  id: string,
  make: string,
  model: string,
  licensePlatNum: string,
  state: string,
  tenant: Tenant
};

class VehicleModel extends Model<Vehicle> {
  static get primaryKey(): string {
    return 'id';
  }

  static get collection(): string {
    return 'vehicles';
  }

  tenant(): Promise<?TenantModel> {
    return this.hasOne<Tenant, TenantModel>(TenantModel, 'tenant');
  }
}

export default TenantModel;
