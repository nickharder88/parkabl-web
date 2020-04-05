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

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Vehicle"
      model={VehicleModel}
      hasOne={hasOne}
    />
  );
}

export default Details;
