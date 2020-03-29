// @flow

import Model from './model';

import PropertyModel, { type Property } from './property';
import VehicleModel, { type Vehicle } from './vehicle';

export type ParkingSpot = {
  property: Property,
  vehicle: ?Vehicle
};

class ParkingSpotModel extends Model<ParkingSpot> {
  static get collection(): string {
    return 'parkingSpots';
  }

  property(): Promise<?PropertyModel> {
    return this.hasOne<Property, PropertyModel>(PropertyModel, 'property');
  }

  vehicle(): Promise<?VehicleModel> {
    return this.hasOne<Vehicle, VehicleModel>(VehicleModel, 'vehicle');
  }
}

export default ParkingSpotModel;
