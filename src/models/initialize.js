import { registry } from './model';
import Address from './address';
import Admin from './admin';
import Company from './company';
import Landlord from './landlord';
import Operator from './operator';
import ParkingSpot from './parkingSpot';
import Property from './property';
import Tenant from './tenant';
import Vehicle from './vehicle';

const models = {
  admins: Admin,
  addresses: Address,
  companies: Company,
  landlords: Landlord,
  operators: Operator,
  parkingSpots: ParkingSpot,
  properties: Property,
  tenants: Tenant,
  vehicles: Vehicle
};

Object.entries(models).forEach(([key, value]) => {
  registry.set(key, value);
});
