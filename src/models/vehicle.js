// @flow

import Model from './model';

import TenantModel, { type Tenant } from './tenant';

export type Vehicle = {
  make: string,
  model: string,
  licensePlateNum: string,
  state: string,
  tenant: Tenant
};

class VehicleModel extends Model<Vehicle> {
  static get collection(): string {
    return 'vehicles';
  }

  async toStringAsync(): Promise<string> {
    return Promise.resolve(this.data.licensePlateNum);
  }

  tenant(): Promise<?TenantModel> {
    return this.hasOne<Tenant, TenantModel>(TenantModel, 'tenant');
  }
}

export default VehicleModel;
