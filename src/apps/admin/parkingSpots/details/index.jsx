// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import TenantModel from '../../../../models/tenant';
import PropertyModel from '../../../../models/property';
import VehicleModel from '../../../../models/vehicle';
import ParkingSpotModel from '../../../../models/parkingSpot';

type Props = {
  id: string
};

const relationships = [
  {
    key: 'property',
    type: 'hasMany',
    title: 'Properties',
    model: PropertyModel,
    columns: [
      {
        title: 'Address',
        field: 'address'
      },
      {
        title: 'Landlord',
        field: 'landlord'
      }
    ],
    onNavigate: (id: string) => `/app/admin/properties/${id}`
  },
  {
    key: 'vehicle',
    type: 'hasOne',
    title: 'Vehicle',
    model: VehicleModel,
    onNavigate: (id: string) => `/app/admin/vehicles/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Parking Spot"
      model={ParkingSpotModel}
      relationships={relationships}
    />
  );
}

export default Details;
