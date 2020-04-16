// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import TenantModel from '../../../../models/tenant';
import VehicleModel from '../../../../models/vehicle';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'tenant',
    title: 'Tenant',
    model: TenantModel,
    onNavigate: (id: string) => `/app/admin/tenants/${id}`
  }
];

const files = [
  {
    field: 'image',
    title: 'Image',
    path: (value: string) => `vehicles/images/${value}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Vehicle"
      model={VehicleModel}
      hasOne={hasOne}
      files={files}
    />
  );
}

export default Details;
