// @flow

class Landlord extends Model {
  id: string;
  name: string;
  email: string;

  constructor() {
    super('landlords');
  }

  addresses() {
    return this.hasMany('address');
  }
}

export default Landlord;
