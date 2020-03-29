// @flow

import Model from './model';

import CompanyModel, { type Company } from './company';

export type Operator = {
  name: string,
  email: string,
  phone: string,
  company: Company
};

class OperatorModel extends Model<Operator> {
  static get collection(): string {
    return 'operators';
  }

  company(): Promise<?CompanyModel> {
    return this.hasOne<Company, CompanyModel>(CompanyModel, 'company');
  }
}

export default CompanyModel;
