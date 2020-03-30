// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import TenantModel from '../../../../models/tenant';
import VehicleModel from '../../../../models/vehicle';

type Props = {
  id: string
};

const relationships = [
  {
    key: 'tenant',
    type: 'hasOne',
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
      relationships={relationships}
    />
  );
}

export default Details;
