// @flow

import React from 'react';
import PropertyModel from '../../../../models/property';

import GenericDetails from '../../../../components/details';
import TenantModel from '../../../../models/tenant';

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
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Tenant"
      model={TenantModel}
      relationships={relationships}
    />
  );
}

export default Details;
