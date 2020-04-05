// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';

import PropertyModel from '../../../../models/property';
import AddressModel from '../../../../models/address';
import LandlordModel from '../../../../models/landlord';
import TenantModel from '../../../../models/tenant';
import ParkingSpotModel from '../../../../models/parkingSpot';
import VehicleModel from '../../../../models/vehicle';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'address',
    title: 'Addresses',
    model: AddressModel,
    onNavigate: (id: string) => `/app/admin/addresses/${id}`
  },
  {
    field: 'landlord',
    title: 'Landlord',
    model: LandlordModel,
    onNavigate: (id: string) => `/app/admin/landlords/${id}`
  }
];

const hasMany = [
  {
    key: 'vehicles',
    field: 'property',
    title: 'Parking Spots',
    model: ParkingSpotModel,
    columns: [
      {
        title: 'Vehicle',
        field: 'vehicle',
        model: VehicleModel
      }
    ],
    onNavigate: (id: string) => `/app/admin/vehicles/${id}`
  },
  {
    key: 'tenants',
    field: 'property',
    title: 'Tenants',
    model: TenantModel,
    columns: [
      {
        title: 'Name',
        field: 'name'
      },
      {
        title: 'Email',
        field: 'email'
      },
      {
        title: 'Phone',
        field: 'phone'
      }
    ],
    onNavigate: (id: string) => `/app/admin/tenants/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Property"
      model={PropertyModel}
      hasOne={hasOne}
      hasMany={hasMany}
    />
  );
}

export default Details;
