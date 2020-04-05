// @flow

import Model from './model';

export type Address = {
  houseNum: string,
  apartmentNum: string,
  street: string,
  city: string,
  state: string,
  country: string,
  postal: string,
  geohash: string
};

class AddressModel extends Model<Address> {

  static get collection(): string {
    return 'addresses';
  }

  toString(): string {
    const address = [];
    if (this.data.houseNum) {
      if (this.data.street) {
        address.push(`${this.data.houseNum} ${this.data.street}`);
      }
    } else if (this.data.apartmentNum) {
      if (this.data.street) {
        address.push(`${this.data.apartmentNum} ${this.data.street}`);
      }
    } else if (this.data.street) {
      address.push(this.data.street);
    }

    if (this.data.city) {
      address.push(this.data.city);
    }

    if (this.data.state) {
      if (this.data.postal) {
        address.push(`${this.data.state} ${this.data.postal}`);
      } else {
        address.push(this.data.state);
      }
    }

    if (this.data.country) {
      address.push(this.data.country);
    }

    return address.join(', ');
  }
}

export default AddressModel;
