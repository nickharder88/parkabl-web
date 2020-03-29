// @flow

class Tenant extends Model {
  id: string;
  name: string;
  email: string;

  constructor() {
    super('tenants');
  }
}

export default Tenant;
