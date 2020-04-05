// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import TenantModel from '../../../../models/tenant';
import PropertyModel from '../../../../models/property';
import VehicleModel from '../../../../models/vehicle';
import TextField from '@material-ui/core/TextField';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'property',
    title: 'Property',
    model: PropertyModel,
    onNavigate: (id: string) => `/app/admin/properties/${id}`
  }
];

const hasMany = [
  {
    key: 'vehicles',
    field: 'tenant',
    title: 'Vehicles',
    model: VehicleModel,
    onNavigate: (id: string) => `/app/admin/vehicles/${id}`,
    columns: [
      {
        title: 'Make',
        field: 'make'
      },
      {
        title: 'Model',
        field: 'model'
      },
      {
        title: 'License',
        field: 'licensePlateNum'
      },
      {
        title: 'State',
        field: 'state'
      }
    ]
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Tenant"
      model={TenantModel}
      hasOne={hasOne}
      hasMany={hasMany}
    />
  );
}

export default Details;
