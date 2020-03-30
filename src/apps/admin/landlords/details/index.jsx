// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import LandlordModel from '../../../../models/landlord';
import AddressModel from '../../../../models/address';

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
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Landlord"
      model={LandlordModel}
      relationships={relationships}
    />
  );
}

export default Details;
