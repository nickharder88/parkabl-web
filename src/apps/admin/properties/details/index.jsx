// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';

import PropertyModel from '../../../../models/property';
import AddressModel from '../../../../models/address';
import LandlordModel from '../../../../models/landlord';

type Props = {
  id: string
};

const relationships = [
  {
    key: 'address',
    type: 'hasOne',
    title: 'Addresses',
    model: AddressModel,
    onNavigate: (id: string) => `/app/admin/addresses/${id}`
  },
  {
    key: 'landlord',
    type: 'hasOne',
    title: 'Landlord',
    model: LandlordModel,
    onNavigate: (id: string) => `/app/admin/landlords/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Property"
      model={PropertyModel}
      relationships={relationships}
    />
  );
}

export default Details;
