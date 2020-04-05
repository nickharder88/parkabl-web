// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import PropertyModel from '../../../../models/property';
import VehicleModel from '../../../../models/vehicle';
import ParkingSpotModel from '../../../../models/parkingSpot';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'property',
    title: 'Property',
    model: PropertyModel,
    onNavigate: (id: string) => `/app/admin/properties/${id}`
  },
  {
    field: 'vehicle',
    title: 'Vehicle',
    model: VehicleModel,
    onNavigate: (id: string) => `/app/admin/vehicles/${id}`
  },
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Parking Spot"
      model={ParkingSpotModel}
      hasOne={hasOne}
    />
  );
}

export default Details;
